import { Box } from '@chakra-ui/react'
import React from 'react'

const Sidebar = () => {
    const options=[
    {
        name:"Dashboard",
        icon:"dashboard",
        link:"/"
    },
    {
        name:"Users",
        icon:"users",
        link:"/users"
    },
    {
        name:"Products",
        icon:"products",
        link:"/products"
    },
    {
        name:"Orders",
        icon:"orders",
        link:"/orders"
    },
    {
        name:"Settings",
        icon:"settings",
        link:"/settings"
    },
    ]
  return (
    <Box>
        {options.map((option,index)=>(
            <Box key={index} p={4} borderBottom={"1px solid #ccc"}>{option.name}</Box>
        ))}
    </Box>
  )
}

export default Sidebar