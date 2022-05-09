import { Box, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useFirebase } from "react-redux-firebase";
import FieldArray from "shared/fieldArray";
import TextFieldController from "shared/UI/components/TextfieldController";
import TeacherLayout from "shared/UI/layouts/TeacherLayout";

const AddCourse = () => {
  const router = useRouter();
  const firebase = useFirebase();
  const { control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "clases",
  });

  return (
    <>
      <Head>
        <title>AprendeEnLinea Profesores | Añadir curso</title>
      </Head>
      <TeacherLayout>
        <>
          <Box>
            <Typography>Crea un curso</Typography>
            <Box>
              <TextFieldController
                name="nombre"
                label="Nombre del curso"
                control={control}
              />
              <TextFieldController
                name="descripcion"
                label="Descripcion"
                control={control}
              />
              <TextFieldController
                name="autor"
                label="Nombre del autor del curso"
                control={control}
              />
              <ul>
                {fields.map((item, index) => (
                  <li key={item.id}>
                    <TextFieldController
                      name={`test.${index}.titulo`}
                      control={control}
                      label="Titulo"
                    />
                    <TextFieldController
                      name={`test.${index}.urlVideo`}
                      control={control}
                      label="url Video"
                    />
                    <button type="button" onClick={() => remove(index)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => append({})}>
                append
              </button>
              <TextFieldController
                name="precio"
                label="Precio"
                control={control}
              />
            </Box>
          </Box>
          <FieldArray />
        </>
      </TeacherLayout>
    </>
  );
};

export default AddCourse;
