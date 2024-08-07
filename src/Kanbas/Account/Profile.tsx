import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state: any) => state.user);

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  const fetchProfile = async () => {
    try {
      const account = await client.profile();
      setProfile(account);
      dispatch(setCurrentUser(account)); // Save the profile, including the role, to the Redux store
    } catch (err: any) {
      navigate("/Kanbas/Account/Signin");
    }
  };

  useEffect(() => {
    if (currentUser) {
      setProfile(currentUser);
    } else {
      fetchProfile();
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile: any) => ({
      ...prevProfile,
      [name]: value,
    }));
    if (name === "role") {
      dispatch(setCurrentUser({ ...currentUser, role: value }));
    }
  };

  return (
    <div className="wd-profile-screen">
      <h1>Profile</h1>
      {profile && (
        <div>
          <input
            className="wd-username"
            name="username"
            value={profile.username || ""}
            onChange={handleChange}
          />
          <input
            className="wd-password"
            name="password"
            value={profile.password || ""}
            onChange={handleChange}
          />
          <input
            className="wd-firstname"
            name="firstName"
            value={profile.firstName || ""}
            onChange={handleChange}
          />
          <input
            className="wd-lastname"
            name="lastName"
            value={profile.lastName || ""}
            onChange={handleChange}
          />
          <input
            className="wd-dob"
            name="dob"
            value={profile.dob || ""}
            onChange={handleChange}
            type="date"
          />
          <input
            className="wd-email"
            name="email"
            value={profile.email || ""}
            onChange={handleChange}
          />
          <select
            className="wd-role"
            name="role"
            value={profile.role || "USER"}
            onChange={handleChange}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button onClick={signout} className="wd-signout-btn btn btn-danger w-100">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
