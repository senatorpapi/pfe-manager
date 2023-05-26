import React, { useEffect, useState } from 'react'
import { CreateGroupe } from './Groupe'
import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { TableSujet } from './TableSujet';
import { TableStudent } from './TableStudent';
import { useNavigate } from 'react-router-dom';
import { getAllProfs } from '../services/userDetails';
import { getAllGroupes } from '../services/createGroupe';
import { getSujetById } from '../services/getSujet';
import { getStudentById, getUserDetails } from '../services/getStudent';

export const Admin = () => {

    const tables = ["SUJET", "STUDENT", "PROF", "GROUPE"]
    const [basicModal, setBasicModal] = useState(false);
    const [selected, setSelected] = useState(tables[0])
    const navigate = useNavigate()

    const toggleShow = () => setBasicModal(!basicModal);

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
                    <i className="bg-info nav-link active" onClick={toggleShow}>Creer un nouveau groupe</i>
                
                    <i className="nav-item nav-link active" onClick={() => choose(0)}>Sujet</i>
        
                    <i className="nav-item nav-link active" onClick={() => choose(1)}>Etudiant</i>
            
                    <i className="nav-item nav-link active" onClick={() => choose(2)}>Encadrant</i>

                    <i className="nav-item nav-link active" onClick={() => choose(3)}>Groupe</i>
                </div>
                <div className="d-flex align-items-start mb-3">
                    <MDBIcon fas icon="sign-out-alt" onClick={logout} />
                </div>
                </MDBContainer>
            </MDBNavbar>
            <CreateGroupe  basicModal={basicModal} setBasicModal={setBasicModal} toggleShow={toggleShow} />
            <MDBContainer style={{ width: "auto" }} className="mt-5">
                <Table type={selected} />
            </MDBContainer>
            
        </>
    )
}

const Table = ({type}) => {
    switch(type) {
        case "SUJET":
            return <TableSujet />
        case "STUDENT":
            return <TableStudent />
        case "PROF":
            return <TableProf />
        case "GROUPE":
            return <TableGroupe />

    }
}

const TableGroupe = () => {

    const [groupes, setGroupes] = useState([])

    useEffect(() => {
        getAllGroupes()
        .then((result) => {
            if(result && result.status === 200) {
                console.log("GROUPES", result.data)
                setGroupes(result.data)
            }
        })
    }, [])
    return (
        <MDBTable>
            <MDBTableHead dark>
                <tr>
                    <th scope='col'>Groupe #</th>
                    <th scope='col'>Sujet</th>
                    <th scope='col'>Encadrant</th>
                    <th scope='col'>Etudiant</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {groupes && groupes.map((groupe) => <BodyGroupe groupe={groupe} setGroupes={setGroupes} groupes={groupes} /> )}
            </MDBTableBody>
        </MDBTable>
    )
}

const BodyGroupe = ({groupe, setGroupes, groupes}) => {

    return (
        <tr>
            <td> {groupe.idGroupe} </td>
            <td> {groupe.sujet} </td>
            <td> {groupe.prof} </td>
            <td> {groupe.etudiants.map((etudiant) => <span class="badge badge-primary"> {etudiant} </span> )} </td>

        </tr>
    )
}

const TableProf = () => {

    const [profs, setProfs] = useState(null)

    useEffect(() => {
        getAllProfs()
        .then((result) => {
            if(result && result.status === 200) {
                setProfs(result.data)
            }
        })
    }, [])

    return (
        <MDBTable>
            <MDBTableHead dark>
                <tr>
                    <th scope='col'>Nom</th>
                    <th scope='col'>Prenom</th>
                    <th scope='col'>Login</th>
                    <th scope='col'>Email</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {profs && profs.map( (prof) => <BodyProf prof={prof} setProfs={setProfs} profs={profs} />)}
            </MDBTableBody>
        </MDBTable>
    )
}

const BodyProf = ({prof, setProfs, profs}) => {
    return (
        <tr>
            <td>{prof.nom}</td>
            <td>{prof.prenom}</td>
            <td>{prof.login}</td>
            <td>{prof.email}</td>
        </tr>
    )
}
