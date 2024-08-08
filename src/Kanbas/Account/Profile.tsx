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
      dispatch(setCurrentUser(account));
    } catch (err: any) {
      navigate("/Kanbas/Account/Signin");
    }
  };

  const saveProfile = async () => {
    try {
      await client.updateProfile(profile._id, profile)
      alert('Profile saved successfully')
    } catch (err: any) {
      console.error('Error saving profile:', err)
      alert('Error saving profile')
    }
  }


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
  };

  return (
    <div className="wd-profile-screen">
      <h1>Profile</h1>
      {profile && (
        <div>
          <input
            className="wd-username form-control mb-2"
            name="username"
            value={profile.username || ""}
            onChange={handleChange}
            placeholder="Username"
            disabled // Assuming username shouldn't be editable
          />
          <input
            className="wd-password form-control mb-2"
            name="password"
            type="password"
            value={profile.password || ""}
            onChange={handleChange}
            placeholder="Password"
            disabled // Assuming password isn't handled here
          />
          <input
            className="wd-firstname form-control mb-2"
            name="firstName"
            value={profile.firstName || ""}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            className="wd-lastname form-control mb-2"
            name="lastName"
            value={profile.lastName || ""}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            className="wd-dob form-control mb-2"
            name="dob"
            value={profile.dob || ""}
            onChange={handleChange}
            type="date"
          />
          <input
            className="wd-email form-control mb-2"
            name="email"
            value={profile.email || ""}
            onChange={handleChange}
            placeholder="Email"
          />
          <select
            className="wd-role form-control mb-2"
            name="role"
            value={profile.role || "USER"}
            onChange={handleChange}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button
            onClick={saveProfile}
            className="wd-save-btn btn btn-success w-100 mb-2"
          >
            Save Changes
          </button>
          <button
            onClick={signout}
            className="wd-signout-btn btn btn-danger w-100"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
