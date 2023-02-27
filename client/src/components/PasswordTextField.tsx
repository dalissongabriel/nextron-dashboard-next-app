import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";

import { useToggle } from "@hooks/useToggle";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function PasswordTextField({
  error,
  helperText,
  ...rest
}: TextFieldProps) {
  const [showPassword, toggleShowPassord] = useToggle();

  return (
    <TextField
      type={showPassword ? "text" : "password"}
      label="Password"
      autoComplete="current-password"
      error={error}
      required
      helperText={helperText}
      inputProps={{
        "data-testid": "input-password-id",
        id: "input-password-id",
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" sx={{ marginRight: "4px" }}>
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShowPassord}
              edge="end"
              color={error ? "error" : "primary"}
              data-testid="icon-btn-password-visibility-id"
              id="icon-btn-password-visibility-id"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
      {...rest}
    />
  );
}
