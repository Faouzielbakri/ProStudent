import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../backend/firebase";
import "./Courses.css";
import LoadingSvg from "../media/loading.gif";
import { Grid } from "@material-ui/core";
import { CoursBar } from "./CoursBar.js";

function Courses({ user, setuser }) {
  const [items, setItems] = useState([]);
  const [isfetching, setIsfetching] = useState(false);

  //Use Effect to get all the courses managed by the Current user
  useEffect(() => {
    setIsfetching(true);
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
            console.log(tempitems);
            tempitems = await [
              ...tempitems.concat(
                snap.docs.map((doc) => {
                  return { id: doc.id, data: doc.data(), code: docu.id };
                })
              ),
            ];
            // console.table("before", tempitems[3].id, tempitems[3].data.visible);
            tempitems = tempitems.reverse().filter((item, index, self) => {
              if (index === self.findIndex((t) => t.id === item.id)) {
                return true;
              }
              return false;
            });

            setItems([...tempitems]);
            // console.table(tempitems[3].id, tempitems[3].data.visible);
          });
        return docu.id;
      });
    });
    setIsfetching(false);
    // eslint-disable-next-line
  }, []);
  // eslint-disable-next-line
  async function retrieveFile() {
    const res = (await db.collection("uuid").get()).data();
    const classesRef = await db
      .collection("Prof")
      .doc(res.profuid.toString())
      .collection("Classes");
    classesRef.get().then((snapshot) => {
      snapshot.docs.map((docu) => {
        classesRef
          .doc(docu.id)
          .collection("Courses")
          .get()
          .then((snapshot) => {
            setItems(
              items.concat(
                snapshot.docs.map((doc) => {
                  return { id: doc.id, data: doc.data(), code: docu.id };
                })
              )
            );
          });
        return docu.id;
      });
    });
    // .doc(res.classuid.toString())
    // console.log(items);
  }
  // console.log(retrieveFile());
  return (
    <Grid className="Courses">
      <h3>Cours</h3>
      {items.map((doc) => (
        <CoursBar key={`${doc.id}`} doc={doc} code={doc.code} />
      ))}
      {isfetching && <img src={LoadingSvg} alt="loading" />}
    </Grid>
  );
}

export default Courses;
