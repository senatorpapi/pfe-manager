import axios from "axios";
import { configuration } from "./configuration";

export const deleteSujet = async (idSujet) => {

    const config = await configuration()
    const token = localStorage.getItem("token")

    try {
        const url = config.DELETE_SUJET
        const data = {
            'id': idSujet
        }
        const response = axios.post(url, data, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return {data: response.data, status: response.status};
    } catch (error) {
        console.log(error)
        return null;
    }

}