import Sidebar from './sidebar';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import SettingPassword from './authsetting';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaEnvelope, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Setting = () => {
  const [settingvalue, setSettingvalue] = useState({
    Name: "",
    Email:"",
    OldPassword: "",
    NewPassword: ""
  });

  const navigate = useNavigate();

  
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUpdate = () => {
    if (!settingvalue.Name || !settingvalue.OldPassword || !settingvalue.NewPassword) {
      Swal.fire({
        icon: 'error',
        text: 'All input fields are required to be filled.',
      });

    } else {
      
      SettingPassword({settingvalue})
      .then(response => {
        Swal.fire({
          icon: 'info',
          text: response.status,
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. Please try again later.',
        });
      })
    }
  };

  return (
    <>
      <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'row' }}>
        <div style={{borderRightStyle:'inset',width:'12.5rem',borderRight: '.0625rem solid #EDF5FE'}}><Sidebar /></div>
        <div className="right" style={{ height: "25rem", width: '18.75rem', display: 'flex', flexDirection: 'column', marginTop: '1.5625rem',marginLeft:'4.375rem' }}>
          <div><span style={{ fontSize: '1.875rem' }}>Setting</span></div><br /><br />
          <div>
          <FaUser  style={{height:'.9375rem',width:'.9375rem',position:'absolute',marginLeft:'.3125rem',marginTop:'.625rem',color:'#D0D0D0'}}/>
            <input
              type="text"
              placeholder="Name"
              style={{ width: '18.75rem', height: '1.875rem', borderRadius: '.5625rem', border: '.125rem solid #EDF5FE',textAlign:'center' }}
              onChange={(e) => setSettingvalue({ ...settingvalue, Name: e.target.value })}
              value={settingvalue.Name}
            />

          </div><br />
          <div>
          <FaEnvelope  style={{height:'.9375rem',width:'.9375rem',position:'absolute',marginLeft:'.3125rem',marginTop:'.625rem',color:'#D0D0D0'}}/>
          <input
              type="text"
              placeholder="Update Email"
              style={{ width: '18.75rem', height: '1.875rem', borderRadius: '.5625rem', border: '.125rem solid #EDF5FE',textAlign:'center' }}
              onChange={(e) => setSettingvalue({ ...settingvalue, Email: e.target.value })}
              value={settingvalue.Email}
            />
          </div>
         <br/>
          <div>
          <FaLock  style={{ height: ".9375rem", width: ".9375rem",position:'absolute',marginLeft:'.3125rem',marginTop:'.625rem',color:'#D0D0D0' }}/>
          
          <div onClick={togglePasswordVisibility} style={{position:'absolute',marginLeft:'20%',marginTop:'.625rem',color:'#D0D0D0'}}>
             {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
            <input
              type="password"
              placeholder="Old Password"
              style={{ width: '18.75rem', height: '1.875rem', borderRadius: '.5625rem', border: '.125rem solid #EDF5FE',textAlign:'center' }}
              onChange={(e) => setSettingvalue({ ...settingvalue, OldPassword: e.target.value })}
              value={settingvalue.OldPassword}
            />
   
          </div><br />
          <div>
          <FaLock  style={{ height: ".9375rem", width: ".9375rem",position:'absolute',marginLeft:'.3125rem',marginTop:'.625rem',color:'#D0D0D0' }}/>
          
          <div onClick={togglePasswordVisibility} style={{position:'absolute',marginLeft:'20%',marginTop:'.625rem',color:'#D0D0D0'}}>
             {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
            <input
              type="password"
              placeholder="New Password"
              style={{ width: '18.75rem', height: '1.875rem', borderRadius: '.5625rem', border: '.125rem solid #EDF5FE',textAlign:'center' }}
              onChange={(e) => setSettingvalue({ ...settingvalue, NewPassword: e.target.value })}
              value={settingvalue.NewPassword}
            />
            
          </div><br />
          <div>
            <button
              type="button"
              style={{ background: '#17A2B8', color: 'white', height: '2.5rem', width: '19.375rem', borderRadius: '1.25rem', borderStyle: 'none',marginTop:'1.25rem'}}
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
