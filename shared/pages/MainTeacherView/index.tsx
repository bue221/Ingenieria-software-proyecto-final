import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFirebase } from "react-redux-firebase";
import FieldArray from "shared/fieldArray";
import TeacherLayout from "shared/UI/layouts/TeacherLayout";

const MainTeacherView = () => {
  const router = useRouter();
  const firebase = useFirebase();

  const getUser = async () => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((res) => {
        console.log(res.docs);
      });
  };
  const [data, setData] = useState<any>([]);
  const getData = async () => {
    firebase
      .firestore()
      .collection("cursos")
      .get()
      .then(async (doc) => {
        if (doc.docs) {
          const data = await doc.docs.map((doc) => ({
            ...doc.data(),
            uid: doc.id,
          }));
          setData(data);
        } else {
          throw new Error();
        }
      });
  };
  useEffect(() => {
    getUser();
    getData();
  }, []);
  return (
    <>
      <Head>
        <title>AprendeEnLinea Profesores | Inicio</title>
      </Head>
      <TeacherLayout>
        <FieldArray />
      </TeacherLayout>
    </>
  );
};

export default MainTeacherView;
