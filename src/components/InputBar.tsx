// components/InputBar.tsx
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { IconButton, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Tune";
import SendIcon from "@mui/icons-material/Send";
import { useState, type ReactNode } from "react";

export interface InputBarProps {
  placeholder?: string;
  hideIcons?: boolean;
  onSubmit?: (value: string) => void;
  submitIcon?: ReactNode;
}

export default function InputBar({
  placeholder = "Ask anything",
  hideIcons = false,
  onSubmit,
  submitIcon = <SendIcon />,
}: InputBarProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() && onSubmit) {
      onSubmit(input.trim());
      setInput("");
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 1.5,
        px: 2,
        display: "flex",
        alignItems: "center",
        borderRadius: "28px",
        width: "100%",
        maxWidth: 700,
        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
      }}
    >
      {!hideIcons && (
        <>
          <IconButton><AddIcon /></IconButton>
          <IconButton><SettingsIcon /></IconButton>
        </>
      )}
      <TextareaAutosize
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        minRows={1}
        maxRows={6}
        style={{
          flex: 1,
          fontSize: '1rem',
          fontFamily: 'inherit',
          padding: 0,
          marginLeft: hideIcons ? 0 : '16px',
          lineHeight: 1.5,
          border: 'none',
          outline: 'none',
          resize: 'none',
          background: 'transparent',
        }}
      />
      <IconButton onClick={handleSubmit} color="primary">
        {submitIcon}
      </IconButton>
    </Paper>
  );
}
