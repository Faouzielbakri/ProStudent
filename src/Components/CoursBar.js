import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Tooltip from "@material-ui/core/Tooltip";
import { db, storage } from "../backend/firebase";
import "./CoursBar.css";
import store from "./../backend/store";
const CoursBar = ({ doc, code }) => {
  const [RandomCode, setRandomCode] = useState("");
  const Downloadfile = (path) => {
    storage
      .ref(path)
      .getDownloadURL()
      .then((url) => {
        window.location.href = url;
        // console.log(url)
      })
      .catch((error) => {
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            alert("File not found");
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            alert("User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            // User canceled the upload
            alert("user canceled the upload");
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            alert("Unknown error occurred");
            break;
          default:
            break;
        }
      });
  };
  const [user, setuser] = useState(store.getState().user);
  store.subscribe(() => {
    setuser(store.getState().user);
  });
  function getCode(classid) {
    const citiesRef = db.collection("uuid");
    // var id = "";
    const snapshot = citiesRef
      .where("classuid", "==", classid)
      .get()
      .then((params) => {
        params.forEach((doc) => {
          setRandomCode(doc.id);
          return doc.id;
        });
        // animatedDiv.togglePresence();
      });
    if (snapshot.empty) {
      console.log("No matching documents.");
    }
    // console.log(state);
  }
  const setVisibiliy = async (theBoolean) => {
    // console.log("start visibiliy", user.uid);
    await db
      .collection("Prof")
      .doc(user.uid)
      .collection("Classes")
      .doc(doc.code)
      .collection("Courses")
      .doc(doc.id)
      .update({ visible: theBoolean });
    // console.log(doc);
  };
  useEffect(() => {
    getCode(code);
  }, []);
  return (
    <div className="Courses__docs">
      <span className="Courses__docsTitle">{doc.data.coursName}</span>
      <div className="Courses_separator" />
      <span className="Courses__docsNote">{doc.data.note}</span>
      <div className="Courses_separator" />
      <span className="Courses__docsCode">{RandomCode}</span>
      <div className="Courses_separator" />
      <span className="Courses__docsClassname">{doc.data.className}</span>
      <div className="Courses_separator" />
      <Tooltip title={`Download File`} placement="top-start">
        <Button
          style={{
            maxWidth: "24px",
            maxHeight: "24px",
            minWidth: "24px",
            minHeight: "24px",
          }}
          //  type="submit"
          onClick={() => {
            Downloadfile(doc.data.path);
            console.log("start");
          }}
        >
          <GetAppIcon id="downloadIcon" />
        </Button>
      </Tooltip>
      <div className="Courses_separator" />
      <span className="Courses__docsDateOfupload">{doc.data.dateOfUpload}</span>
      <div className="Courses_separator" />
      <Tooltip
        title={doc.data.visible ? "Visible" : "hidden"}
        placement="top-start"
        onClick={() => {
          setVisibiliy(!doc.data.visible);
        }}
      >
        {doc.data.visible ? (
          <VisibilityIcon id="VisibiltyIcon" />
        ) : (
          <VisibilityOffIcon
            id="VisibiltyIcon"
            // onClick={setVisibiliy(!doc.data.visible)}
          />
        )}
      </Tooltip>
    </div>
  );
};

export { CoursBar };
