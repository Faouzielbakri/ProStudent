import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../backend/firebase";
import "./Courses.css";
import { Grid } from "@material-ui/core";
import { CoursBar } from "./CoursBar.js";
import store from "../backend/store";

const Courses = ({ code = null, isTeacher = true }) => {
  const [items, setItems] = useState([]);
  const [user, setuser] = useState(store.getState().user);
  store.subscribe(() => {
    setuser(store.getState().user);
  });
  // Get user Courses
  async function retrieveCourses() {
    console.log("he");
    const classesRef = db
      .collection("Prof")
      .doc(user?.uid?.toString())
      .collection("Classes");
    classesRef.onSnapshot((snapshot) => {
      var tempitems = [];
      snapshot.docs.map((docu) => {
        classesRef
          .doc(docu.id)
          .collection("Courses")
          .onSnapshot(async (snap) => {
            // console.log(tempitems);
            tempitems = await [
              ...tempitems.concat(
                snap.docs.map((doc) => {
                  return { id: doc.id, data: doc.data(), code: docu.id };
                })
              ),
            ];
            tempitems = tempitems.reverse().filter((item, index, self) => {
              if (index === self.findIndex((t) => t.id === item.id)) {
                return true;
              }
              return false;
            });

            setItems([...tempitems]);
          });
        return docu.id;
      });
    });
  }
  // Get Courses based on The code
  async function retrieveFiles(code) {
    var res = null;
    if (code) {
      res = (await db.collection("uuid").doc(code).get()).data();
    }
    // console.log(res?.classuid);
    if (res) {
      const classesRef = await db
        .collection("Prof")
        .doc(res.profuid.toString())
        .collection("Classes");
      classesRef
        .doc(res.classuid)
        .collection("Courses")
        .get()
        .then((snapshot) => {
          setItems(
            items.concat(
              snapshot.docs.map((doc) => {
                return {
                  id: doc.id,
                  data: doc.data(),
                  code: code,
                  classid: res.classuid,
                };
              })
            )
          );
        });
    } else {
      // console.log("no courses's corresponded to this code");
    }
  }
  //Get ALl the courses and orgnize them
  useEffect(() => {
    // console.log(code);
    isTeacher === true ? retrieveCourses() : retrieveFiles(code);
    // eslint-disable-next-line
  }, [code]);
  // eslint-disable-next-line

  return (
    <Grid className={`Courses ${isTeacher && "flex1"}`}>
      <h3>Courses</h3>
      {items.length !== 0 ? (
        items.map((doc) => (
          <CoursBar
            key={`${doc.id}`}
            doc={doc}
            code={doc.code}
            isTeacher={isTeacher}
            classid={doc?.classid}
          />
        ))
      ) : (
        <span>
          no Courses To show Please{" "}
          {isTeacher
            ? `add Courses`
            : `${code ? "verifie The" : "type a"}  code`}{" "}
        </span>
      )}
    </Grid>
  );
};

export default Courses;
