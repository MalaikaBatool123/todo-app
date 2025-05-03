import React, { useEffect, useState } from "react";
import "../assets/css/Profile.css";
import axios from "axios";

function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    picture: "", // Changed from 'image' to 'picture' to match your data
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/get-profile");
        setUserData({
          name: response.data.name,
          email: response.data.email,
          picture: response.data.picture, // Make sure this matches your API response
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // Empty dependency array to run only once

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;

  // Modify Google image URL to remove the size restriction (s96-c)
  const profileImageUrl = userData.picture
    ? userData.picture.replace("s96-c", "s400-c")
    : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

  return (
    <div className="profile">
      <div className="data">
        <h1>Profile</h1>
        <div className="info">
          <div className="form-group">
            <label>Image</label>
            <div className="img">
              <img
                src={
                  userData.picture
                    ? userData.picture.replace("s96-c", "s400-c")
                    : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                }
                alt="Profile"
                onError={(e) => {
                  e.target.src =
                    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";
                  e.target.onerror = null; // Prevent infinite loop if default image fails
                }}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <br />
            <p>{userData.name}</p>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <br />
            <p>{userData.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
