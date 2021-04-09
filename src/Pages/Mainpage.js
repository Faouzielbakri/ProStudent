import React from 'react'
import Addcours from '../Components/Addcours'
import Courses from '../Components/Courses'
import Navbar from '../Components/Navbar'

function Mainpage() {
    return (
        <div className="Mainpage">
            <Navbar/>
            <Addcours />
            <Courses />
        </div>
    )
}

export default Mainpage
