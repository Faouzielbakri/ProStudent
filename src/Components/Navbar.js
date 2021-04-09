import React from 'react'
import './Navbar.css'
import { useState } from 'react';

function Navbar() {
    //eslint-disable-next-line
    const [user, setuser] = useState({
        displayname: "Faouzi Elbakri",
        uid: 123454772651871,
        speaciality: "info",
        photourl:
          "https://lh3.googleusercontent.com/ogw/ADGmqu-0BnHB516am5JeNaMXxKiELOd7fDzo0qvKUj0sJA=s32-c-mo",
      });
    return (
       <div className="Navbar">
           <span className="Navbar__username">{user.displayname}</span>
           <div className="Navbar_separator"/>
           <span className="Navbar__speaciality">{user.speaciality}</span>
           <img src={user.photourl} alt={`${user.displayname} pic`} className="Navbar__profilepicture"/>
       </div>
    )
}

export default Navbar
