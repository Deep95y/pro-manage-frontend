import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserRegistered from "./authregister";
import { FaLock, FaEye, FaEyeSlash, FaEnvelope, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Register = () => {
  const [formvalue, setFormvalue] = useState({
    Name: "",
    Email: "",
    ConfirmPassword: "",
    Password: "",
  });

  const [errors, setFormerror] = useState({
    Name: null,
    Email: null,
    ConfirmPassword: null,
    Password: null,
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSubmit = () => {
    let isError = false;

    if (!formvalue.Name) {
      setFormerror((prev) => ({ ...prev, Name: "Name is required" }));
      isError = true;
    } else {
      setFormerror((prev) => ({ ...prev, Name: null }));
    }

    if (!formvalue.Email) {
      setFormerror((prev) => ({ ...prev, Email: "Email is required" }));
      isError = true;
    } else {
      setFormerror((prev) => ({ ...prev, Email: null }));
    }

    if (!formvalue.Password) {
      setFormerror((prev) => ({ ...prev, Password: "Password is required" }));
      isError = true;
    } else {
      setFormerror((prev) => ({ ...prev, Password: null }));
    }

    if (!formvalue.ConfirmPassword) {
      setFormerror((prev) => ({
        ...prev,
        ConfirmPassword: "Confirm Password is required",
      }));
      isError = true;
    } else {
      setFormerror((prev) => ({ ...prev, ConfirmPassword: null }));
    }

    if (formvalue.Password && formvalue.ConfirmPassword && formvalue.Password !== formvalue.ConfirmPassword) {
      setFormerror((prev) => ({
        ...prev,
        ConfirmPassword: "Passwords do not match",
      }));
      isError = true;
    }

    if (isError) {
      return;
    } else {
      UserRegistered(formvalue)
      .then(response => {
        if (response.status === 'SUCCESS') {
          Swal.fire({
            icon: 'success',
            title: 'Signed Up!',
            text: 'You have successfully signed up. Redirecting to login...',
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            navigate('/login'); // Redirect to login page
          });
        } else if (response.status === 'User with this email exist, please login') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User with this email exists, please login.',
          });
        }
      })
      .catch(error => {
        console.error('Error registering user:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred during registration. Please try again later.',
        });
      });
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
          <div>
            <img
              src="Art.png"
              style={{ height: "250px", width: "250px", marginLeft: "240px", marginTop: "12%" }}
            />
          </div>
          <div style={{ fontSize: "30px", color: "white", marginLeft: "190px", position: "absolute", marginTop: "22%" }}>
            Welcome aboard my friend
          </div>
          <div style={{ fontSize: "15px", color: "white", marginLeft: "250px" }}>
            just a couple of clicks and we start
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
            <span style={{ fontSize: "30px" }}>Register</span>
          </div>
          <br />
          <br />
          <div>
            <FaUser style={{ height: '15px', width: '15px', position: 'absolute', marginLeft: '5px', marginTop: '10px', color: '#D0D0D0' }} />
            <input
              type="text"
              placeholder="Name"
              style={{ width: "250px", height: "30px", borderRadius: "12px", border: '1px solid #EDF5FE', textAlign: 'center' }}
              onInput={(e) =>
                setFormvalue({
                  ...formvalue,
                  Name: e.target.value,
                })
              }
              value={formvalue.Name}
            ></input>
            <div id="errors">{errors.Name}</div>
          </div>
          <br />
          <div>
            <FaEnvelope style={{ height: '15px', width: '15px', position: 'absolute', marginLeft: '5px', marginTop: '10px', color: '#D0D0D0' }} />
            <input
              type="text"
              placeholder="Email"
              style={{ width: "250px", height: "30px", borderRadius: "12px", border: '1px solid #EDF5FE', textAlign: 'center' }}
              onInput={(e) =>
                setFormvalue({
                  ...formvalue,
                  Email: e.target.value,
                })
              }
              value={formvalue.Email}
            ></input>
            <div id="errors">{errors.Email}</div>
          </div>
          <br />
          <div>
            <FaLock style={{ height: "15px", width: "15px", position: 'absolute', marginLeft: '5px', marginTop: '10px', color: '#D0D0D0' }} />
            <div onClick={togglePasswordVisibility} style={{ position: 'absolute', marginLeft: '17%', marginTop: '10px', color: '#D0D0D0' }}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              style={{ width: "250px", height: "30px", borderRadius: "12px", border: '1px solid #EDF5FE', textAlign: 'center' }}
              onInput={(e) =>
                setFormvalue({
                  ...formvalue,
                  Password: e.target.value,
                })
              }
              value={formvalue.Password}
            ></input>
            <div id="errors">{errors.Password}</div>
          </div>
          <br />
          <div>
            <FaLock style={{ height: "15px", width: "15px", position: 'absolute', marginLeft: '5px', marginTop: '10px', color: '#D0D0D0' }} />
            <div onClick={togglePasswordVisibility} style={{ position: 'absolute', marginLeft: '17%', marginTop: '10px', color: '#D0D0D0' }}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              style={{ width: "250px", height: "30px", borderRadius: "12px", border: '1px solid #EDF5FE', textAlign: 'center' }}
              onInput={(e) =>
                setFormvalue({
                  ...formvalue,
                  ConfirmPassword: e.target.value,
                })
              }
              value={formvalue.ConfirmPassword}
            ></input>
            <div id="errors">{errors.ConfirmPassword}</div>
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
                borderStyle: 'none',
              }}
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
          <p style={{ marginLeft: "70px" }}>Have an account?</p>
          <div onClick={handleLogin}>
            <button
              type="button"
              style={{
                background: "#fff",
                color: "#17A2B8",
                height: "30px",
                width: "250px",
                borderRadius: "15px",
                borderColor: 'lightblue',
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
