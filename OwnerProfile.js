import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OwnerProfile() {
  const [profile, setProfile] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8090/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch {
        setError("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Owner Profile</h2>
      {profile && <p>{profile}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

const styles = {
  container: { maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" },
};
