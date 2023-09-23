"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Pencil,
  Ban,
  PlusCircle,
  ImageIcon,
  File,
  Loader2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import FileUpload from "@/components/fileUpload";
import Image from "next/image";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <span>Course attachments</span>
        {!isEditing && (
          <Button onClick={toggleEdit} variant="success">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add
          </Button>
        )}
        {/* {!isEditing && initialData.imageUrl && (
          <Button onClick={toggleEdit} variant="ghost">
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )} */}
        {isEditing && (
          <Button onClick={toggleEdit} variant="destructive">
            <Ban className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        )}
      </div>

      {!isEditing && (
        <>
          {initialData.attachments.length === 0 ? (
            <p className="text-sm italic text-slate-500">No attachments yet</p>
          ) : (
            <div className="space-y-2 mt-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="2-4 h-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.url}</p>
                  <div className="ml-auto">
                    {deletingId === attachment.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Button
                        variant="ghost"
                        className="hover:opacity-75 transition"
                        onClick={() => onDelete(attachment.id)}
                      >
                        <X className="w-4 h-4 " />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
