"use client";

import React, { useState, useRef } from "react";
import { Upload, File, FileText, AlertCircle, Trash2, CheckCircle2 } from "lucide-react";

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
  allowedTypes: string[];
  maxSizeKb?: number;
  minSizeKb?: number;
  multiple?: boolean;
  maxFiles?: number;
  className?: string;
}

export default function Dropzone({
  onFilesSelected,
  allowedTypes,
  maxSizeKb,
  minSizeKb,
  multiple = false,
  maxFiles = 1,
  className = "",
}: DropzoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<{ file: File; id: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const validateFiles = (files: File[]): File[] => {
    setError(null);
    const valid: File[] = [];

    if (!multiple && files.length > 1) {
      setError("Please upload only one file at a time.");
      return [];
    }
    if (multiple && maxFiles && selectedFiles.length + files.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} files.`);
      return [];
    }

    for (const file of files) {
      const isAllowedType = allowedTypes.some((type) => {
        if (type.endsWith("/*")) return file.type.startsWith(type.split("/")[0]);
        return file.type === type;
      });
      if (!isAllowedType) {
        setError(`Unsupported file type: ${file.name}. Allowed: ${allowedTypes.map((t) => t.split("/")[1]?.toUpperCase() || t).join(", ")}`);
        return [];
      }
      if (file.size > 50 * 1024 * 1024) {
        setError(`File too large: ${file.name}. Max allowed is 50 MB.`);
        return [];
      }
      valid.push(file);
    }
    return valid;
  };

  const handleFiles = (files: File[]) => {
    const validFiles = validateFiles(files);
    if (validFiles.length > 0) {
      const newItems = validFiles.map((f) => ({ file: f, id: Math.random().toString(36).substring(2) }));
      const updatedList = multiple ? [...selectedFiles, ...newItems] : newItems;
      setSelectedFiles(updatedList);
      onFilesSelected(updatedList.map((item) => item.file));
    }
  };

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragActive(true); };
  const onDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragActive(false); };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files?.length) handleFiles(Array.from(e.dataTransfer.files));
  };
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleFiles(Array.from(e.target.files));
  };
  const removeFile = (id: string) => {
    const updated = selectedFiles.filter((f) => f.id !== id);
    setSelectedFiles(updated);
    onFilesSelected(updated.map((item) => item.file));
    setError(null);
  };

  const typeLabels = allowedTypes.map((t) => t.split("/")[1]?.toUpperCase() || t).join(", ");

  return (
    <div className={`w-full ${className}`}>
      {/* Drop zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className="w-full min-h-[200px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all select-none"
        style={{
          borderColor: isDragActive ? "#FF5C2E" : "#C8C2B8",
          background: isDragActive ? "#fff4f0" : "#faf8f5",
          transform: isDragActive ? "scale(1.01)" : "scale(1)",
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept={allowedTypes.join(",")}
          multiple={multiple}
          className="hidden"
        />

        <div
          className="p-3 rounded-full mb-4 transition-all"
          style={{
            background: isDragActive ? "#fff4f0" : "#F5F0E8",
            color: isDragActive ? "#FF5C2E" : "#888888",
          }}
        >
          <Upload className="h-6 w-6" />
        </div>

        <p className="text-[#0F0F0F] font-semibold text-sm mb-1">
          Drag & drop your file here, or{" "}
          <span style={{ color: "#FF5C2E" }} className="hover:underline">browse</span>
        </p>
        <p className="text-[#888] text-xs">Supports: {typeLabels}</p>
        {maxSizeKb && (
          <p className="text-[#888] text-xs mt-1">
            Target: {minSizeKb ? `${minSizeKb}–${maxSizeKb} KB` : `Under ${maxSizeKb} KB`}
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 mt-3 p-3 rounded-xl text-xs" style={{ background: "#fff0f0", border: "1px solid #ffc5c5", color: "#cc2200" }}>
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* File list */}
      {selectedFiles.length > 0 && (
        <div className="mt-3 space-y-2">
          {selectedFiles.map(({ file, id }) => {
            const isPdf = file.type === "application/pdf";
            return (
              <div key={id} className="flex items-center justify-between p-3 rounded-xl" style={{ border: "1px solid #e8e2d8", background: "#ffffff" }}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-1.5 rounded-lg shrink-0" style={{ background: "#fff4f0", color: "#FF5C2E" }}>
                    {isPdf ? <FileText className="h-4 w-4" /> : <File className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#0F0F0F] text-xs font-medium truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                    <p className="text-[#888] text-[10px]">{formatSize(file.size)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <CheckCircle2 className="h-4 w-4" style={{ color: "#10b981" }} />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeFile(id); }}
                    className="p-1 rounded-lg transition-colors hover:bg-[#fff0f0]"
                    style={{ color: "#aaa" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#cc2200")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#aaa")}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
