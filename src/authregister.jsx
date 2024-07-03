import axios from "axios";
import Swal from 'sweetalert2';

const UserRegistered = async ({Name, Email, Password, ConfirmPassword}) => {
    try{
        const RegLink = `${import.meta.env.VITE_API_URL}/auth/signup`;
        const RegResponse = await axios.post(RegLink, {
            Name,
            Email, 
            Password,
            ConfirmPassword
        });
        return RegResponse.data;
    }catch(error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong.',
          });
    }
}

export default UserRegistered;
