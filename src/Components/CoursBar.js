import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { db, storage } from "../backend/firebase";
import "./CoursBar.css";
import store from "./../backend/store";
import useWindowDimensions from "../backend/useWindowDimensions ";
const CoursBar = ({ doc, code, isTeacher = true, classid }) => {
  const [RandomCode, setRandomCode] = useState("");
  //eslint-disable-next-line
  const { height, width } = useWindowDimensions();
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
    const snapshot = citiesRef
      .where("classuid", "==", classid)
      .get()
      .then((params) => {
        params.forEach((doc) => {
          // console.log(doc.id);
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
  const DeleteDoc = async () => {
    await db
      .collection("Prof")
      .doc(user.uid)
      .collection("Classes")
      .doc(doc.code)
      .collection("Courses")
      .doc(doc.id)
      .delete()
      .then(() => {
        const x = document.getElementById(doc.id);
        fadeFunction(x, "red", "#fff", true);
        // alert(`deleted ${doc.data.coursName} of ${doc.data.className}`);
      });
  };
  useEffect(() => {
    isTeacher ? getCode(code) : getCode(classid);
    // console.log();
  }, [classid, code, isTeacher]);
  const fadeFunction = async (element, from, to, abool) => {
    setTimeout(function () {
      element.style.backgroundColor = from; //"#a9c7ff";
    }, 400);
    setTimeout(function () {
      element.style.backgroundColor = to; //"#ffffff";
    }, 800);
    if (abool) {
      setTimeout(function () {
        element.classList.add("hide");
      }, 1000);
    }
  };
  useEffect(() => {
    var r = document.getElementById(doc.id);
    fadeFunction(r, "#a9c7ff", "#fff");
    //eslint-disable-next-line
  }, []);
  return doc.data.visible || isTeacher ? (
    <div className={`Courses__docs ${!isTeacher && "No__wrap"}`} id={doc.id}>
      <span className="Courses__docsTitle">{doc.data.coursName}</span>
      <div className="Courses_separator" />
      <span className={`Courses__docsNote ${!isTeacher && "Show__note"}`}>
        {doc.data.note}
      </span>
      <div className="Courses_separator" />
      <span className="Courses__docsCode">{RandomCode}</span>
      <div className="Courses_separator" />
      <span className="Courses__docsClassname">{doc.data.className}</span>
      {width >= 1000 ? (
        <div className="Courses_separator" />
      ) : (
        <div className="break" />
      )}
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

      {isTeacher && (
        <>
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
              <VisibilityOffIcon id="VisibiltyIcon" />
            )}
          </Tooltip>
          <div className="Courses_separator" />
          <Tooltip title={"Delete"} placement="top-start" onClick={DeleteDoc}>
            <DeleteIcon id="deleteIcon"></DeleteIcon>
          </Tooltip>
        </>
      )}
      <div className="Courses_separator" />
      <span className="Courses__docsDateOfupload">{doc.data.dateOfUpload}</span>
    </div>
  ) : (
    <span className={`${doc.data.visible && "hide"}`}>
      There are Courses found but hidden ask The teacher To Unhide it{" "}
    </span>
  );
};

export { CoursBar };
