import axios from "axios"

export const configuration = async () => {
    const config = await axios.get("/config.json")
    console.log("configuration", config)
    const data = config.data
    console.log("data", data)
    return data
}