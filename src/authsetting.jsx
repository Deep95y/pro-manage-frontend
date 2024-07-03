

import React, { useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const SettingPassword = async ({settingvalue}) => { 
   
    try {
        const SetPassword = `${import.meta.env.VITE_API_URL}/auth/passwordSetting`; 
        const token = localStorage.getItem("token");
    
 
        if (!token) {
            throw new Error("Authorization token not found");
        }
     
        axios.defaults.headers.common["Authorization"] = token;
        
        const response = await axios.post(SetPassword, {   
            Name: settingvalue.Name,
            Email: settingvalue.Email,
            OldPassword: settingvalue.OldPassword,
            NewPassword: settingvalue.NewPassword,
        });

        return response.data
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong/',
          });

    }
}

export default SettingPassword;


