
import {useEffect} from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const CardCreate = async ({formValue}) => {
    try{
        const AddJobLink = `${import.meta.env.VITE_API_URL}/task/createdata`; 
        const token = localStorage.getItem("token"); 
       
        axios.defaults.headers.common["Authorization"] = token; 
        const Response = await axios.post(AddJobLink,{
            Tasks: formValue.Tasks,    
            Priority: formValue.Priority,
            DueDate: formValue.DueDate,
            Title: formValue.Title,
            AssignTo: formValue.AssignTo
        });
      
    }catch(error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong.',
          });
    }
}

export default CardCreate;



