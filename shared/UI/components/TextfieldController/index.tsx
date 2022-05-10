import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const TextFieldController = ({
  control,
  name,
  label,
  variant,
  required = false,
  ...props
}: any) => {
  return (
    <Controller
      rules={{ required: required ? "Campo requerido" : false }}
      name={name}
      control={control}
      render={({
        field: { onBlur, onChange, value },
        formState: { errors },
      }) => (
        <TextField
          variant={variant || "outlined"}
          {...props}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          label={label}
          error={!!errors[name]}
          helperText={errors[name]?.message}
        />
      )}
    />
  );
};

export default TextFieldController;
