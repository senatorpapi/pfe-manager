import React, { useEffect, useState } from 'react'
import { Student } from '../components/Student'
import { Admin } from '../components/Admin'
import { Prof } from '../components/Prof'

export const Home = () => {

    const [userType, setUserType] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const uType = localStorage.getItem("userType")
        setUserType(uType)
        setLoading(false)
    }, [])



    if(loading) {
        return (
            <div>LOADING....</div>
        )
    }else{
        if (userType === "ETUDIANT") {
            return (
                <Student/>
            )
        }
        if (userType === "ENSEIGNANT") {
            return (
                <Prof />
            )
        }
        if (userType === "ADMIN") {

            return (
                <Admin />
            )
        }
    }

    
}