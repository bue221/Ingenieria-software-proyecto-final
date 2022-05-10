import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { Controller } from "react-hook-form";

const DatePickerController = ({
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
      render={({ field: { onChange, value } }) => (
        <DatePicker
          {...props}
          label={label}
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
        />
      )}
    />
  );
};

export default DatePickerController;
