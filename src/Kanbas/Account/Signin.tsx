import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signin() {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState<any>({});
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const signin = async () => {
    try {
      const currentUser = await client.signin(credentials);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kanbas/Account/Profile");
    }
    catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      {error && <div className="wd-error alert alert-danger">{error}</div>}
      <input id="wd-username" onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        value={credentials.username} className="form-control mb-2" placeholder="username" />
      <input id="wd-password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        value={credentials.password} className="form-control mb-2" placeholder="password" type="password" />
      <button id="wd-signin-btn" onClick={signin} className="btn btn-primary w-100"> Sign in </button>
      <br />
      <Link id="wd-signup-link" to="/Kanbas/Account/Signup">Sign up</Link>
<br/><br/><br/>

      <div className='mt-5 text-center'>
        <h1
          className='mb-3'
        >
          Developed by:
        </h1>
        <p className='mb-1' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          Sai Charan Reddy Avula
        </p>
        <p className='mb-1' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          Saloni Chandra Pal Singh Chauhan

        </p>
        <p className='mb-1' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          Nayna Vijay Shevkari
        </p>
        <p className='mb-4' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          Aditya Puttigampala
        </p>
        <div>
          <h1
            className='mb-3'          
          >
            Git Repositories:
          </h1>
          <a
            href='https://github.com/saicharan-cpu/kanbas-node-server-app_Group'
            target='_blank'
            rel='noopener noreferrer'
            className='btn btn-link'
            
          >
            Kanbas Node Repository
          </a><br/>
          <a
            href='https://github.com/saicharan-cpu/kanbas-react-web-app_Group'
            target='_blank'
            rel='noopener noreferrer'
            className='btn btn-link'
          >
            Kanbas React Repository
          </a>
       
        
        </div>
      </div>
    </div>
  );
}
