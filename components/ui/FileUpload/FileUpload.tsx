"use client";
import React, { useRef, useState } from "react";
import clsx from "clsx";
import { FiUploadCloud, FiFile, FiX } from "react-icons/fi";

type FileUploadProps = {
    onFileSelect: (files: File[]) => void;
    accept?: string;
    multiple?: boolean;
    label?: string;
};

const FileUpload = ({ onFileSelect, accept = "*", multiple = false, label = "Click to upload or drag and drop" }: FileUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(Array.from(e.target.files));
        }
    };

    const handleFiles = (files: File[]) => {
        const newFiles = multiple ? [...selectedFiles, ...files] : [files[0]];
        setSelectedFiles(newFiles);
        onFileSelect(newFiles);
    };

    const removeFile = (index: number) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
        onFileSelect(newFiles);
    };

    return (
        <div className="w-full">
            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={clsx(
                    "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all",
                    isDragging
                        ? "border-[var(--primary)] bg-[var(--primary)]/5"
                        : "border-zinc-300 dark:border-zinc-700 hover:border-[var(--primary)] hover:bg-zinc-50 dark:hover:bg-zinc-800"
                )}
            >
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                    <FiUploadCloud className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200 text-center">{label}</p>
                <p className="text-xs text-zinc-500 mt-1">{accept === "*" ? "Any file type" : accept}</p>
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleChange}
                />
            </div>

            {selectedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                                    <FiFile className="w-4 h-4 text-[var(--primary)]" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                                    <p className="text-xs text-zinc-500">{(file.size / 1024).toFixed(1)} KB</p>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFile(index)}
                                className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-full transition-colors"
                            >
                                <FiX className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

/*
 * How to use:
 * 
 * import { FileUpload } from "@/components/ui";
 * 
 * <FileUpload 
 *   multiple 
 *   accept="image/*" 
 *   onFileSelect={(files) => console.log(files)} 
 * />
 */

export default FileUpload;
