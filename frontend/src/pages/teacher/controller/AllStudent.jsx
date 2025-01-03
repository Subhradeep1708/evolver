import axios from 'axios'
import React, { useEffect } from 'react'

const AllStudent = () => {
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/student')
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }
    }, [])
    
  return (
   <></>
  )
}

export default AllStudent
