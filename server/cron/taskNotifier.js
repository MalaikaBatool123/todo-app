import cron from "node-cron";
import { taskModel, userModel } from "../postgres/postgres.js";
import { Op } from "sequelize";
import nodemailer from "nodemailer";

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter verification failed:", error);
  } else {
    console.log("✅ Email transporter is ready to send messages");
  }
});

// Improved email sending function
async function sendEmail(to, subject, text) {
  try {
    // console.log(`📧 Attempting to send email to ${to}...`);
    const info = await transporter.sendMail({
      from: `"Task Manager" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      text,
      html: `<p>${text.replace(/\n/g, "<br>")}</p>`,
    });

    console.log(`✅ Email sent to ${to}:`, info.response);
    return true;
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error.message);
    return false;
  }
}

// Main cron job function
export const startTaskNotificationCron = () => {
  //   console.log("⏰ Initializing task notification cron jobs...");

  // Schedule daily check at 9 AM (for testing, runs every 5 minutes)
  cron.schedule("0 9 * * *", async () => {
    // console.log("\n🔔 Running task notification check...");

    try {
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      // Get tomorrow's date (at the start of the day)
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Get the day after tomorrow (to create a proper range that includes all of tomorrow)
      const dayAfterTomorrow = new Date(tomorrow);
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
      const tasks = await taskModel.findAll({
        where: {
          user_id: { [Op.not]: null },
          status: "pending",
          dueDate: {
            [Op.not]: null,
            [Op.lt]: dayAfterTomorrow,
          },
        },
      });

      console.log(`🔍 Found ${tasks.length} tasks to process`);
      //   console.log("tasks", tasks);

      for (const task of tasks) {
        // console.log(`\n🔄 Processing Task ID: ${task.id}`);
        // console.log(`📝 Title: ${task.title}`);
        // console.log(`📅 Due Date: ${task.dueDate}`);
        const user = await userModel.findOne({ where: { id: task.user_id } });
        // console.log(`👤 user: ${user.email}`);

        const taskDate = new Date(task.dueDate);
        taskDate.setHours(0, 0, 0, 0);

        let message = "";
        let emailSubject = "";

        if (taskDate < now) {
          emailSubject = `🚨 Overdue: ${task.title}`;
          message = `Your task "${task.title}" was due on ${task.dueDate} and is now overdue.`;
        } else if (taskDate.getTime() === now.getTime()) {
          emailSubject = `📌 Due Today: ${task.title}`;
          message = `Your task "${task.title}" is due today!`;
        } else if (taskDate.getTime() === tomorrow.getTime()) {
          emailSubject = `⏰ Reminder: ${task.title}`;
          message = `Your task "${task.title}" is due tomorrow (${task.dueDate}).`;
        } else {
          //   console.log("⏩ Skipping - Task not due yet");
          continue;
        }

        // console.log(`✉️ Preparing email: ${emailSubject}`);
        const emailSent = await sendEmail(user.email, emailSubject, message);

        if (emailSent) {
          // Update task to mark notification as sent
          await task.update({
            reminderSent: true,
            ...(taskDate < now && { overdueNotified: true }),
          });
          console.log("✔️ Email sent and task updated");
        } else {
          console.log("❌ Failed to send email");
        }
      }
    } catch (error) {
      console.error("🔥 Error in task notification cron job:", error);
    }
  });

  console.log("✅ Task notification cron jobs scheduled");
};
