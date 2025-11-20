import React, { useState } from "react";
import { TextField, Button, CircularProgress, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(loginUser(credentials));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Username"
        fullWidth
        variant="outlined"
        margin="normal"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />

      <TextField
        label="Password"
        fullWidth
        type="password"
        variant="outlined"
        margin="normal"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />

      <Button
        fullWidth
        variant="contained"
        type="submit"
        size="large"
        sx={{ mt: 2 }}
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <CircularProgress size={22} color="inherit" />
        ) : (
          "Login"
        )}
      </Button>
      {/* Forgot Password Link */}
        <Button
        variant="text"
        fullWidth
        sx={{ mt: 1, textTransform: "none" }}
        onClick={() => navigate("/forgot-password")}
        >
        Forgot Password?
        </Button>
    </form>
  );
}
