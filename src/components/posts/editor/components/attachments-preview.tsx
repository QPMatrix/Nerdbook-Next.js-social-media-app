import React from "react";
import { Attachment } from "../useMediaUpload";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { X } from "lucide-react";
interface AttachmentPreviewProps {
  attachment: Attachment;
  onRemoveClick: () => void;
}
const AttachmentPreview = ({
  attachment: { file, mediaId, isUploading },
  onRemoveClick,
}: AttachmentPreviewProps) => {
  const src = URL.createObjectURL(file);
  return (
    <div
      className={cn("relative mx-auto size-fit", isUploading && "opacity-50")}
    >
      {file.type.startsWith("image") ? (
        <Image
          src={src}
          alt="Attachment Preview"
          width={500}
          height={500}
          className="size-fit max-h-[30rem] rounded-2xl"
        />
      ) : (
        <video controls className="size-fit max-h-[30rem] rounded-2xl">
          <source src={src} type={file.type} />
        </video>
      )}
      {!isUploading && (
        <button
          onClick={onRemoveClick}
          className="absolute right-3 top-3 rounded-full bg-foreground p-1.5 transition-colors hover:bg-foreground/60"
        >
          <X size={20} className="text-white dark:text-primary" />
        </button>
      )}
    </div>
  );
};

export default AttachmentPreview;
