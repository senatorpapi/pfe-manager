import axios from "axios"
import { configuration } from "./configuration"

export const getSujet = async () => {
    const config = await configuration()
    const token = localStorage.getItem("token")

    try {
        const response = await axios.get(config.GET_SUJET, {
            headers: {
                Authorization: "Bearer " + token 
            }
        });
        return {data: response.data, status: response.status};
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getSujetById = async (idSujet) => {
    const config = await configuration()
    const token = localStorage.getItem("token")

    try {
        const url = config.GET_SUJET_BY_ID + `=${idSujet}`
        const response = await axios.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return {data: response.data, status: response.status}
    } catch (error) {
        console.log(error)
        return null
    }
}

export const modifySujet = async (idSujet, titre, description, status) => {
    const config = await configuration()
    const token = localStorage.getItem("token")
    try {
        const url = config.MODIFY_SUJET 
        
        const data = JSON.stringify({
            "id": idSujet,
            "titre": titre,
            "description": description,
            "status": status
        })
        console.log(url, data)
        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ token
            }
        });

        return {data: response.data, status: response.status}

    } catch (error) {
        console.log(error)
        return null
    }

}

export const getMySujet = async (idUser) => {
    const config = await configuration()
    const token = localStorage.getItem("token")

    try {
        const url = config.GET_MY_SUJET + `=${idUser}`
        const response = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
        return {data: response.data, status: response.status}
    } catch (error) {
        console.log(error)
        return null
    }
}


export const getDispoSujet = async () => {
    const config = await configuration()
    const token = localStorage.getItem("token")

    try {
        const url = config.GET_DISPO_SUJET
        const response = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
        return {data: response.data, status: response.status}
    } catch (error) {
        console.log(error)
        return null
    }
}

export const createSujet = async (titre, description ) => {
    const config = await configuration()
    const token = localStorage.getItem("token")
    const idUser = localStorage.getItem("userID")

    try {
        const url = config.CREATE_SUJET
        const data = {
            "titre": titre,
            "description": description
      }
        const response = await axios.post(url, data, {
            headers: {
                "user-id": idUser,
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
        return {data: response.data, status: response.status}
    } catch (error) {
        console.log(error)
        return null
    }

}