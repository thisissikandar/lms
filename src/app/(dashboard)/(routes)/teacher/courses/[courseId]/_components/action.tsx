"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useConfettiStore } from "../../../../../../../../hooks/use-confetti-store";

interface ActionProps {
  courseId: string;
  isPublished: boolean;
  disabled: boolean;
}

export const Action = ({ courseId, disabled, isPublished }: ActionProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublished`);
        toast.success("Course unpublished successfully");
      } else {
        await axios.patch(`/api/courses/${courseId}/published`);
        toast.success("Course published successfully");
        confetti.onOpen();
      }
      router.refresh();
    } catch (error) {
      toast.error("Failed to update Course");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted successfully");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch (error) {
      toast.error("Failed to delete Course");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        variant={"outline"}
        disabled={disabled}
        size={"sm"}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size={"sm"}>
          <Trash className="w-4 h-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
