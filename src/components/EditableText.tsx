// src/components/EditableText.tsx
import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
} from "react";
import { Box, InputBase } from "@mui/material";

interface EditableTextProps {
  /** Current text to edit */
  value: string;
  /** Called when user finishes (Enter/blur) with a changed, non‑empty value */
  onSubmit: (newValue: string) => void;
  /** Called only when user hits Escape */
  onCancel?: () => void;
  /** Font size for the input text */
  fontSize?: string | number;
}

export default function EditableText({
  value,
  onSubmit,
  onCancel,
  fontSize = "0.875rem",
}: EditableTextProps) {
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  // focus & select immediately on mount
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.focus();
      input.select();
    }
  }, []);

  // sync if parent value changes externally
  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onCancel?.();
      setTempValue(value);
    }
  };

  const handleBlur = () => {
    const trimmed = tempValue.trim();
    if (trimmed && trimmed !== value) {
      onSubmit(trimmed);
    }
    // otherwise: do nothing (stay in edit mode until parent unmounts it)
  };

  return (
    <Box
      // trap events before they bubble up to parent clickable wrappers
      onPointerDownCapture={(e) => e.stopPropagation()}
      onMouseDownCapture={(e) => e.stopPropagation()}
      onTouchStartCapture={(e) => e.stopPropagation()}
    >
      <InputBase
        inputRef={inputRef}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        fullWidth
        sx={{
          fontSize,
          backgroundColor: "transparent",
          px: 0.5,
        }}
      />
    </Box>
  );
}
