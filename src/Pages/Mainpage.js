import { Grid } from '@material-ui/core'
import React from 'react'
import Addcours from '../Components/Addcours'
import Courses from '../Components/Courses'
import Navbar from '../Components/Navbar'
import './Mainpage.css'
function Mainpage() {
    
    return (
        <div className="Mainpage">
            <Navbar/>
            <Grid Container className="Mainpage__body">
            <Addcours />
            <Courses />
            </Grid>
        </div>
    )
}

export default Mainpage
