import { memo } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { useControl } from "../hooks";
import type { TProps } from "./types";

export const Form = memo(
  ({
    maxAmount = 50,
    minAmount = 10,
    fields = {
      password: "password",
      range: "range",
      numbers: "numbers",
      uppercase: "uppercase",
      special: "special",
    },
  }: TProps) => {
    const { checkedChange, result, handleChangeRange, amount } = useControl();

    return (
      <Stack direction="column" spacing={2}>
        <TextField
          type="text"
          variant="outlined"
          name={fields.password}
          value={result}
          fullWidth
        />
        <Typography id="range-slider-label" gutterBottom>
          Range: {amount || minAmount}
        </Typography>
        <Slider
          value={amount || minAmount}
          onChange={handleChangeRange}
          min={minAmount}
          max={maxAmount}
          name={fields.range}
          step={1}
          aria-labelledby="range-slider-label"
        />

        <FormGroup>
          <FormControlLabel
            control={<Checkbox onChange={checkedChange(1)} />}
            label="Numbers"
            name={fields.numbers}
          />
          <FormControlLabel
            control={<Checkbox onChange={checkedChange(2)} />}
            label="Uppercase"
            name={fields.uppercase}
          />
          <FormControlLabel
            control={<Checkbox onChange={checkedChange(3)} />}
            label="Special"
            name={fields.special}
          />
        </FormGroup>
      </Stack>
    );
  }
);
