import { useState, useEffect, useCallback } from "react";

export function useEditableTitle(
  initialTitle: string,
  onRename: (newTitle: string) => void
) {
  const [text, setText] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);

  // sync up if parent title changes
  useEffect(() => {
    setText(initialTitle);
  }, [initialTitle]);

  const startEdit = useCallback(() => setIsEditing(true), []);
  const cancelEdit = useCallback(() => {
    setText(initialTitle);
    setIsEditing(false);
  }, [initialTitle]);
  const submitEdit = useCallback(
    (newValue: string) => {
      setText(newValue);
      setIsEditing(false);
      onRename(newValue);
    },
    [onRename]
  );

  return {
    text,
    isEditing,
    startEdit,
    cancelEdit,
    submitEdit,
    setText,
  };
}
