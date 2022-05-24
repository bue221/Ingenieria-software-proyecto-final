/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography, Button, IconButton } from "@mui/material";
import Head from "next/head";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import NestedArray from "shared/forms/nestedArray";
import TextFieldController from "shared/UI/components/TextfieldController";
import TeacherLayout from "shared/UI/layouts/TeacherLayout";
import DeleteIcon from "@mui/icons-material/Delete";
import MultipleSelectChip from "shared/UI/components/MultipleSelect";
import { useFirebase } from "react-redux-firebase";
import { useRouter } from "next/router";
import { useAppSelector } from "shared/redux/hooks";

const AddCourse = () => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      capitulos: [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "capitulos",
  });

  const firebase = useFirebase();
  const { push } = useRouter();
  const user = useAppSelector((state) => state.user);
  const onSubmit = async (data: any) => {
    try {
      await firebase
        .firestore()
        .collection("cursos")
        .add({
          ...data,
          emailCreator: user?.value?.email,
          estudiantes: [],
          rating: 0,
        });
      push("/");
    } catch (err) {
      alert("error");
    }
  };

  return (
    <>
      <Head>
        <title>AprendeEnLinea Profesores | Añadir curso</title>
      </Head>
      <TeacherLayout>
        <>
          <Box py={2}>
            <Typography color="#151143" fontSize="24px" fontWeight="bold">
              Crea un curso
            </Typography>
            <Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextFieldController
                  name="nombre"
                  label="Nombre del curso"
                  control={control}
                />
                <TextFieldController
                  name="image"
                  label="Imagen del curso"
                  control={control}
                />
                <TextFieldController
                  name="descripcion"
                  label="Descripcion"
                  control={control}
                />
                <MultipleSelectChip
                  control={control}
                  name="categorias"
                  label="categorias"
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

                <Typography
                  color="#151143"
                  fontSize="24px"
                  textAlign="center"
                  mt={4}
                >
                  Añade los capitulos que va ha tener tu curso:
                </Typography>
                <div>
                  {fields.map((item, index) => (
                    <>
                      <div
                        key={item.id}
                        style={{
                          margin: "10px 0",
                          width: "100%",
                          alignItems: "center",
                          gap: "3em",
                        }}
                      >
                        <Typography
                          color="#151143"
                          fontSize="16px"
                          fontWeight="bold"
                        >
                          Capitulo {index + 1}
                        </Typography>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "100%",
                              gap: 10,
                            }}
                          >
                            <TextFieldController
                              name={`capitulos.${index}.titulo`}
                              control={control}
                              label="Titulo"
                            />
                            <TextFieldController
                              name={`capitulos.${index}.subtitulo`}
                              control={control}
                              label="Subtitulo"
                            />
                            <TextFieldController
                              name={`capitulos.${index}.objetivo`}
                              control={control}
                              label="Objetivo"
                            />
                            <TextFieldController
                              name={`capitulos.${index}.descripcion`}
                              control={control}
                              label="Descripción"
                            />
                          </div>
                          <div>
                            <IconButton onClick={() => remove(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                      <NestedArray
                        nestIndex={index}
                        {...{ control, register }}
                      />
                    </>
                  ))}
                </div>
                <Button type="button" onClick={() => append({})}>
                  Añadir capitulo
                </Button>
              </Box>
            </Box>
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              sx={{ mt: 5 }}
              onClick={handleSubmit(onSubmit)}
            >
              Crear el curso
            </Button>
          </Box>
        </>
      </TeacherLayout>
    </>
  );
};

export default AddCourse;
