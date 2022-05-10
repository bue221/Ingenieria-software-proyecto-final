import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
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
  useEffect(() => {
    getUser();
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
