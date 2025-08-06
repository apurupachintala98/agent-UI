import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, IconButton, Box } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

export default function LoginPage({ open, onClose, onLogin }: { open: boolean; onClose: () => void; onLogin: (username: string, password: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    onLogin(username, password);
    setUsername("");
    setPassword("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <LoginIcon color="primary" /> Login
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button onClick={() => setShowPassword(v => !v)} size="small">
          {showPassword ? "Hide" : "Show"} Password
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleLogin} variant="contained" color="primary">Login</Button>
      </DialogActions>
    </Dialog>
  );
}
