import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserLogin from "./authlogin";
import { FaLock, FaEye, FaEyeSlash,FaEnvelope} from 'react-icons/fa';


const Login = () => {
  const [formvalue, setFormvalue] = useState({
    Email: "",
    Password: "",
  });
  const navigate = useNavigate();


  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSubmit = () => {
  
    if (!formvalue.Email || !formvalue.Password) {
      alert("Enter each  input fields");
      return;
    } else {
      UserLogin(formvalue);
      navigate("/board");
    }
  };
  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div
          className="left"
          style={{
            height: "43.75rem",
            width: "43.75rem",
            background: "#17A2B8",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ height: "14.375rem", width: "21.875rem", margin: "auto" }}>
            <img
              src="roboimg.jpg"
              style={{ height: "9.375rem", width: "9.375rem", marginLeft: "5rem" }}
            />
            <div style={{}}>
              <p style={{ fontSize: "1.875rem", color: "white" }}>
                Welcome aboard my friend
              </p>
              <p
                style={{ fontSize: ".9375rem", color: "white", marginLeft: "3.125rem" }}
              >
                just a couple of clicks and we start
              </p>
            </div>
          </div>
        </div>
        <div
          className="right"
          style={{
            height: "25rem",
            width: "18.75rem",
            display: "flex",
            flexDirection: "column",
            margin: "auto",
          }}
        >
          <div>
            <span style={{ fontSize: "1.875rem" }}>Login</span>
          </div>
          <br />
          <br />
          <div>
          <FaEnvelope  style={{height:'.9375rem',width:'.9375rem',position:'absolute',marginLeft:'.3125rem',marginTop:'.625rem',color:'#D0D0D0'}}/>
            <input
              type="text"
              placeholder="Email"
              style={{ width: "15.625rem", height: "1.875rem", borderRadius: ".75rem",borderColor:'#D0D0D0',textAlign:'center' }}
              onInput={(e) =>
                setFormvalue({
                  ...formvalue,
                  Email: e.target.value,
                })
              }
              value={formvalue.Email}
            ></input>
    
          </div>
          <br />
          <div>
          <FaLock  style={{ height: ".9375rem", width: ".9375rem",position:'absolute',marginLeft:'.3125rem',marginTop:'.625rem',color:'#D0D0D0' }}/>
          
          <div onClick={togglePasswordVisibility} style={{position:'absolute',marginLeft:'17%',marginTop:'.625rem',color:'#D0D0D0'}}>
             {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              style={{ width: "15.625rem", height: "1.875rem", borderRadius: ".75rem" ,borderColor:'#D0D0D0',textAlign:'center'}}
              onInput={(e) =>
                setFormvalue({
                  ...formvalue,
                  Password: e.target.value,
                })
              }
              value={formvalue.Password}
            ></input>
      
          </div>
          <br />

          <div>
            <button
              type="button"
              style={{
                background: "#17A2B8",
                color: "white",
                height: "1.875rem",
                width: "15.625rem",
                borderRadius: ".9375rem",
                borderStyle:'none'
              }}
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <p style={{ marginLeft: "4.375rem" }}>Have no account yet?</p>
          <div>
            <button
              type="button"
              style={{
                background: "#fff",
                color: "#17A2B8",
                height: "1.875rem",
                width: "15.625rem",
                borderRadius: ".9375rem",
                borderColor:'lightblue'
              }}
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
