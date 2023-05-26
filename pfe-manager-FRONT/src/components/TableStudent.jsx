import React, { useEffect, useState } from 'react'
import { deleteStudent, getStudent } from '../services/getStudent'
import { MDBCol, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit'

export const TableStudent = () => {

    const [students, setStudents] = useState([])

    useEffect(() => {
        getStudent()
        .then((result) => {
            if(result && result.status === 200) {
                setStudents(result.data)
                console.log("students", result.data)
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
                    <th scope='col'>Action</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {students && students.map( (student) => <Body student={student} setStudents={setStudents} students={students} />)}
            </MDBTableBody>
        </MDBTable>
    )
}

const Body = ({student, setStudents, students}) => {

    return (
        <tr>
            <td>{student.nom}</td>
            <td>{student.prenom}</td>
            <td>{student.login}</td>
            <td><Action idStudent={student.id} setStudents={setStudents} students={students} /></td>
        </tr>
    )
}

const Action = ({idStudent, setStudents, students}) => {
    return (
        <div className="d-flex align-items-start bg-light">
            <MDBCol>
                <DeleteStudent idStudent={idStudent} setStudents={setStudents} students={students} />
            </MDBCol>
        </div>
    )
}

const DeleteStudent = ({idStudent, setStudents, students}) => {

    const [click, setClick] = useState(false)

    useEffect(() => {
        if(click){
            removeStudent(idStudent)
            setClick(false)
        }
        
    }, [click])

    const removeStudent = (id) => {
        deleteStudent(id)
        .then((result) => {
            if(result) {
                const rest = students.filter((student) => student.id != id)
                setStudents(rest)
            }
        })
    }


    return (
        <i className="fas fa-trash" onClick={() => setClick(true)}></i>
    )
}