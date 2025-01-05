import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from '@chakra-ui/react'
const AllStudent = () => {
    const [students, setStudents] = useState([])
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/user/student')
                setStudents(res.data.data)
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchStudent()
    }, [])
    
  return (
       <div>
               <Table.Root size="sm">
                   <Table.Header>
                       <Table.Row h={10}>
                           <Table.ColumnHeader>Roll No</Table.ColumnHeader>
                           <Table.ColumnHeader>Student Name</Table.ColumnHeader>
                           <Table.ColumnHeader>Email</Table.ColumnHeader>
                           {/* <Table.ColumnHeader>Branch Name</Table.ColumnHeader> */}
                           {/* <Table.ColumnHeader>Admission Year</Table.ColumnHeader> */}
                          
                       </Table.Row>
                   </Table.Header>
                   <Table.Body>
                       {students?.map((item, index) => (
                           <Table.Row
                               key={index}
                               h={10}
                               background={index % 2 === 0 ? "bg.muted" : "white"}
                           >
                               <Table.Cell>{item.rollNo}</Table.Cell>
                               <Table.Cell>{item.user.firstName} {item.user.lastName}</Table.Cell>
                               <Table.Cell>{item.user.email}</Table.Cell>
                               {/* <Table.Cell>{item.attemptedOn}</Table.Cell> */}
                               <Table.Cell fontWeight={"bold"}>
                                   {item.totalMarks}
                               </Table.Cell>
                              
                           </Table.Row>
                       ))}
                   </Table.Body>
               </Table.Root>
           </div>
  )
}

export default AllStudent
