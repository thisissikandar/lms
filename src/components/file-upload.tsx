"use client";

import toast from "react-hot-toast";

import { ourFileRouter } from "@/app/api/uploadthing/core";   
import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadprops {
  onChange: (url?: string) => void;
  endPoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ endPoint, onChange }: FileUploadprops) => {
  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(err: Error) => {
        toast.error(`${err?.message}`);
      }}
    />
  );
};

