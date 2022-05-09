import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const SelectController = ({
  control,
  name,
  label,
  variant,
  required = false,
  children,
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            variant={variant || "outlined"}
            {...props}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            error={!!errors[name]}
            helperText={errors[name]?.message}
          >
            {children}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default SelectController;
