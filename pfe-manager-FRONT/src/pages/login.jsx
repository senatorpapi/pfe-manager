import React, { useEffect } from 'react'
import { useState } from 'react'
import { auth, createAccourt } from '../services/login'
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardImage,
    MDBCardBody
  }
  from 'mdb-react-ui-kit';
import { userDetails } from '../services/userDetails';
import { useNavigate } from 'react-router-dom';




export const Login = () => {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [submit, setSubmit] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(login && login != null && password && password != null && submit == true) {
            console.log("Start login")
            console.log({login, password})
            auth(login, password)
            .then(result => {
                if(result.status != 200) {
                    console.log("err auth", result.data)
                    setMessage(result.data)
                }else {
                    console.log("success auth", result.data)
                    localStorage.setItem("token", result.data.token)
                    localStorage.setItem("userID", result.data.userId)
                    localStorage.setItem("userType", result.data.typeUtilisateur)
                    localStorage.setItem("username", result.data.username)
                    navigate("/home")
                }
            })
            .catch(err => {
                alert("Verifier le traitement auth !")
            })
            
        }
    }, [submit])
    
    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            
            <div className="text-center">
                <img src='ensias.jpeg'/>
            </div>
            <MDBInput wrapperClass='mb-3' label='Username' id='form1' type='email' onChange={event => setLogin(event.target.value)} value={login}/>
            <MDBInput wrapperClass='mb-3' label='mot de passe' id='form2' type='password' onChange={event => setPassword(event.target.value)} value={password}/>
            <MDBBtn className="mb-4" onClick={() => setSubmit(true)}>Sign in</MDBBtn>
            <a href="/register">Register</a>
        </MDBContainer>
    )
}

export const Register = () => {

    const userValue = [
        {key: "ETUDIANT", value: "Etudiant"},
        {key: "ENSEIGNANT", value: "Enseignant"},
        {key: "ADMIN", value: "Administrateur"}
    ]

    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [email, setEmail] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [toSubmit, setToSubmit] = useState(false)
    const [visible, setVisible] = useState(false)
    const [typeUtilisateur, setTypeUtilisateur] = useState(userValue[0].key)
    const navigate = useNavigate()

    useEffect(() => {
        if(nom  !== "" && prenom !== "" && email !== "" && login !== "" && password !== "") {
            setVisible(true)
        }else {
            setVisible(false)
        }
    }, [nom, prenom, email, login, password])

    useEffect(() => {
        if(toSubmit === true) {
            createAccourt(nom, prenom, login, email, password, typeUtilisateur)
            .then((result) => {
                if(result && result.status == 200){
                    navigate("/")
                }
            })
        }
    }, [toSubmit])

    return (
        <MDBContainer>

            <MDBRow className='justify-content-center'>

                <MDBCol lg='5'>

                <MDBCard className='my-5 rounded-3' style={{maxWidth: 'auto'}}>
                    <MDBCardImage src='ensiasschool.jpeg' className='w-100 rounded-top'  alt="Sample photo"/>

                    <MDBCardBody className='px-5'>

                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2"></h3>
                    <MDBInput wrapperClass='mb-4' label='Nom' id='form1' type='text' value={nom} onChange={(event) => setNom(event.target.value)} />
                    <MDBInput wrapperClass='mb-4' label='Prenom' id='form1' type='text' value={prenom} onChange={(event) => setPrenom(event.target.value)} />
                    <MDBInput wrapperClass='mb-4' label='email' id='form1' type='email' value={email} onChange={(event) => setEmail(event.target.value)} />
                    <MDBInput wrapperClass='mb-4' label='Login' id='form1' type='text' value={login} onChange={(event) => setLogin(event.target.value)} />
                    <MDBInput wrapperClass='mb-4' label='password' id='form1' type='password' value={password} onChange={(event) => setPassword(event.target.value)} />

                    <label for="exampleFormControlSelect">Type de l'utilisateur</label>
                    <select className="mb-4 custom-select" value={typeUtilisateur} onChange={(event) => setTypeUtilisateur(event.target.value)}>
                        {userValue.map(st => <option value={st.key}>{st.value}</option>)}
                    </select>
                    <MDBBtn color='success' className={visible? 'visible mb-4': 'invisible mb-4' } size='lg' onClick={() => setToSubmit(true)}  >Submit</MDBBtn>

                    </MDBCardBody>
                </MDBCard>
                <a href="/">Login</a>
                </MDBCol>
            </MDBRow>
            

        </MDBContainer>
    )
}