import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserLogin from "./authlogin";
import { FaLock, FaEye, FaEyeSlash, FaEnvelope } from 'react-icons/fa';
import Swal from 'sweetalert2';

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
      Swal.fire({
        icon: 'error',
        text: 'Both input fields are required to be filled.',
      });
      return;
    } else {
      UserLogin(formvalue)
        .then(response => {
          if (response.status === 'Login successful') {
            localStorage.setItem("token", response.jwToken);
            navigate("/board");
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.status, // Display the response status message
            });
          }
        })
        .catch(error => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please try again later.',
          });
        });
    }
  };

  return (
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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="roboimg.jpg"
            alt="Robot"
            style={{ height: "150px", width: "150px" }}
          />
          <p style={{ fontSize: "30px", color: "white" }}>
            Welcome aboard my friend
          </p>
          <p style={{ fontSize: "15px", color: "white" }}>
            Just a couple of clicks and we start
          </p>
        </div>
      </div>
      <div
        className="right"
        style={{
          height: "400px",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <span style={{ fontSize: "30px" }}>Login</span>
        </div>
        <br />
        <div style={{ position: "relative", width: "250px" }}>
          <FaEnvelope
            style={{
              height: '15px',
              width: '15px',
              position: 'absolute',
              top: '10px',
              left: '5px',
              color: '#D0D0D0',
            }}
          />
          <input
            type="text"
            placeholder="Email"
            style={{ width: "100%", height: "30px", borderRadius: "12px", borderColor: '#D0D0D0', textAlign: 'center', paddingLeft: '25px' }}
            onChange={(e) =>
              setFormvalue({
                ...formvalue,
                Email: e.target.value,
              })
            }
            value={formvalue.Email}
            aria-label="Email"
          />
        </div>
        <br />
        <div style={{ position: "relative", width: "250px" }}>
          <FaLock
            style={{
              height: "15px",
              width: "15px",
              position: 'absolute',
              top: '10px',
              left: '5px',
              color: '#D0D0D0'
            }}
          />
          <div
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              top: '10px',
              right: '5px',
              color: '#D0D0D0',
              cursor: 'pointer'
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            style={{ width: "100%", height: "30px", borderRadius: "12px", borderColor: '#D0D0D0', textAlign: 'center', paddingLeft: '25px', paddingRight: '25px' }}
            onChange={(e) =>
              setFormvalue({
                ...formvalue,
                Password: e.target.value,
              })
            }
            value={formvalue.Password}
            aria-label="Password"
          />
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
              border: 'none'
            }}
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        <p style={{ textAlign: "center" }}>Have no account yet?</p>
        <div>
          <button
            type="button"
            style={{
              background: "#fff",
              color: "#17A2B8",
              height: "30px",
              width: "250px",
              borderRadius: "15px",
              border: '1px solid lightblue'
            }}
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
