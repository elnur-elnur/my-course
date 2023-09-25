"use client";

import * as z from "zod";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Pencil, Ban, PlusCircle, Video } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import FileUpload from "@/components/fileUpload";
import Image from "next/image";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <span>Chapter Video</span>
        {!isEditing && !initialData.videoUrl && (
          <Button onClick={toggleEdit} variant="success">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add
          </Button>
        )}
        {!isEditing && initialData.videoUrl && (
          /* TODO: Create new component for this Button. e.g. name - "CardButton" */
          <Button onClick={toggleEdit} variant="ghost">
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
        {isEditing && (
          <Button onClick={toggleEdit} variant="destructive">
            <Ban className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        )}
      </div>

      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-2">
            <Video className="w-10 h-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s Video
          </div>
        </div>
      )}

      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if videos
          does not appear.
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
