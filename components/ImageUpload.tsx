"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  if (value) {
    return (
      <div className="relative size-50">
        <img src={value} alt="Upload" className="rounded-md size-40 object-cover" />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }
  return (
    <div className="w-full">
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
        appearance={{
          button: "bg-primary w-40 text-primary-foreground hover:bg-primary/90 mb-3 cursor-pointer font-bold dark:text-black",
          label: "text-foreground",
          allowedContent: "text-muted-foreground",
        }}
        className="border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 rounded-lg"
      />
    </div>
  );
}
export default ImageUpload;