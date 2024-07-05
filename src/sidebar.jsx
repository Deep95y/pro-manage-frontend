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
    <div style={{display:'flex',flexDirection:'row',marginTop:'20%',width:'15.625rem'}}>
       <div style={{marginTop:'.375rem',marginLeft:'.75rem'}}><SiCodesandbox size={17} color="blue" /></div>
      <div style={{ cursor: "pointer", color: "black",fontWeight:'bold',fontSize:'1.5625rem',fontFamily:'sans-serif',marginLeft:'.625rem' }}>Pro Manage</div></div>
      <br />
      <div   className="board" style={{display:'flex',flexDirection:'row',marginTop:'15%'}}>
      <div style={{marginTop:'.3125rem',marginLeft:'.625rem'}}><MdDashboard size={20} color="#707070" /></div>
      <div  style={{ cursor: "pointer",color:"#707070",marginLeft:'.625rem',fontSize:'1.5625rem',fontFamily:'sans-serif'}} onClick={handleBoard}>
        Board
      </div></div>
      <br />
      <div  className="analytics" style={{display:'flex',flexDirection:'row',marginTop:'13%'}}>
      <div style={{marginTop:'1.1875rem',marginLeft:'.625rem'}}><FaDatabase size={20} color="#707070" /></div>
      <div style={{ cursor: "pointer",color:"#707070",marginLeft:'.625rem',fontSize:'1.5625rem',fontFamily:'sans-serif',marginTop:'.8125rem'}} onClick={handleAnalytics}>
        Analytics
      </div></div>
      <br />
      <div className="setting" style={{ cursor: "pointer",color:"#707070",marginTop:'10%',display:'flex',flexDirection:'row'}} onClick={handleSetting}>
        <div><img
          src="setting.png"
          style={{ height: "1.875rem", width: "1.875rem", cursor: "pointer",marginTop:'.9375rem',marginLeft:'.3125rem',color:'#707070' }}
        ></img></div>
        <div style={{marginLeft:'.3125rem',fontSize:'1.5625rem',fontFamily:'sans-serif',marginTop:'.8125rem'}}>Setting</div>
      </div>

      <div style={{ display: "flex", flexDirection: "row",marginTop:'150%' }}>
        <div>
          <img
            src="logout.png"
            style={{ height: "1.375rem", width: "2.1875rem", cursor: "pointer",marginTop:'1.25rem',marginLeft:'.625rem' }}
          />
        </div>
        <div onClick={handleOpen}>
          <p style={{ color: "red", cursor: "pointer",fontFamily:'sans-serif',fontSize:'1.25rem',marginLeft:'.625rem',fontWeight:'12.5rem' }}>Log out</p>
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
