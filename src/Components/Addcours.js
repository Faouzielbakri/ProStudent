import React from 'react'
import { Button } from '@material-ui/core';
import './Addcours.css'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { useState } from 'react';
import { format } from 'date-fns/esm';
import { db, storage } from '../backend/firebase';
import  {nanoid} from "nanoid";
function Addcours() {
    const [formdata, setFormdata] = useState({})
    const [document, setDocument] = useState(null);
        //eslint-disable-next-line
    const [user, setuser] = useState({
        displayname: "Faouzi",
        uid: 123454772651871,
        photourl:
          "https://lh3.googleusercontent.com/ogw/ADGmqu-0BnHB516am5JeNaMXxKiELOd7fDzo0qvKUj0sJA=s32-c-mo",
      });
    const UploadFile = (fileToUpload) => {
        if (fileToUpload !== null && fileToUpload) {
          var pathRef = storage.ref(
            `files/${user.uid}/${formdata.classname}/${fileToUpload.name}`
          );
          var task = pathRef.put(fileToUpload);
          task.on(
            "state_changed",
            function progress(snapshot) {},
            function error(err) {
              console.log(err);
            },
            function complete() {
              createRecord(task);
            }
          );
        }
      };
      
      async function createRecord(task) {
        var metadatafordb = {
          path: task.snapshot.metadata.fullPath,
          dateOfUpload: format(new Date(),'PPpp'),
          className: formdata?.classname,
          note:formdata?.note,
          visible: true,
        };
        var classid = 0;
        const randomUid = nanoid(8);
        const res = await db
          .collection("Prof")
          .doc(user.uid.toString())
          .collection("Classes");
          res.where("className", "==", metadatafordb.className).get().then((doc)=>{
            if(doc.empty){
              res.add({ className: metadatafordb.className }).then( (data) => {
                 ;
                data.collection("Courses").add({ ...metadatafordb });
                try {
                  db.collection("uuid")
                    .doc(randomUid.toString())
                    .set({ classuid: data.id, profuid: user.uid });
                  console.log("Document successfully written! : ",data.id);
                } catch (error) {
                  console.error("Error writing document: ", error);
                }
              });
              console.log("New Class");
              
            }else{
              classid = doc.docs[0]._delegate._document.key.path.segments[doc.docs[0]._delegate._document.key.path.segments.length - 1];
              res
              .doc(classid)
              .collection("Courses")
              .add({ ...metadatafordb });
            // console.log("Class exists");
            try {
              db.collection("uuid")
                .doc(randomUid.toString())
                .set({ classuid: classid, profuid: user.uid });
              console.log("Document successfully written! : ",classid);
            } catch (error) {
              console.error("Error writing document: ", error);
            }
            }
            
          }).catch((err)=>{
            console.log("error",err);
          })
     
      }
    return (
        <div className="Addcours">
            
            <form className="Addcours__form" onSubmit={e => {e.preventDefault(); UploadFile(document)}}>
                <div className="Addcours__formelement">
                    <label htmlFor="classname">Class name</label>
                    <input  name="classname" type="text" 
                    value={formdata?.classname || ''}
                    required
                    onChange={e => setFormdata({...formdata,classname: e.target.value})}
                    />
                </div>
                <div className="Addcours__formelement">
                    <label htmlFor="coursname">Cours name</label>
                    <input   name="coursname" type="text" 
                    value={formdata?.coursname || ''}
                    required
                    onChange={e => setFormdata({...formdata,coursname: e.target.value})}
                    />
                </div>
                <div className="Addcours__formelement">
                    <label htmlFor="Note">Note </label>
                    <input    name="Note" type="text"
                    value={formdata?.note || ''}
                    onChange={e => setFormdata({...formdata,note: e.target.value})}
                    />
                </div>
                <div className="fileinput">
                    <InsertDriveFileIcon color={document ? `inherit` : `disabled`}/>
                    <Button
                        variant="contained"
                        component="label"
                        color="primary"
                        id="file"
                        disabled={!(formdata.classname && formdata.coursname)}
                    >
                        File
                        <input
                            type="file"
                            name="inputdocument"
                            hidden
                            onChange={e=>setDocument(e.target.files[0])}
                        />
                    </Button>
                    <span className="filename">{document?.name || (!(formdata.classname && formdata.coursname) ? 'Fill the informations First' :'no File selected')}</span>
                </div>
                <Button id="Uploadbutton" variant="contained" type="submit">Upload File</Button>
            </form>
        </div>
    )
}

export default Addcours
