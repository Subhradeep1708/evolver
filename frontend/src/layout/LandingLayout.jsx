import React from 'react'
import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router'
import HomeNav from '../components/HomeNav'
const LandingLayout = () => {
  return (
    <Box>
        <Box display={"flex"} justifyContent={"center"}>
            <HomeNav/>
        </Box>
       <Outlet/>
    </Box>
  )
}

export default LandingLayout