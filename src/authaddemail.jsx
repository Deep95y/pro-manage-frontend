import axios from 'axios';
import Swal from 'sweetalert2';

const authEmailAdd = async ( usertoAdd ) => {
  try {
    const addlink = `${import.meta.env.VITE_API_URL}/users/Adduser`;

    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common["Authorization"] = token; 
    } else {
      throw new Error("No token found");
    }

    const response = await axios.post(addlink, {
      usertoAdd
    });

  } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong.',
      });
    }
  };

export default authEmailAdd;
