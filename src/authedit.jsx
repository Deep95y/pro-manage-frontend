
import React, {useEffect} from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const CardEdit = async ({formValue, id}) => {
    try{
        const AddJobLink = `${import.meta.env.VITE_API_URL}/task/editTask`; 
        const token = localStorage.getItem("token"); 
       
        axios.defaults.headers.common["Authorization"] = token; 
        const Response = await axios.patch(AddJobLink,{
            Tasks: formValue.Tasks,    
            Priority: formValue.Priority,
            AssignToEmail: formValue.AssignToEmail,
            DueDate: formValue.DueDate,
            Title: formValue.Title,
            id:  id
        });
    }catch(error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong.',
          });
    }
}

export default CardEdit;




