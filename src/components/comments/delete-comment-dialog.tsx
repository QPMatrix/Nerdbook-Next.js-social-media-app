import { CommentData } from "@/lib/types";
import React from "react";
import { useDeleteCommentMutation } from "./mutation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import LoadingButton from "../loading-btn";
import { Button } from "../ui/button";
interface DeleteCommentDialogProps {
  comment: CommentData;
  open: boolean;
  onClose: () => void;
}
const DeleteCommentDialog = ({
  comment,
  onClose,
  open,
}: DeleteCommentDialogProps) => {
  const mutation = useDeleteCommentMutation();
  const handleOpenChanges = (open: boolean) => {
    if (!open || !mutation.isPending) {
      onClose();
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChanges}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete commnet?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this comment? this action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={() => mutation.mutate(comment.id, { onSuccess: onClose })}
            loading={mutation.isPending}
          >
            Delete
          </LoadingButton>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCommentDialog;
