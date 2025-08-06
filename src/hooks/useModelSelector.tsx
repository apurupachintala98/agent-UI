// src/hooks/useModelSelector.ts
import { useState } from "react";
import type { ModelDescriptor } from "../components/navbar/Header";

export function useModelSelector(models: ModelDescriptor[]) {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const chatTitle = selectedModel
    ? models.find((m) => m.value === selectedModel)?.label ?? "Model Name"
    : "Model Name";

  return {
    selectedModel,
    setSelectedModel,
    chatTitle,
  };
}
