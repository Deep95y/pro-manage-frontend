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
        <div style={{height:'12.5rem',width:'18.75rem',display:'flex',flexDirection:'column',background:'white',borderRadius:'.625rem',margin:'auto',border: '.0625rem solid blue',}}>
            <div style={{margin:'auto',fontSize:'1.125rem',marginTop:'1.25rem'}}>Are you sure you want to Delete?</div><br/>
            <div style={{position:'absolute',marginLeft:'1.625rem',marginTop:'4.375rem'}}><button type = "button" style={{height:'2.5rem',width:'15.625rem',background: '#17A2B8',color:'white',borderRadius:'.5rem',borderStyle:'none'}} 
         onClick = {() => handleDelete(id)}>Yes Delete</button></div>
            <div style={{position:'absolute', marginLeft:'1.625rem',marginTop:'40%'}}><button type = "button" style={{height:'2.5rem',width:'15.625rem',background: 'white',color:'red',border: '.0625rem solid #CF3636',borderRadius:'.5rem'}} onClick = {closeBox}>Cancel</button></div>
        </div>
        </>
    );
}

export default Delete;