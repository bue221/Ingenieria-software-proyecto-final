import { FormControl, FormHelperText, Rating, FormLabel } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const RatingController = ({
  control,
  name,
  label,
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
        <FormControl required={required} error={!!errors[name]}>
          <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
          <Rating
            {...props}
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
          />
          <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default RatingController;
