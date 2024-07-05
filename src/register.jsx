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
 
  window.localStorage.setItem("userInfo", JSON.stringify(formvalue));
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
      window.localStorage.setItem("userInfo", JSON.stringify(formvalue));
   
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
            height: "43.75rem",
            width: "43.75rem",
            background: "#17A2B8",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <img
              src="Art.png"
              style={{ height: "15.625rem", width: "15.625rem", marginLeft: "15rem", marginTop: "12%" }}
            />
          </div>
          <div style={{ fontSize: "1.875rem", color: "white", marginLeft: "11.875rem", position: "absolute", marginTop: "22%" }}>
            Welcome aboard my friend
          </div>
          <div style={{ fontSize: ".9375rem", color: "white", marginLeft: "15.625rem" }}>
            just a couple of clicks and we start
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
            <span style={{ fontSize: "1.875rem" }}>Register</span>
          </div>
          <br />
          <br />
          <div>
            <FaUser style={{ height: '.9375rem', width: '.9375rem', position: 'absolute', marginLeft: '.3125rem', marginTop: '.625rem', color: '#D0D0D0' }} />
            <input
              type="text"
              placeholder="Name"
              style={{ width: "15.625rem", height: "1.875rem", borderRadius: ".75rem", border: '.0625rem solid #EDF5FE', textAlign: 'center' }}
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
            <FaEnvelope style={{ height: '.9375rem', width: '.9375rem', position: 'absolute', marginLeft: '.3125rem', marginTop: '.625rem', color: '#D0D0D0' }} />
            <input
              type="text"
              placeholder="Email"
              style={{ width: "15.625rem", height: "1.875rem", borderRadius: ".75rem", border: '.0625rem solid #EDF5FE', textAlign: 'center' }}
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
            <FaLock style={{ height: ".9375rem", width: ".9375rem", position: 'absolute', marginLeft: '.3125rem', marginTop: '.625rem', color: '#D0D0D0' }} />
            <div onClick={togglePasswordVisibility} style={{ position: 'absolute', marginLeft: '17%', marginTop: '.625rem', color: '#D0D0D0' }}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              style={{ width: "15.625rem", height: "1.875rem", borderRadius: ".75rem", border: '.0625rem solid #EDF5FE', textAlign: 'center' }}
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
            <FaLock style={{ height: ".9375rem", width: ".9375rem", position: 'absolute', marginLeft: '.3125rem', marginTop: '.625rem', color: '#D0D0D0' }} />
            <div onClick={togglePasswordVisibility} style={{ position: 'absolute', marginLeft: '17%', marginTop: '.625rem', color: '#D0D0D0' }}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              style={{ width: "15.625rem", height: "1.875rem", borderRadius: ".75rem", border: '.0625rem solid #EDF5FE', textAlign: 'center' }}
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
                height: "1.875rem",
                width: "15.625rem",
                borderRadius: ".9375rem",
                borderStyle: 'none',
              }}
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
          <p style={{ marginLeft: "4.375rem" }}>Have an account?</p>
          <div onClick={handleLogin}>
            <button
              type="button"
              style={{
                background: "#fff",
                color: "#17A2B8",
                height: "1.875rem",
                width: "15.625rem",
                borderRadius: ".9375rem",
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
