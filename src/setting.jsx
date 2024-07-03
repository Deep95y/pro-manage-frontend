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
        <div style={{borderRightStyle:'inset',width:'200px',borderRight: '1px solid #EDF5FE'}}><Sidebar /></div>
        <div className="right" style={{ height: "400px", width: '300px', display: 'flex', flexDirection: 'column', marginTop: '25px',marginLeft:'70px' }}>
          <div><span style={{ fontSize: '30px' }}>Setting</span></div><br /><br />
          <div>
          <FaUser  style={{height:'15px',width:'15px',position:'absolute',marginLeft:'5px',marginTop:'10px',color:'#D0D0D0'}}/>
            <input
              type="text"
              placeholder="Name"
              style={{ width: '300px', height: '30px', borderRadius: '9px', border: '2px solid #EDF5FE',textAlign:'center' }}
              onChange={(e) => setSettingvalue({ ...settingvalue, Name: e.target.value })}
              value={settingvalue.Name}
            />

          </div><br />
          <div>
          <FaEnvelope  style={{height:'15px',width:'15px',position:'absolute',marginLeft:'5px',marginTop:'10px',color:'#D0D0D0'}}/>
          <input
              type="text"
              placeholder="Update Email"
              style={{ width: '300px', height: '30px', borderRadius: '9px', border: '2px solid #EDF5FE',textAlign:'center' }}
              onChange={(e) => setSettingvalue({ ...settingvalue, Email: e.target.value })}
              value={settingvalue.Email}
            />
          </div>
         <br/>
          <div>
          <FaLock  style={{ height: "15px", width: "15px",position:'absolute',marginLeft:'5px',marginTop:'10px',color:'#D0D0D0' }}/>
          
          <div onClick={togglePasswordVisibility} style={{position:'absolute',marginLeft:'20%',marginTop:'10px',color:'#D0D0D0'}}>
             {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
            <input
              type="password"
              placeholder="Old Password"
              style={{ width: '300px', height: '30px', borderRadius: '9px', border: '2px solid #EDF5FE',textAlign:'center' }}
              onChange={(e) => setSettingvalue({ ...settingvalue, OldPassword: e.target.value })}
              value={settingvalue.OldPassword}
            />
   
          </div><br />
          <div>
          <FaLock  style={{ height: "15px", width: "15px",position:'absolute',marginLeft:'5px',marginTop:'10px',color:'#D0D0D0' }}/>
          
          <div onClick={togglePasswordVisibility} style={{position:'absolute',marginLeft:'20%',marginTop:'10px',color:'#D0D0D0'}}>
             {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
            <input
              type="password"
              placeholder="New Password"
              style={{ width: '300px', height: '30px', borderRadius: '9px', border: '2px solid #EDF5FE',textAlign:'center' }}
              onChange={(e) => setSettingvalue({ ...settingvalue, NewPassword: e.target.value })}
              value={settingvalue.NewPassword}
            />
            
          </div><br />
          <div>
            <button
              type="button"
              style={{ background: '#17A2B8', color: 'white', height: '40px', width: '310px', borderRadius: '20px', borderStyle: 'none',marginTop:'20px'}}
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
