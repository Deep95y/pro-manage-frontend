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
        <div style={{height:'13.75rem',width:'18.75rem',display:'flex',flexDirection:'column',background:'white',borderRadius:'.625rem',margin:'auto'}}>
            <div style={{margin:'auto',fontSize:'1.0625rem',fontWeight:'bold',marginTop:'1.25rem'}}>Are you sure you want to Logout?</div><br/>
            <div style={{position:'absolute',marginLeft:'1.6875rem',marginTop:'27%'}}><button type = "button" style={{height:'2.5rem',width:'15.625rem',background: '#17A2B8',color:'white',borderRadius:'.5rem',borderStyle:'none',fontSize:'.9375rem',fontWeight:'.625rem'}} onClick={handleLogout}>Yes, Logout</button></div>
            <div style={{margin:'auto'}}><button type = "button" style={{height:'2.5rem',width:'15.625rem',background: 'white',color:'red',borderRadius:'.5rem',border: '.0625rem solid #CF3636',fontSize:'.9375rem',fontWeight:'.625rem'}} onClick ={handleCancel}>Cancel</button></div>
        </div>
        </>
    );
}

export default Logout;