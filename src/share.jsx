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
        <div style={{height:'250px',width:'550px',background:'white',margin:'auto',marginTop:'15%',borderRadius:'10px',display:'flex',flexDirection:'column',borderStyle:'inset'}}>
            <div style={{marginLeft:'30px',marginTop:'20px',fontSize:'25px'}}>Add people to the board </div>
            <div style={{marginTop:'30px',marginLeft:'20px'}}>
                <input type = "text" placeholder="Enter the email" style={{height:'45px',width:'490px',border: '1px solid #767575',borderRadius:'10px'}}
                onChange={(e) =>  {
                  setUserAdded((prev) => ({
                    ...prev,
                    addemail: e.target.value
                  }));
          
                }
            }
                />
            </div>
            <div style={{display:'flex',flexDirection:'row',marginTop:'45px',marginLeft:'25px'}}>
                <div><button type="button" style={{height:'40px',width:'240px',border: '1px solid red',borderRadius:'10px',color:'red',fontWeight:'bold',fontSize:'15px'}}  onClick={handleCancel}>Cancel</button></div>
                <div style={{marginLeft:'10px'}}><button type="button" style={{height:'40px',width:'240px',borderStyle:'none',borderRadius:'10px',color:'white',background:'#17A2B8',fontWeight:'bold',fontSize:'15px'}} onClick={handleOpenAddemail}>Add Email</button></div>
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
