import { useNavigate } from "react-router-dom";
import React from "react";

const Logout = ({handleClose}) => {

    const navigate = useNavigate();
    const handleLogout =() => {
        navigate("/register");
    }

    const handleCancel = () => {
        handleClose();
    }
    return(
        <>
        <div style={{height:'220px',width:'300px',display:'flex',flexDirection:'column',background:'white',borderRadius:'10px',margin:'auto'}}>
            <div style={{margin:'auto',fontSize:'17px',fontWeight:'bold',marginTop:'20px'}}>Are you sure you want to Logout?</div><br/>
            <div style={{position:'absolute',marginLeft:'27px',marginTop:'27%'}}><button type = "button" style={{height:'40px',width:'250px',background: '#17A2B8',color:'white',borderRadius:'8px',borderStyle:'none',fontSize:'15px',fontWeight:'10px'}} onClick={handleLogout}>Yes, Logout</button></div>
            <div style={{margin:'auto'}}><button type = "button" style={{height:'40px',width:'250px',background: 'white',color:'red',borderRadius:'8px',border: '1px solid #CF3636',fontSize:'15px',fontWeight:'10px'}} onClick ={handleCancel}>Cancel</button></div>
        </div>
        </>
    );
}

export default Logout;