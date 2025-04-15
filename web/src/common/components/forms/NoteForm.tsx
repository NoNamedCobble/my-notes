"use client";
import FormColorPicker from "@/common/components/FormColorPicker";
import FormInput from "@/common/components/FormInput";
import SubmitButton from "@/common/components/SubmitButton";
import { noteSchema } from "@/common/schemas";
import { NoteData, NoteProps } from "@/common/types";
import { addNote, updateNote } from "@/services/api/notes";
import { useModalStore } from "@/store/useModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import FormTextArea from "@/common/components/FormTextArea";
import { useMemo } from "react";

export default function NoteForm() {
  const { closeModal, currentNote } = useModalStore();
  const isEditMode = useMemo(() => Boolean(currentNote), []);
  const { control, handleSubmit, reset, formState } = useForm<NoteData>({
    shouldUnregister: true,
    resolver: zodResolver(noteSchema),
    mode: "onSubmit",
    defaultValues: {
      title: currentNote?.title || "",
      content: currentNote?.content || "",
      background: currentNote?.background || "#ffffff",
    },
  });
  const { isSubmitting } = formState;
  const formLabels = {
    heading: isEditMode ? "Edit your note" : "Create new note",
    submit: isEditMode ? "Save changes" : "Create",
  };

  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const queryClient = useQueryClient();
  const addNoteMutation = useMutation({
    mutationFn: (note: NoteData) => addNote(note),
    onSuccess: (response) => {
      const { _id, title, content, background } = response.note;
      queryClient.setQueryData(["notes"], (oldNotes: NoteProps[]) => {
        return [...oldNotes, { _id, title, content, background }];
      });
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: (note: NoteProps) => updateNote(note),
    onSuccess: (response) => {
      const { _id, title, content, background } = response.updatedNote;
      queryClient.setQueryData(["notes"], (oldNotes: NoteProps[]) => {
        return oldNotes.map((note) =>
          note._id === _id ? { _id, title, content, background } : note
        );
      });
    },
  });

  const onSubmit: SubmitHandler<NoteData> = async (data) => {
    if (isEditMode) {
      if (!currentNote) return;
      updateNoteMutation.mutate({ _id: currentNote._id, ...data });
    } else {
      addNoteMutation.mutate(data);
    }

    reset();
    closeModal();
  };

  return (
    <form
      onClick={(e) => handleStopPropagation(e)}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative flex h-4/5 min-h-fit w-full max-w-xl flex-col gap-4 rounded-xl bg-secondary p-8 md:h-fit"
    >
      <h2 className="text-3xl text-primary">{formLabels.heading}</h2>
      <button
        onClick={closeModal}
        type="button"
        aria-label="Close warning message"
        className="absolute right-0 top-0 m-2 flex h-9 w-9 items-center justify-center"
      >
        <span className="absolute h-0.5 w-3/4 rotate-45 bg-primary"></span>
        <span className="absolute h-0.5 w-3/4 -rotate-45 bg-primary"></span>
      </button>
      <FormInput
        iconSrc="images/title.svg"
        name="title"
        control={control}
        placeholder="Title"
      />
      <div className="w-full flex flex-row gap-4">
        <FormTextArea
          iconSrc="images/content.svg"
          name="content"
          control={control}
          placeholder="Content"
          className="h-full"
        />
        <FormColorPicker control={control} name="background" />
      </div>
      <SubmitButton isSubmitting={isSubmitting} title={formLabels.submit} />
    </form>
  );
}
