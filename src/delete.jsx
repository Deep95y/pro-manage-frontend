import React,{useState,useEffect} from "react";
import axios from "axios"; 

const Delete = ({closeBox,id,fetchTasks,period}) => {


    const handleDelete = (id) => {
        axios.delete(`${import.meta.env.VITE_API_URL}/task/deleteById?id=${id}`) 
          .then((res) => {

            fetchTasks(period);
          closeBox();
         
          })
          .catch((error) => console.log(error));
      }
    
    return(
        <>
        <div style={{height:'200px',width:'300px',display:'flex',flexDirection:'column',background:'white',borderRadius:'10px',margin:'auto',border: '1px solid blue',}}>
            <div style={{margin:'auto',fontSize:'18px',marginTop:'20px'}}>Are you sure you want to Delete?</div><br/>
            <div style={{position:'absolute',marginLeft:'26px',marginTop:'70px'}}><button type = "button" style={{height:'40px',width:'250px',background: '#17A2B8',color:'white',borderRadius:'8px',borderStyle:'none'}} 
         onClick = {() => handleDelete(id)}>Yes Delete</button></div>
            <div style={{position:'absolute', marginLeft:'26px',marginTop:'40%'}}><button type = "button" style={{height:'40px',width:'250px',background: 'white',color:'red',border: '1px solid #CF3636',borderRadius:'8px'}} onClick = {closeBox}>Cancel</button></div>
        </div>
        </>
    );
}

export default Delete;