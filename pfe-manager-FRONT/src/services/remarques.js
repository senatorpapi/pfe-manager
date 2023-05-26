import axios from "axios"
import { configuration } from "./configuration"

export const getRemarquesBySujet = async (idSujet) => {
    const config = await configuration()
    const token = localStorage.getItem("token")

    try {
        const url = config.GET_REMARQUES_BYSUJET + `=${idSujet}`
        console.log("getRemarquesBySujet", url)
        const response = await axios.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return {data: response.data, status: response.status}
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getRemarquesByUser = async (idUser) => {
    const config = await configuration()
    const token = localStorage.getItem("token")

    try {
        const url = config.GET_REMARQUES_BYUSER + `=${idUser}`
        const response = await axios.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return {data: response.data, status: response.status}
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getRemarquesByUserOfSujet = async (idUser, idSujet) => {
    const config = await configuration()
    const token = localStorage.getItem("token")

    try {
        const url = config.GET_REMARQUES_BYUSER_BYSUJET + `?idUser=${idUser}&idSujet=${idSujet}`
        const response = await axios.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return {data: response.data, status: response.status}
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const createRemarque = async (idUser, idSujet, message, document) => {
    if(document == null) {
        return await createRemarqueSimple(idUser, idSujet, message)
    }else {
        return await createRemarqueIncludeFile(idUser, idSujet, message, document)
    }
}

const createRemarqueSimple = async (idUser, idSujet, message) => {
    const config = await configuration()
    const token = localStorage.getItem("token")

    try {
        const url = config.CREATE_REMARQUE_SIMPLE
        const data = {
            "idSujet": idSujet,
            "idUser": idUser,
            "message": message
        }
      const response = await axios.post(url, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
      })
      return {data: response.data, status: response.status}
    } catch (error) {
        console.log(error)
        return null;
    }
}

const createRemarqueIncludeFile = async (idUser, idSujet, message, document ) => {
    const config = await configuration()
    const token = localStorage.getItem("token")

    try {
        const url = config.CREATE_REMARAQUE_HAS_DOCUMENT
        const data = new FormData()
        data.append("file", document)
        data.append("idSujet", idSujet)
        data.append("idUser", idUser)
        data.append("message", message)

        const response = await axios.post(url, data, {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: "Bearer " + token
            }
        })

        return {data: response.data, status: response.status}
    } catch (error) {
        console.log(error)
        return null;
    }
}