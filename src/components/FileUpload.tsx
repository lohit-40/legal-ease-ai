import React, { useCallback, useState } from "react";

interface FileUploadProps {
  onUpload: (file: File) => void;
  disabled?: boolean;
}

/**
 * FileUpload Component
 * An accessible drag-and-drop file upload zone.
 * 
 * @param {FileUploadProps} props - The component props.
 */
export default function FileUpload({ onUpload, disabled = false }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndUpload = useCallback((file: File) => {
    setError(null);
    const validTypes = ["application/pdf", "text/plain"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid PDF or Text file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be under 5MB.");
      return;
    }
    onUpload(file);
  }, [onUpload]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndUpload(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, [disabled, validateAndUpload]);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndUpload(e.target.files[0]);
    }
  };

  return (
    <div>
      <div 
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className="glass-panel"
        style={{
          border: isDragging ? "2px solid var(--accent-primary)" : "1px solid var(--glass-border)",
          background: isDragging ? "hsla(190, 100%, 50%, 0.1)" : "rgba(0,0,0,0.2)",
          padding: "48px 24px",
          textAlign: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
          transition: "all 0.2s ease",
          boxShadow: "inset 0 4px 12px rgba(0,0,0,0.3)",
          pointerEvents: disabled ? "none" : "auto",
        }}
      >
        <p style={{ marginBottom: "16px", color: "var(--text-main)", fontWeight: 500 }}>
          Drag & drop your file here, or click to browse.
        </p>
        <p style={{ marginBottom: "24px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
          Supports .PDF, .TXT (Max 5MB)
        </p>
        
        <input 
          type="file" 
          id="file-upload" 
          accept=".pdf,.txt"
          onChange={onFileInputChange}
          style={{ display: "none" }}
          aria-label="Upload a legal document"
          disabled={disabled}
        />
        <label 
          htmlFor="file-upload" 
          className="btn-primary" 
          aria-disabled={disabled}
          style={{ display: "inline-block" }}
        >
          Select File
        </label>
      </div>
      
      {error && (
        <div role="alert" style={{ marginTop: "12px", color: "var(--error)", fontSize: "0.9rem" }}>
          {error}
        </div>
      )}
    </div>
  );
}
