import React,{useState,useEffect} from "react"; 
// import authEmailAdd from './share';

const AddedUser = ({handleCloseAddemail, handleCancel,userAdded}) => {
   
    const handleAdded = () => {
       handleCloseAddemail();
       handleCancel();
    //    authEmailAdd(userAdded);
    }

   return(

       <>
       <div style={{height:'250px',width:'550px',background:'white',margin:'auto',marginTop:'15%',borderRadius:'10px',display:'flex',flexDirection:'column',borderStyle:'inset'}}>
           
           <div style={{margin:'auto',marginTop:'60px',fontSize:'25px'}}>{userAdded.Addemail}</div>
           
            <div style={{marginLeft:'27%',position:'absolute',marginTop:'30%'}}><button type="button" style={{height:'40px',width:'240px',borderStyle:'none',borderRadius:'10px',color:'white',background:'#17A2B8',fontWeight:'bold',fontSize:'15px'}} onClick={handleAdded}>Okay! got it</button></div>
        
       </div>
       </>
   )
}

export default AddedUser;