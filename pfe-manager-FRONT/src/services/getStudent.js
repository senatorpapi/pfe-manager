import axios from "axios"
import { configuration } from "./configuration"

export const getStudent = async () => {
    const config = await configuration()
    const token = localStorage.getItem("token")

    try {
        const response = await axios(config.GET_STUDENT, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + token
            }
        });
        return {data: response.data, status: response.status};
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getStudentById = async (idStudent) => {
    const config = await configuration()
    const token = localStorage.getItem("token")

    try {
        const url = config.GET_STUDENT_BY_ID + `=${idStudent}`
        console.log("url", url)
        const response = await axios(url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + token
            }
        });
        return {data: response.data, status: response.status};
    } catch (error) {
        console.log(error)
        return null
    }
}


export const deleteStudent = async (idStudent) => {
    const config = await configuration()
    const token = localStorage.getItem("token")
    try {
        const url = config.DELETE_STUDENT
        const data = {
            "id": idStudent
        }

        const response = await axios.post(url, data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + token
            }
        });
        return {data: response.data, status: response.status};
    } catch (error) {
        console.log(error)
        return null
    }

}

export const getDispoStudent = async () => {
    
    const config = await configuration()
    const token = localStorage.getItem("token")
    try {
        const url = config.GET_DISPO_STUDENT
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


export const getGroupeOfStudent = async (idStudent) => {
    const config = await configuration()
    const token = localStorage.getItem("token")
    try {
        const url = config.GET_GROUPE_BY_STUDENT_ID + `=${idStudent}`

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

export const getUserDetails = async (idUser) => {
    const config = await configuration()
    const token = localStorage.getItem("token")
    try {
        const url = config.GET_USER_DETAILS + `=${idUser}`

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