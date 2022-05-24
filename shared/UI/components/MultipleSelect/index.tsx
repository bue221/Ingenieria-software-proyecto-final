import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Controller } from "react-hook-form";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  "Educación",
  "Cocina",
  "Entretenimiento",
  "Marketing",
  "Programación",
  "Machine learning",
  "Emprendimiento",
  "Politica",
  "Historia",
  "Geografia",
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      categories.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({
  control,
  name,
  label,
  required,
}: any) {
  const theme = useTheme();
  return (
    <Controller
      rules={{ required: required ? "Campo requerido" : false }}
      name={name}
      control={control}
      render={({
        field: { onBlur, onChange, value },
        formState: { errors },
      }) => (
        <div>
          <FormControl error={!!errors[name]} sx={{ width: "100%" }}>
            <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
            <Select
              fullWidth
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={value || []}
              onBlur={onBlur}
              onChange={(event) => {
                const {
                  target: { value },
                } = event;
                onChange(value);
              }}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((i: any) => (
                    <Chip key={i} label={i} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {categories.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, value, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
    />
  );
}
