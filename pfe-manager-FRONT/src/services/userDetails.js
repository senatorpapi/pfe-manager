import axios from "axios";
import { configuration } from "./configuration"

export const userDetails = async (username, token) => {
    const config = await configuration()

    try {
        const url = config.USER_DETAILS + `=${username}`;
        const axiosConfig = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            withCredentials: true,
            credentials: 'same-origin',
        }
        
        const response = await axios.get(url, axiosConfig);
        return {data: response.data, status: response.status};
    } catch (error) {
        console.log("Check backend !")
    }
}

export const getAllProfs = async () => {
    const config = await configuration()
    const token = localStorage.getItem("token")
    try {
        const url = config.GET_ALLPROF
        const response = await axios.get(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        return {data: response.data, status: response.status};
    } catch (error) {
        console.log(error)
        return null
    }
}