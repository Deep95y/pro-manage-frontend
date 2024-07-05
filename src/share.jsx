import React,{useState,useEffect} from "react";
import AddedUser from './addeduser';
import Modal from "react-modal";
import axios from "axios";
import authEmailAdd from './authaddemail';

const Share = ({handleCloseAddpeople}) => {
  
    const [showAddemail, setShowAddemail] = useState(false);
    const [userAdded, setUserAdded] = useState({
        addemail: []
    });

     const handleCancel = () => {
        handleCloseAddpeople();
     }
// authEmailAdd(userAdded);
     const handleOpenAddemail = () => {
        if(!userAdded.addemail){
          alert("input is required");
        }
        else{
          authEmailAdd(userAdded.addemail);
          setShowAddemail(true);
        }
      
       };
      
        const handleCloseAddemail = () => {
          setShowAddemail(false);
        };

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
     
    return(  

        <>
        <div style={{height:'15.625rem',width:'34.375rem',background:'white',margin:'auto',marginTop:'15%',borderRadius:'.625rem',display:'flex',flexDirection:'column',borderStyle:'inset'}}>
            <div style={{marginLeft:'1.875rem',marginTop:'1.25rem',fontSize:'1.5625rem'}}>Add people to the board </div>
            <div style={{marginTop:'1.875rem',marginLeft:'1.25rem'}}>
                <input type = "text" placeholder="Enter the email" style={{height:'2.8125rem',width:'30.625rem',border: '.0625rem solid #767575',borderRadius:'.625rem'}}
                onChange={(e) =>  {
                  setUserAdded((prev) => ({
                    ...prev,
                    addemail: e.target.value
                  }));
          
                }
            }
                />
            </div>
            <div style={{display:'flex',flexDirection:'row',marginTop:'2.8125rem',marginLeft:'1.5625rem'}}>
                <div><button type="button" style={{height:'2.5rem',width:'15rem',border: '.0625rem solid red',borderRadius:'.625rem',color:'red',fontWeight:'bold',fontSize:'.9375rem'}}  onClick={handleCancel}>Cancel</button></div>
                <div style={{marginLeft:'.625rem'}}><button type="button" style={{height:'2.5rem',width:'15rem',borderStyle:'none',borderRadius:'.625rem',color:'white',background:'#17A2B8',fontWeight:'bold',fontSize:'.9375rem'}} onClick={handleOpenAddemail}>Add Email</button></div>
            </div>
        </div>

        <Modal
        isOpen={showAddemail}
        onRequestClose={handleCloseAddemail}
        style={customStyles}
      >
    <AddedUser handleCloseAddemail={handleCloseAddemail} handleCancel={handleCancel} userAdded={userAdded} authEmailAdd ={authEmailAdd}/>
      </Modal>
        </>
    )
}

export default Share;
