import { Box, Typography, Button, IconButton } from "@mui/material";
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
  const { control } = useForm({
    defaultValues: {
      clases: [{}],
    },
  });

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
            <Typography color="#151143" fontSize="24px" fontWeight="bold">
              Crea un curso
            </Typography>
            <Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                <TextFieldController
                  name="precio"
                  label="Precio"
                  control={control}
                />

                <Typography color="#151143" fontSize="16px">
                  Añade los capitulos que va ha tener tu curso:
                </Typography>
                <div>
                  {fields.map((item, index) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        gap: "3em",
                      }}
                    >
                      <Typography color="#151143" fontSize="24px">
                        {index + 1}
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
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
                      </div>
                      <div>
                        <IconButton onClick={() => remove(index)}>X</IconButton>
                      </div>
                    </div>
                  ))}
                </div>
                <Button type="button" onClick={() => append({})}>
                  Añadir capitulo
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      </TeacherLayout>
    </>
  );
};

export default AddCourse;
