import React, { useState } from "react";
import Logout from "./logout";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { FaDatabase } from 'react-icons/fa';  
import { SiCodesandbox } from 'react-icons/si';
import { MdDashboard } from 'react-icons/md';

const Sidebar = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.90)',
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      background: "transparent",
      margin: 0,
      padding: 0,
      border: "none",
      outline: "none",
      position: "fixed",
      boxSizing: "border-box",  
      overflow: "hidden",
    },
  };

  Modal.setAppElement("#root");

  const handleOpen = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleBoard = () => {
    navigate("/board");
  };

  const handleAnalytics = () => {
    navigate("/analytics");
  };

  const handleSetting = () => {
    navigate("/setting");
  };

  return (
    <>
    <div style={{display:'flex',flexDirection:'row',marginTop:'20%',width:'250px'}}>
       <div style={{marginTop:'6px',marginLeft:'12px'}}><SiCodesandbox size={17} color="blue" /></div>
      <div style={{ cursor: "pointer", color: "black",fontWeight:'bold',fontSize:'25px',fontFamily:'sans-serif',marginLeft:'10px' }}>Pro Manage</div></div>
      <br />
      <div   className="board" style={{display:'flex',flexDirection:'row',marginTop:'15%'}}>
      <div style={{marginTop:'5px',marginLeft:'10px'}}><MdDashboard size={20} color="#707070" /></div>
      <div  style={{ cursor: "pointer",color:"#707070",marginLeft:'10px',fontSize:'25px',fontFamily:'sans-serif'}} onClick={handleBoard}>
        Board
      </div></div>
      <br />
      <div  className="analytics" style={{display:'flex',flexDirection:'row',marginTop:'13%'}}>
      <div style={{marginTop:'19px',marginLeft:'10px'}}><FaDatabase size={20} color="#707070" /></div>
      <div style={{ cursor: "pointer",color:"#707070",marginLeft:'10px',fontSize:'25px',fontFamily:'sans-serif',marginTop:'13px'}} onClick={handleAnalytics}>
        Analytics
      </div></div>
      <br />
      <div className="setting" style={{ cursor: "pointer",color:"#707070",marginTop:'10%',display:'flex',flexDirection:'row'}} onClick={handleSetting}>
        <div><img
          src="setting.png"
          style={{ height: "30px", width: "30px", cursor: "pointer",marginTop:'15px',marginLeft:'5px',color:'#707070' }}
        ></img></div>
        <div style={{marginLeft:'5px',fontSize:'25px',fontFamily:'sans-serif',marginTop:'13px'}}>Setting</div>
      </div>

      <div style={{ display: "flex", flexDirection: "row",marginTop:'150%' }}>
        <div>
          <img
            src="logout.png"
            style={{ height: "22px", width: "35px", cursor: "pointer",marginTop:'20px',marginLeft:'10px' }}
          />
        </div>
        <div onClick={handleOpen}>
          <p style={{ color: "red", cursor: "pointer",fontFamily:'sans-serif',fontSize:'20px',marginLeft:'10px',fontWeight:'200px' }}>Log out</p>
        </div>
      </div>

      <Modal
        isOpen={showPopup}
        onRequestClose={handleClose}
        style={customStyles}
      >
        {<Logout handleClose={handleClose} />}
      </Modal>
    </>
  );
};

export default Sidebar;
