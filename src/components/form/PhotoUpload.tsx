import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faXmark, faImage } from "@fortawesome/free-solid-svg-icons";

interface PhotoUploadProps {
    value?: string;
    onChange: (value: string) => void;
    label?: string;
    className?: string;
}

export default function PhotoUpload({ value, onChange, label = "Photo", className = "" }: PhotoUploadProps) {
    const [preview, setPreview] = useState<string | null>(value || null);

    useEffect(() => {
        setPreview(value || null);
    }, [value]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPreview(base64String);
                onChange(base64String);
            };
            reader.readAsDataURL(file);
        }
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".webp"],
        },
        multiple: false,
    });

    const removePhoto = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
        onChange("");
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}

            <div
                {...getRootProps()}
                className={`relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl transition-all cursor-pointer overflow-hidden
          ${isDragActive
                        ? "border-brand-500 bg-brand-50/50 dark:bg-brand-500/10"
                        : "border-gray-200 hover:border-brand-400 dark:border-gray-700 dark:hover:border-brand-500/50"
                    }
          ${preview ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-800"}
        `}
            >
                <input {...getInputProps()} />

                {preview ? (
                    <>
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <p className="text-white text-xs font-bold uppercase tracking-wider">Change Photo</p>
                        </div>
                        <button
                            onClick={removePhoto}
                            className="absolute top-2 right-2 h-7 w-7 flex items-center justify-center rounded-full bg-rose-500 text-white shadow-lg hover:bg-rose-600 transition-colors z-10"
                        >
                            <FontAwesomeIcon icon={faXmark} className="text-xs" />
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-3 p-6 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 group-hover:text-brand-500 transition-colors">
                            <FontAwesomeIcon icon={isDragActive ? faCloudArrowUp : faImage} className="text-xl" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
                                {isDragActive ? "Drop to upload" : "Upload photo"}
                            </p>
                            <p className="text-[10px] text-gray-400 font-medium mt-1">
                                PNG, JPG or WebP up to 10MB
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
