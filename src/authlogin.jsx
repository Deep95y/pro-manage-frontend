import axios from "axios";

const UserLogin = async ({Email, Password}) => {
    const LogLink = `${import.meta.env.VITE_API_URL}/auth/login`;
    const LogResponse = await axios.post(LogLink, { Email, Password });
    return LogResponse.data

}

export default UserLogin;

