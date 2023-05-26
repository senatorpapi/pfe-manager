import axios from "axios"
import { configuration } from "./configuration";


export const auth = async (username, password) => {
    const config = await configuration()
    console.log(config.BACKEND_LOGIN)

    
    try {
        const data = JSON.stringify({
            username: username,
            password: password
        })
        
        const response = await axios.post(config.BACKEND_LOGIN, data, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log("response", response)
        return {data: response.data, status: response.status};
    } catch (error) {
        console.log(error)
        return null
    }
    
   
}

export const createAccourt = async (nom, prenom, login, email, password, typeUtilisateur) => {
    const config = await configuration()
    try {
        const data = JSON.stringify({
                "nom": nom,
                "prenom": prenom,
                "email": email,
                "login": login,
                "password": password,
                "typeUtilisateur": typeUtilisateur
        })
        const url = config.BACKEND_REGISTER
        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log("response", response)
        return {data: response.data, status: response.status};
    } catch (error) {
        console.log(error)
        return null
    }
}