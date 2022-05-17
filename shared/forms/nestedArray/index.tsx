import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import { useFieldArray } from "react-hook-form";
import TextFieldController from "shared/UI/components/TextfieldController";
import DeleteIcon from "@mui/icons-material/Delete";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NestedArray = ({ nestIndex, control }: any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `capitulos[${nestIndex}].leccion`,
  });

  return (
    <div>
      {fields.map((item, k) => {
        return (
          <div key={item.id} style={{ marginLeft: 20 }}>
            <Typography fontWeight="bold" mt={2}>
              Lección:
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  gap: 2,
                  mt: 2,
                }}
              >
                <TextFieldController
                  fullWidth
                  control={control}
                  name={`capitulos[${nestIndex}].leccion[${k}].nombre`}
                  label="Nombre"
                />
                <TextFieldController
                  control={control}
                  name={`capitulos[${nestIndex}].leccion[${k}].descripcion`}
                  label="Descripción"
                />
                <TextFieldController
                  control={control}
                  name={`capitulos[${nestIndex}].leccion[${k}].videoUrl`}
                  label="Video URL"
                />
                <TextFieldController
                  control={control}
                  name={`capitulos[${nestIndex}].leccion[${k}].ejemplos`}
                  label="Ejemplos"
                />
              </Box>
              <Box>
                <IconButton onClick={() => remove(k)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </div>
        );
      })}

      <Button
        type="button"
        onClick={() =>
          append({
            nombre: "",
            descripcion: "",
            videoUrl: "",
            ejemplos: "",
          })
        }
      >
        Añadir lección
      </Button>

      <hr />
    </div>
  );
};

export default NestedArray;
