"use client";
import FormColorPicker from "@/common/components/FormColorPicker";
import FormInput from "@/common/components/FormInput";
import FormTextArea from "@/common/components/FormTextArea";
import SubmitButton from "@/common/components/SubmitButton";
import { useNotes } from "@/common/hooks/useNotes";
import { useOutsideClick } from "@/common/hooks/useOutsideClick";
import { noteSchema } from "@/common/schemas";
import { NoteWithoutId } from "@/common/types";
import { useNoteModalStore } from "@/store/useNoteModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function NoteForm() {
  const { closeModal, currentNote } = useNoteModalStore();
  const isEditMode = useMemo(() => Boolean(currentNote), []);
  const { control, handleSubmit, reset, formState } = useForm<NoteWithoutId>({
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

  const { createNote, updateNote } = useNotes();
  const ref = useOutsideClick<HTMLFormElement>(closeModal);

  const onSubmit: SubmitHandler<NoteWithoutId> = async (data) => {
    if (isEditMode) {
      if (currentNote) {
        updateNote({ _id: currentNote._id, ...data });
      }
    } else {
      createNote(data);
    }

    reset();
    closeModal();
  };

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative flex h-5/6 min-h-fit w-full max-w-xl flex-col gap-4 rounded-xl bg-secondary px-3 pt-4 shadow-custom-blue md:h-fit md:p-8"
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
      <div className="relative flex md:gap-2">
        <FormTextArea
          iconSrc="images/content.svg"
          name="content"
          control={control}
          placeholder="Content"
        />
        <FormColorPicker control={control} name="background" />
      </div>
      <SubmitButton isSubmitting={isSubmitting} title={formLabels.submit} />
    </form>
  );
}
