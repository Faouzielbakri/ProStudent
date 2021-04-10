import React, { useEffect } from 'react'
import { useState } from 'react';
import { db, storage } from '../backend/firebase';
import './Courses.css';
import GetAppIcon from '@material-ui/icons/GetApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Tooltip from '@material-ui/core/Tooltip';
import { Button ,Grid} from '@material-ui/core';


function Courses() {
    // const documents = 
    //             [{
    //                 id:"XnqxNYVCXLU3IhDy1ZCd",
    //                 data:
    //                     {
    //                         coursName:'word',
    //                         className: "TCSF155",
    //                         dateOfUpload: "Apr 9, 2021, 3:08:55 PM",
    //                         note: "word est un texteure",
    //                         path: "files/123454772651871/undefined/Fiche pedagogique جدادة.docx",
    //                         visible: false
    //                     }
    //                 },{
    //                 id:"cBBE25FbpQ3r1nwnR0Mi",
    //                 data:
    //                     {
    //                         coursName:'excel',
    //                         className: "TCSF155",
    //                         dateOfUpload: "Apr 9, 2021, 5:30:05 AM",
    //                         note: "excel est un tableur",
    //                         path: "files/123454772651871/undefined/Book1.xlsx",
    //                         visible: true
    //                     }
    //                 }];
    // eslint-disable-next-line
    const [user, setuser] = useState({
        displayname: "Faouzi",
        uid: 123454772651871,
        photourl:
            "https://lh3.googleusercontent.com/ogw/ADGmqu-0BnHB516am5JeNaMXxKiELOd7fDzo0qvKUj0sJA=s32-c-mo",
        });
    const [items, setItems] = useState([]);
    const code = "JKSutApp";
    // db.collection("Prof")
    //         .doc(res.profuid.toString())
    //         .collection("Classes")
    //         .doc(res.classuid.toString())
    //         .collection('Courses')
    useEffect(() => {
        db.collection("Prof")
            .doc(user.uid.toString())
            .collection("Classes").onSnapshot((snapshot) => {
                var tempitems = [];
                    snapshot.docs.map((docu) => {
                        db.collection("Prof")
                        .doc(user.uid.toString())
                        .collection("Classes")
                        .doc(docu.id)
                        .collection('Courses')
                        .onSnapshot(async (snap) => {
                            tempitems = await [...tempitems.concat(snap.docs.map((doc) =>{
                                return({id : doc.id,data :doc.data()})
                            }))]
                            setItems([...items,...tempitems])
                        })
                        return docu.id;
                    })
            }
            );
             console.log(items)
    // eslint-disable-next-line
    }, [])
            // eslint-disable-next-line
    async function retrieveFile() {
        
        const res = (await db.collection("uuid").doc(code).get()).data();
        const classesRef = await db
            .collection("Prof")
            .doc(res.profuid.toString())
            .collection("Classes")
            classesRef.get().then(snapshot => {snapshot.docs.map(docu =>
            {
                classesRef.doc(docu.id).collection('Courses')
                .get().then(snapshot => {
                    setItems(items.concat(snapshot.docs.map((doc) =>{
                        return({id : doc.id,data :doc.data()})
                    })))
                })
                return docu.id
            })})
            // .doc(res.classuid.toString())
            
        ;
        console.log(items);
    }
    const Downloadfile=(path)=>{
        storage.ref(path)
        .getDownloadURL()
        .then((url) => {
            window.location.href = url;
            // console.log(url)
          }).catch((error) => {
            switch (error.code) {
              case 'storage/object-not-found':
                // File doesn't exist
                alert('File not found')
                break;
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                alert("User doesn't have permission to access the object")
                break;
              case 'storage/canceled':
                // User canceled the upload
                alert("user canceled the upload")
                break;
              case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                alert("Unknown error occurred")
                break;
              default:
                break;

            }
          });
    }

    return (
        
        <Grid  className="Courses">
            <h3>Cours</h3>
            {
            items.map(doc =>
                (<div  
                className="Courses__docs" 
                key={`${doc.id}`} 
                > 
                    <span className="Courses__docsTitle">{doc.data.coursName}</span>
                    <div className="Courses_separator"/>

                    <span className="Courses__docsFilename">{doc.data.note}</span>
                    <div className="Courses_separator"/>
                    <span className="Courses__docsClassname">{doc.data.className}</span>
                    <div className="Courses_separator"/>
                    <Tooltip 
                    title={`Download File`} 
                    placement="top-start"
                    >
                    <Button style={{maxWidth: '24px', maxHeight: '24px', minWidth: '24px', minHeight: '24px'}}
                    //  type="submit" 
                     onClick={()=>{
                         Downloadfile(doc.data.path);
                         console.log('start')
                        }}
                     >
                         <GetAppIcon id="downloadIcon"  />
                     </Button>
                    </Tooltip>
                    <div className="Courses_separator"/>
                    <span className="Courses__docsDateOfupload">{doc.data.dateOfUpload}</span>
                    <div className="Courses_separator"/>
                    <Tooltip 
                    title={doc.data.visible ? 'Visible' : 'hidden'} 
                    placement="top-start"
                    >
                    {
                        doc.data.visible ? <VisibilityIcon id="VisibiltyIcon" /> : <VisibilityOffIcon id="VisibiltyIcon"/>
                    }
                    </Tooltip>

                </div>))
            }
        </Grid>
    )
}

export default Courses
