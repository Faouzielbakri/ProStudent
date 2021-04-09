import React from 'react'
import { useState } from 'react';
import { db } from '../backend/firebase';

const documents = [{id:"XnqxNYVCXLU3IhDy1ZCd",
                    data:{
                    className: "TCSF155",
                    dateOfUpload: "Apr 9, 2021, 3:08:55 PM",
                    note: "word est un texteure",
                    path: "files/123454772651871/undefined/Fiche pedagogique جدادة.docx",
                    visible: true}},
                    {id:"cBBE25FbpQ3r1nwnR0Mi",
                    data:{className: "TCSF155",
                    dateOfUpload: "Apr 9, 2021, 5:30:05 AM",
                    note: "excel est un tableur",
                    path: "files/123454772651871/undefined/Book1.xlsx",
                    visible: true}}]
function Courses() {
    const [items, setItems] = useState([])
    async function retrieveFile() {
        const code = "JKSutApp";
        const res = (await db.collection("uuid").doc(code).get()).data();
       await db
            .collection("Prof")
            .doc(res.profuid.toString())
            .collection("Classes")
            .doc(res.classuid.toString())
            .collection('Courses')
            .get().then(snapshot => {
                setItems(snapshot.docs.map((doc) =>{
                    return({id : doc.id,data :doc.data()})
                }))
            })
        ;
        // console.log(items);
      }
    return (
        <div className="Courses">
            
        </div>
    )
}

export default Courses
