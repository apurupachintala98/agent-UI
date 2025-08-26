import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type YamlBubbleProps = {
  yamlCode: string;
};

export function YamlBubble({ yamlCode }: YamlBubbleProps) {
  const [collapsed, setCollapsed] = useState(false);

  const handleDownload = () => {
    const blob = new Blob([yamlCode], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "output.yaml";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        borderRadius: "12px",
        padding: "12px",
        maxWidth: "100%",
        overflowX: "auto",
        position: "relative",
        background: "#F5F5F5",
        marginBottom: "1rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 4 }}>
        <IconButton size="small" onClick={() => setCollapsed((prev) => !prev)}>
          {collapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
        </IconButton>
        <IconButton size="small" onClick={handleDownload}>
          <DownloadIcon fontSize="small" />
        </IconButton>
      </div>

      {!collapsed && (
        <SyntaxHighlighter language="yaml" style={oneLight}>
          {yamlCode}
        </SyntaxHighlighter>
      )}
    </div>
  );
}
