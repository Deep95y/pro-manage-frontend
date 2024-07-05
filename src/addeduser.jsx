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
       <div style={{height:'15.625rem',width:'34.375rem',background:'white',margin:'auto',marginTop:'15%',borderRadius:'.625rem',display:'flex',flexDirection:'column',borderStyle:'inset'}}>
           
           <div style={{margin:'auto',marginTop:'3.75rem',fontSize:'1.5625rem'}}>{userAdded.Addemail}</div>
           
            <div style={{marginLeft:'27%',position:'absolute',marginTop:'30%'}}><button type="button" style={{height:'2.5rem',width:'15rem',borderStyle:'none',borderRadius:'.625rem',color:'white',background:'#17A2B8',fontWeight:'bold',fontSize:'.9375rem'}} onClick={handleAdded}>Okay! got it</button></div>
        
       </div>
       </>
   )
}

export default AddedUser;