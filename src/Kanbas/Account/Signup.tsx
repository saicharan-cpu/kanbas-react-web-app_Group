import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

const roles = ["STUDENT", "FACULTY", "ADMIN"];

export default function Signup() {
    const dispatch = useDispatch();
    const [user, setUser] = useState<any>({});
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const signup = async () => {
        if (!user.role) {
            setError("Role is required");
            return;
        }
        try {
            const currentUser = await client.signup(user);
            dispatch(setCurrentUser(currentUser));
            navigate("/Kanbas/Account/Profile");
        } catch (err: any) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="wd-signup-screen">
            <h1>Sign up</h1>
            {error && <div className="wd-error alert alert-danger">{error}</div>}
            <input 
                value={user.username} 
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="wd-username form-control mb-2" 
                placeholder="username" 
            />
            <input 
                value={user.password} 
                onChange={(e) => setUser({ ...user, password: e.target.value })} 
                type="password"
                className="wd-password form-control mb-2" 
                placeholder="password" 
            />
            <select 
                value={user.role || ""}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                className="wd-role form-control mb-2"
            >
                <option value="" disabled>Select role</option>
                {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                ))}
            </select>
            <button 
                onClick={signup} 
                className="wd-signup-btn btn btn-primary mb-2"
            >
                Sign up
            </button>
            <br />
            <Link to="/Kanbas/Account/Signin" className="wd-signin-link">Sign in</Link>
        </div>
    );
}
