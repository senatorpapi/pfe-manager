import axios from "axios";
import { configuration } from "./configuration"

export const createGroupe = async (sujet, idEtudiants) => {
    const config = await configuration()

    const data = JSON.stringify({
        etudiants: idEtudiants,
        sujet: sujet
    })
    const token = localStorage.getItem("token")
    try {
        const response = await axios.post(config.CREATE_GROUPE, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        });
        return {data: response.data, status: response.status};
    } catch (error) {
        console.log(error)
    }
}

export const getGroupeBySujetId = async (sujetID) => {
    const config = await configuration()
    const token = localStorage.getItem("token")

    try {
        const url = config.GET_GROUPE_BY_SUJET_ID + `=${sujetID}`
        const response = await axios.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return {data: response.data, status: response.status};

    } catch (error) {
        console.log(error)
        return null

    }
}

export const getAllGroupes = async () => {
    const config = await configuration()
    const token = localStorage.getItem("token")

    try {
        const url = config.GET_ALL_GROUPE
        const response = await axios.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return {data: response.data, status: response.status};
    } catch (error) {
        console.log(error)
        return null
    }
}