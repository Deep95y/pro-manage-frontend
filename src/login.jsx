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
            height: "700px",
            width: "700px",
            background: "#17A2B8",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ height: "230px", width: "350px", margin: "auto" }}>
            <img
              src="roboimg.jpg"
              style={{ height: "150px", width: "150px", marginLeft: "80px" }}
            />
            <div style={{}}>
              <p style={{ fontSize: "30px", color: "white" }}>
                Welcome aboard my friend
              </p>
              <p
                style={{ fontSize: "15px", color: "white", marginLeft: "50px" }}
              >
                just a couple of clicks and we start
              </p>
            </div>
          </div>
        </div>
        <div
          className="right"
          style={{
            height: "400px",
            width: "300px",
            display: "flex",
            flexDirection: "column",
            margin: "auto",
          }}
        >
          <div>
            <span style={{ fontSize: "30px" }}>Login</span>
          </div>
          <br />
          <br />
          <div>
          <FaEnvelope  style={{height:'15px',width:'15px',position:'absolute',marginLeft:'5px',marginTop:'10px',color:'#D0D0D0'}}/>
            <input
              type="text"
              placeholder="Email"
              style={{ width: "250px", height: "30px", borderRadius: "12px",borderColor:'#D0D0D0',textAlign:'center' }}
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
          <FaLock  style={{ height: "15px", width: "15px",position:'absolute',marginLeft:'5px',marginTop:'10px',color:'#D0D0D0' }}/>
          
          <div onClick={togglePasswordVisibility} style={{position:'absolute',marginLeft:'17%',marginTop:'10px',color:'#D0D0D0'}}>
             {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              style={{ width: "250px", height: "30px", borderRadius: "12px" ,borderColor:'#D0D0D0',textAlign:'center'}}
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
                height: "30px",
                width: "250px",
                borderRadius: "15px",
                borderStyle:'none'
              }}
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <p style={{ marginLeft: "70px" }}>Have no account yet?</p>
          <div>
            <button
              type="button"
              style={{
                background: "#fff",
                color: "#17A2B8",
                height: "30px",
                width: "250px",
                borderRadius: "15px",
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
