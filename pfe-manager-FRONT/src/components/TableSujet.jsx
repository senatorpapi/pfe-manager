import React, { useEffect, useState } from 'react'
import { getSujet, getSujetById, modifySujet } from '../services/getSujet'
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBTable, MDBTableBody, MDBTableHead, MDBTextArea } from 'mdb-react-ui-kit'
import { deleteSujet } from '../services/deleteSujet'

export const TableSujet = () => {

    const [sujets, setSujets] = useState([])
    const [message, setMessage] = useState("")
    const [reload, setReload] = useState(false)

    const toReload = () => setReload(!reload);

    const getData = () => {
        getSujet()
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
        getData()
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