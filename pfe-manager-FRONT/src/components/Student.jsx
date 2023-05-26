import React, { useEffect, useRef, useState } from 'react'
import { getGroupeOfStudent, getStudentById, getUserDetails } from '../services/getStudent'
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBBtn,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBTypography,
    MDBCardHeader,
    MDBTextArea,
    MDBBadge,
    MDBNavbar
  } from 'mdb-react-ui-kit';
import { getSujetById } from '../services/getSujet';
import { createRemarque, getRemarquesBySujet } from '../services/remarques';
import { useNavigate } from 'react-router-dom';


export const Student = () => {

    const [student, setStudent] = useState({})
    const [groupe, setGroupe] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const iduser = localStorage.getItem("userID")
        getStudentById(iduser)
        .then((result) => {
            if(result && result.status == 200) {
                setStudent(result.data)
                console.log("student" ,student)
                getGroupeOfStudent(result.data.id)
                .then((result) => {
                    if(result && result.status == 200) {
                        setGroupe(result.data)
                    }
                })
            }
        })
    }, [])

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userID")
        navigate('/')
    }

    if(!groupe){
        return <HasNotSujet logout={logout} />
    }else {
        return (
            <>
            <MDBNavbar light bgColor='light'>
                    <MDBContainer fluid>
                    <div className="d-flex justify-content-sm-between">
                        
                    </div>
                    <div className="d-flex align-items-start mb-3">
                        <MDBIcon fas icon="sign-out-alt" onClick={logout} />
                    </div>
                    </MDBContainer>
                </MDBNavbar>
                <MDBContainer style={{ width: "auto" }} className="mt-5">
                </MDBContainer>
                <section >
                    <MDBContainer className="py-5">
                        <MDBRow>
                        
                        </MDBRow>

                        <MDBRow>
                        <MDBCol lg="4">

                            {student.id && <SujetDetails studentId={student.id} />}

                            <hr />
                        </MDBCol>
                        <MDBCol lg="8">
                            <MDBCard className="mb-4">
                            <MDBCardBody>
                                    <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Nom</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{student.nom}</MDBCardText>
                                    </MDBCol>
                                    </MDBRow>
                                <hr />
                                    <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Prenom</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{student.prenom}</MDBCardText>
                                    </MDBCol>
                                    </MDBRow>
                                <hr />
                                    <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{student.email}</MDBCardText>
                                    </MDBCol>
                                    </MDBRow>
                                <hr />
                                    <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Login</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{student.login}</MDBCardText>
                                    </MDBCol>
                                    </MDBRow>
                                <hr />
                            </MDBCardBody>
                            </MDBCard>
                            <MDBRow>
                                <MDBCol md="10">
                                    <MDBCard>
                                    <MDBCardBody>
                                    <MDBContainer fluid >
                                    <MDBRow>
                                        <MDBCol >
                                        <MDBTypography listUnStyled>
                                            {groupe && <Remarques idSujet={groupe.sujet} />}
                                        </MDBTypography>
                                            {student.id && groupe && <CreateRemarque idUser={student.id} idSujet={groupe.sujet} />}
                                        </MDBCol>
                                    </MDBRow>
                                    </MDBContainer>
                                    </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            </>
        )
    }
}

const CreateRemarque = ({idUser, idSujet}) => {

    const [message, setMessage] = useState("")
    const [document, setDocument] = useState(null)
    const [click, setClick] = useState(false)

    const inputFile = useRef(null)

    const onButtonClick = () => {
        inputFile.current.click();
    };

    useEffect(() => {
        console.log("to create remarque", idSujet, idUser)
        if(click) {
            createRemarque(idUser, idSujet, message, document)
            .then((result) => {
                if(result && result.status === 200) {
                    
                }
            })
        }
        setClick(false)

    }, [click])

    return (
        <>
            <li className="bg-white mb-3">
                <MDBTextArea label="Message" id="textAreaExample" rows={4} value={message} onChange={(event) => setMessage(event.target.value)} />
            </li>
            <MDBBtn color="info" rounded className="float-end" onClick={() => setClick(true)}>
                Send
            </MDBBtn>
            <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={(event) => setDocument(event.target.files[0])} />
            <MDBIcon type="file" rounded className="float" icon="paperclip" onClick={onButtonClick} /> <p> {document && document.name} </p>
        </>
        
    )
}

const Remarques = ({ idSujet }) => {
    
    const [remarques, setRemarques] = useState([])

    useEffect(() => {
        const interval = setInterval(() => {
            if(idSujet) {

                getRemarquesBySujet(idSujet)
                .then((result) => {
                    if(result && result.status === 200) {
                        setRemarques(result.data)
                        console.log("remarques", result.data)
                    }
                })
            }
        }, 1000)
        return () => clearInterval(interval);
    }, [])

    return (
        <>
            {remarques && remarques.map((r) => <Remarque remarque={r} /> )}
        </>
    )

}

const Remarque = ({ remarque }) => {

    const [sender, setSender] = useState("")
    const [iamSender, setIamSender] = useState(false)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        if(remarque && remarque.idUser) {
            getUserDetails(remarque.idUser)
            .then((result) => {
                if(result && result.status === 200) {
                    setSender(result.data.nom + " " + result.data.prenom)
                    const id = localStorage.getItem("userID")
                    setIamSender(id === remarque.idUser)
                    console.log("doc", remarque.document)
                }
            })
        }

    }, [])

    const handleClick = (doc) => {
        const byteCharacters = atob(doc.document);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([ byteArray ], { type: "application/msword"});
        const url = URL.createObjectURL(blob);
        return url
      };

    return (
        <li className="justify-content-between mb-4">
            <MDBCard>
                <MDBCardHeader className="d-flex justify-content-between p-3">
                <p className="fw-bold mb-0">{sender}</p>
                <p className="text-muted small mb-0">
                    <MDBIcon far icon="clock" /> { Date.parse(remarque.dateCreation)}
                </p>
                </MDBCardHeader>
                <MDBCardBody>
                <p className="mb-0">
                    {remarque.message}
                </p>
                {remarque.document && <div> <a href={handleClick(remarque)}> {remarque.documentName} </a></div>}
                </MDBCardBody>
            </MDBCard>
        </li>
    )
}

const GroupeDetails = ({etudiants}) => {

    const [studentsOfGroupe, setStudentsOfGroupe] = useState([])

    useEffect(() => {
        if(etudiants){
            const listOfStudent = []
            etudiants.forEach((etudiant) => 
                getUserDetails(etudiant)
                .then((result) => {
                    if(result && result.status === 200) {
                        listOfStudent.push(result.data)
                        console.log("GroupeDetails", result.data)
                    }
                })
            )
            setStudentsOfGroupe(listOfStudent)
        }
    }, [])

    return (
        <MDBCardBody className="p-0">
            <MDBListGroup flush className="rounded-3">
                { studentsOfGroupe && studentsOfGroupe.map((student) => <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">{student.nom+ " "+ student.prenom}</MDBListGroupItem> )}
            </MDBListGroup>
        </MDBCardBody>
    )
}

const SujetDetails = ({studentId}) => {

    const [groupe, setGroupe] = useState({})
    const [sujet, setSujet] = useState({})
    const [enseignant, setEseignant] = useState({})

    useEffect(() => {
        getGroupeOfStudent(studentId)
        .then((result) => {
            if(result && result.status === 200) {
                console.log("groupe", studentId, result.data)
                setGroupe(result.data)

                getUserDetails(result.data.idEnseignant)
                .then((result) =>  {
                    if(result && result.status === 200) {
                        console.log("Enseignant", result.data)
                        setEseignant(result.data)
                    }
                })

                getSujetById(result.data.sujet)
                .then((result) => {
                    if(result && result.status === 200){
                        console.log("sujet", result.data)
                        setSujet(result.data)
                    }
                })
            }
        })
    }, [])

    
    return (
        <>
            <MDBCard className="">
                <MDBBadge light color='success' >Votre sujet</MDBBadge>
            </MDBCard>
            <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                    <p className="text-muted mb-4">Prof: {enseignant.nom + " " + enseignant.prenom}</p>
                    <p className="text-muted mb-4">{sujet.titre}</p>
                    <div className="d-flex justify-content-center mb-2">
                        {sujet.description}
                    </div>
                </MDBCardBody>
            </MDBCard>
            <hr/>
            <MDBCard className="">
                <MDBBadge light color='success'>Votre equipe</MDBBadge>
            </MDBCard>
            <MDBCard className="mb-4 mb-lg-0">
                {groupe && groupe.etudiants && <GroupeDetails etudiants={groupe.etudiants} />}
            </MDBCard>
            
        </>
        
    )
}




const HasNotSujet = ({logout}) => {

    return (
        <>
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Attention!</strong> Vous n'avez pas encore de groupe ou de sujet sur lequel travailler, 
                Veuillez contacter votre département pour plus d'informations
                <MDBIcon style={{float: "right"}} icon="sign-out-alt" onClick={logout} />
            </div>
            <div className="d-flex align-items-start mb-3">
                        
            </div>
        </>
        
    )
}