"use client";
import FormColorPicker from "@/common/components/FormColorPicker";
import FormInput from "@/common/components/FormInput";
import SubmitButton from "@/common/components/SubmitButton";
import { noteSchema } from "@/common/schemas";
import { NoteData } from "@/common/types";
import { addNote } from "@/services/api/notes";
import { useModalStore } from "@/store/useModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export default function NewNoteForm() {
  const { closeModal } = useModalStore();
  const { control, handleSubmit, reset, setError, formState } =
    useForm<NoteData>({
      shouldUnregister: true,
      resolver: zodResolver(noteSchema),
      mode: "onSubmit",
      defaultValues: {
        title: "",
        content: "",
        background: "#ffffff",
      },
    });
  const { isSubmitting } = formState;

  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const onSubmit: SubmitHandler<NoteData> = async (data) => {
    closeModal();
    try {
      const response = await addNote(data);
      console.log(response);
    } catch (error) {}
  };

  return (
    <form
      onClick={(e) => handleStopPropagation(e)}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative flex h-4/5 min-h-fit w-full max-w-xl flex-col gap-4 rounded-xl bg-secondary p-8 md:h-fit"
    >
      <h2 className="text-3xl text-primary">Create new note</h2>
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
        iconSrc="images/person.svg"
        name="title"
        control={control}
        placeholder="Title"
      />
      <FormInput
        iconSrc="images/person.svg"
        name="content"
        control={control}
        placeholder="Content"
      />
      <FormColorPicker control={control} name="background" />
      <SubmitButton isSubmitting={isSubmitting} title="Create" />
    </form>
  );
}
