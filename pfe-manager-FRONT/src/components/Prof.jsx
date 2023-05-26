import React, { useEffect, useState, useRef } from "react"
import { getUserDetails } from "../services/getStudent"
import { createSujet, getMySujet, getSujetById, modifySujet } from '../services/getSujet'
import { 
    MDBBtn, 
    MDBCol, 
    MDBContainer, 
    MDBIcon, 
    MDBInput, 
    MDBModal, 
    MDBModalBody, 
    MDBModalContent, 
    MDBModalDialog, 
    MDBModalFooter, 
    MDBModalHeader, 
    MDBModalTitle, 
    MDBNavbar, 
    MDBRow, 
    MDBTable, 
    MDBTableBody, 
    MDBTableHead, 
    MDBTextArea,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBListGroup,
    MDBListGroupItem,
    MDBTypography,
    MDBCardHeader,
    MDBBadge
 } from 'mdb-react-ui-kit'
import { deleteSujet } from '../services/deleteSujet'
import { useNavigate } from "react-router-dom"
import { getGroupeBySujetId } from "../services/createGroupe"
import { createRemarque, getRemarquesBySujet } from '../services/remarques';


export const Prof = () => {
    const tables = ["SUJETS", "HOME"]

    const [userDetails, setUserDetails] = useState(null)
    const [selected, setSelected] = useState(tables[0])
    const [basicModal, setBasicModal] = useState(false)

    const navigate = useNavigate()
    const toggleShow = () => setBasicModal(!basicModal);
    
    useEffect(() => {
        const userID = localStorage.getItem("userID")
        getUserDetails(userID)
        .then((result) => {
            if(result && result.status == 200) {
                setUserDetails(result.data)
            }
        })
    }, [])

    const choose = (index) => setSelected(tables[index]);
    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userID")
        navigate('/')
    }

    return (
        <>
            <MDBNavbar light bgColor='light'>
                <MDBContainer fluid>
                <div className="d-flex justify-content-sm-between">
                
                    <i className="nav-item nav-link active" onClick={() => choose(0)}>Sujet</i>
        
                    <i className="nav-item nav-link active" onClick={() => choose(1)}>Home</i>

                    <i className="nav-item nav-link active" onClick={toggleShow}>Creer un sujet</i>
                </div>
                <div className="d-flex align-items-start mb-3">
                    <MDBIcon fas icon="sign-out-alt" onClick={logout} />
                </div>
                </MDBContainer>
            </MDBNavbar>
            <CreateSujet  basicModal={basicModal} setBasicModal={setBasicModal} toggleShow={toggleShow} />
            <MDBContainer style={{ width: "auto" }} className="mt-5">
                {userDetails && <Table type={selected} idUser={userDetails.id} />}
            </MDBContainer>
        </>
        
    )
}

const CreateSujet = ({basicModal, setBasicModal, toggleShow}) => {

    const [titre, setTitre] = useState("")
    const [description, setDescription] = useState("")
    const [save, setSave] = useState(false)

    useEffect(() => {
        if(save && titre.length > 0 && description.length > 0) {
            createSujet(titre, description)
            .then((result) => {
                if(result && result.status === 200) {
                    setSave(false)
                    toggleShow()
                    window.location.reload()
                }
            } )
        }
    }, [save])

    return (
        <>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
            <MDBModalDialog size='lg'>
                <MDBModalContent>
                <MDBModalHeader>
                    <MDBModalTitle>Creer un sujet</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                    <MDBContainer style={{ width: "auto" }} className="mt-5">
                        <MDBInput label='titre'  type='text' value={titre} onChange={(event) => setTitre(event.target.value)}/>
                        <hr/>
                        <MDBTextArea label='Description' value={description} onChange={(event) => setDescription(event.target.value)} />
                    </MDBContainer>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={toggleShow}>
                    Close
                    </MDBBtn>
                    <MDBBtn onClick={() => setSave(true)} >Sauvgarder</MDBBtn>
                </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
            </MDBModal>
        </>
    )
}

const Table = ({type, idUser}) => {
    switch(type) {
        case "SUJETS":
            return <TableSujet idUser={idUser} />
        case "HOME":
            return <SujetPage idUser={idUser} />
    }
}


const SujetPage = ({idUser}) => {
    
    const [selectedSujet, setSelectedSujet] = useState(null)
    const [mySujet, setMySujet] = useState([])
    const [userDetails, setUserDetails] = useState(null)
    const [groupe, setGroupe] = useState(null)

    useEffect(() => {
        if(idUser) {

            getMySujet(idUser)
            .then((result) => {
                if(result && result.status === 200) {
                    setMySujet(result.data)
                }
            })

            getUserDetails(idUser)
            .then((result) => {
                if(result && result.status === 200) {
                    setUserDetails(result.data)
                }
            })
        }
    }, [])

    useEffect(() => {
        console.log( "selectedSujet", selectedSujet)
        if(selectedSujet) {
            getGroupeBySujetId(selectedSujet)
            .then((result) => {
                if(result && result.status === 200) {
                    setGroupe(result.data)
                }
            })
        }
    }, [selectedSujet])

    
    return (
        <>
            <select className="form-select" aria-label="Default select example"  value={selectedSujet} onChange={(event) => setSelectedSujet(event.target.value)} >
                <option selected >Selectionner sujet</option>
                { mySujet && mySujet.map(sujet => <option value={sujet.id} > {sujet.titre} </option> )}
            </select>
            {userDetails === null || selectedSujet === null ? <div>Loading...</div>: 
            <section >
                <MDBContainer className="py-5">
                    <MDBRow>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                        <MDBCardBody>
                                <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Nom</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{userDetails.nom}</MDBCardText>
                                </MDBCol>
                                </MDBRow>
                            <hr />
                                <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Prenom</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{userDetails.prenom}</MDBCardText>
                                </MDBCol>
                                </MDBRow>
                            <hr />
                                <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Email</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{userDetails.email}</MDBCardText>
                                </MDBCol>
                                </MDBRow>
                            <hr />
                                <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Login</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{userDetails.login}</MDBCardText>
                                </MDBCol>
                                </MDBRow>
                            <hr />
                        </MDBCardBody>
                        </MDBCard>
                        <MDBCol md="10">
                            <MDBCard>
                            <MDBCardBody>
                            <MDBContainer fluid >
                            <MDBRow>
                                <MDBCol >
                                <MDBTypography listUnStyled>
                                    {<Remarques idSujet={selectedSujet} />}
                                </MDBTypography>
                                    {<CreateRemarque idUser={userDetails.id} idSujet={selectedSujet} />}
                                </MDBCol>
                            </MDBRow>
                            </MDBContainer>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        
                    </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
            }
        </>
    )
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
        setMessage("")
        setDocument(null)
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

const TableSujet = ({idUser}) => {

    const [sujets, setSujets] = useState([])
    const [message, setMessage] = useState("")
    const [reload, setReload] = useState(false)

    const toReload = () => setReload(!reload);

    const getData = () => {
        getMySujet(idUser)
        .then(result => {
            if(result && result.status !== 200) {
                setMessage("Il y'a un soucis cote serveur !")

            }else{
                setSujets(result.data)
                console.log("sujets", result.data)
            }
        })
    }

    useEffect(() => {
        getMySujet(idUser)
        .then(result => {
            if(result && result.status !== 200) {
                setMessage("Il y'a un soucis cote serveur !")

            }else{
                setSujets(result.data)
                console.log("sujets", result.data)
            }
        })
    }, [])

    useEffect(() => {
        getData()
    }, [reload])

    return (
        <MDBTable>
            <MDBTableHead dark>
                <tr>
                    <th scope='col'>Titre</th>
                    <th scope='col'>Description</th>
                    <th scope='col'>Enseignant</th>
                    <th scope='col'>Date creation</th>
                    <th scope='col'>Statut</th>
                    <th scope='col'>Action</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                { sujets.map((sujet => <Body key={sujet.id} sujet={sujet} setMessage={setMessage} sujets={sujets} setSujets={setSujets} toReload={toReload} /> ))}
            </MDBTableBody>
        </MDBTable>
    )
}


const Body = ({sujet, setMessage, sujets, setSujets, toReload}) => {

    const [lstSujets, setLstSujets] = useState([])

    const cssOfStatus = (status) => {
        switch (status) {
            case "ENCOURS":
                return "badge bg-warning"
            case "VALIDE":
                return "badge bg-primary"
            case "REJET":
                return "badge bg-danger"
        }
    }
    return (
        <tr>
            <td>{sujet.titre}</td>
            <td>{sujet.description}</td>
            <td>{sujet.createdBy}</td>
            <td>{sujet.dateCreation}</td>
            <td className={cssOfStatus(sujet.status)}>{sujet.status}</td>
            <td>{<Action idSujet={sujet.id} setMessage={setMessage} sujets={sujets} setSujets={setSujets} toReload={toReload} />}</td>
        </tr>
    )
}

const Action = ({idSujet, setMessage, sujets, setSujets, toReload}) => {

    return (
        <div className="d-flex align-items-start bg-light mb-3">
            <MDBCol>
                <Delete idSujet={idSujet} setMessage={setMessage} sujets={sujets} setSujets={setSujets}/>
            </MDBCol>
            <MDBCol>
                <Modify idSujet={idSujet} toReload={toReload} />
            </MDBCol>
        </div>
    )
}

const Delete = ({idSujet, setMessage, sujets, setSujets}) => {

    const [click, setClick] = useState(false)

    useEffect(() => {
        if(click) {
            removeSujet(idSujet)
            setClick(false)
        }
    }, [click])

    const removeSujet = (idSujet) => {
        deleteSujet(idSujet)
        .then((result) => {
            console.log("to remove sujet")
            const lastSujets = sujets.filter((sujet) => sujet.id != idSujet)
            console.log(lastSujets)
            setSujets(lastSujets)
        })
    }

    return (
        <i className="fas fa-trash" onClick={() => setClick(true)}></i>
    )
}

const Modify = ({idSujet, toReload}) => {

    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);

    return(
        <>
            <i onClick={toggleShow} class="far fa-pen-to-square"></i>
            <ModalModification idSujet={idSujet} basicModal={basicModal} setBasicModal={setBasicModal} toggleShow={toggleShow} toReload={toReload} />
        </>
    )
}

const ModalModification = ({idSujet, basicModal, setBasicModal, toggleShow, toReload}) => {
    const [sujet, setSujet] = useState({})
    const [selectedStatus, setSelectedStatus] = useState("")
    const [titre, setTitre] = useState("")
    const [description, setDescription] = useState("")
    
    const STATUS = ["ENCOURS", "VALIDE", "REJET"]
    
    useEffect(() => {
        if(sujet) {
            setTitre(sujet.titre)
            setDescription(sujet.description)
            setSelectedStatus(sujet.status)
        }
    }, [sujet])
    
    useEffect(() => {
        getSujetById(idSujet)
        .then((result) => {
            if(result && result.status === 200) {
                setSujet(result.data)
                console.log(result.data)
            }
        })
    }, [])

    const submit = () => {
        modifySujet(idSujet, titre, description, selectedStatus)
        .then((result) => {
            if(result && result.status === 200) {
                toReload()
                toggleShow()
            }else {
                alert("Verifier le backend")
            }
        })
    }

    return (
        <>
            
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog size='lg'>
            <MDBModalContent>
            <MDBModalHeader>
                <MDBModalTitle>Modifier le sujet</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <MDBContainer style={{ width: "auto" }} className="mt-5">
                    <MDBInput wrapperClass='mb-3' label='Titre' id='form1' type='text' value={titre} onChange={(event) => setTitre(event.target.value)}/>
                    <MDBTextArea rapperClass='mb-3' label='Description' id='form1' type='text' value={description} onChange={(event) => setDescription(event.target.value)} />
                    <label for="exampleFormControlSelect">Modifier le statut</label>
                    <select className="custom-select" value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)}>
                        {STATUS.map(st => <option value={st}>{st}</option>)}
                    </select>
                </MDBContainer>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color='secondary' onClick={toggleShow}>
                    Fermer
                </MDBBtn>
                <MDBBtn color='primary' onClick={submit} >Sauvgarder</MDBBtn>
            </MDBModalFooter>
            </MDBModalContent>
        </MDBModalDialog>
        </MDBModal>
    </>
    )
}