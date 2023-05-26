import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBContainer,
    MDBIcon,
  } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { getDispoStudent, getStudent } from '../services/getStudent';
import { getDispoSujet, getSujet } from '../services/getSujet';
import { createGroupe } from '../services/createGroupe';

export const CreateGroupe = ({basicModal, setBasicModal, toggleShow}) => {

    const [students, setStudents] = useState([])
    const [sujets, setSujets] = useState([])
    const [message, setMessage] = useState("")
    const [ready, setReady] = useState(false)
    const [selectedSujet, setSelectedSujet] = useState(null)
    const [selectedStudent, setSelectedStudent] = useState([])
    

    useEffect(() => {
        getDispoStudent()
        .then(result => {
            if(result && result.status !== 200) {
                setMessage("Il y'a un soucis cote serveur !")
            }else{
                setStudents(result.data)
                console.log("students", result.data)
            }
        })

        getDispoSujet()
        .then(result => {
            if(result && result.status !== 200) {
                setMessage("Il y'a un soucis cote serveur !")
            }else{
                setSujets(result.data)
                console.log("sujets", result.data)
            }
        })
    }, [])
    
    const selectFromRestOfStudent = (id) => {
        console.log(id)
        const student = students.find((s) => s.id == id)
        console.log("student",student)
        const rest = students.filter(student => student.id != id)
        setStudents(rest)
        const newList = selectedStudent
        newList.push(student)
        setSelectedStudent(newList)
        console.log("selected", selectedStudent)
    }

    const deleteStudent = (id) => {
        const newList = selectedStudent
        const data = newList.filter((s) => s.id !== id)
        setSelectedStudent(data)
    }


    const submit = () => {
        if(selectedStudent.length > 0 && selectedStudent.length <= 3 && selectedSujet) {
            const idStudents = selectedStudent.map((s) => s.id)
            createGroupe(selectedSujet, idStudents)
            .then((result) => {
                if(result && result.status === 200) {
                    alert("Le groupe est créé !")
                    toggleShow()
                }

            })
        }
    }


    return (
        <>
            
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
            <MDBModalDialog size='lg'>
                <MDBModalContent>
                <MDBModalHeader>
                    <MDBModalTitle>Creer un groupe</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                    <MDBContainer style={{ width: "auto" }} className="mt-5">
                        <div className="form-group">
                            <label for="exampleFormControlSelect">Choisir un sujet</label>
                            <select className="custom-select" value={selectedSujet} onChange={(event) => setSelectedSujet(event.target.value)}>
                                <option selected="selected" >Selectionner un projet</option>
                                {sujets.map(sujet => <option value={sujet.id}>{sujet.titre}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="exampleFormControlSelect">Choisir un maximum de trois étudiants</label>
                            <select className="custom-select" onChange={(event) => selectFromRestOfStudent(event.target.value)}>
                                <option selected="selected" >selectionner un étudiants</option>
                                {students.map(student => <option value={student.id}>{student.nom + " " + student.prenom}</option>)}
                            </select>
                        </div>
                        <ul class="list-group">
                            {selectedStudent && selectedStudent.map(student => <li class="list-group-item">{student.nom+ " " + student.prenom}</li>)}
                        </ul>
                    </MDBContainer>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={toggleShow}>
                    Fermer
                    </MDBBtn>
                    <MDBBtn onClick={() => submit()}>Ajouter</MDBBtn>
                </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
            </MDBModal>
        </>
    )
}
