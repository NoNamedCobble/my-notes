import { Note, NoteWithoutId } from "@/common/types";
import {
  createNote,
  deleteNote,
  fetchNotes,
  updateNote,
} from "@/services/api/notes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useNotes = () => {
  const queryClient = useQueryClient();

  const notesQuery = () =>
    useQuery({ queryKey: ["notes"], queryFn: fetchNotes });

  const createMutation = useMutation({
    mutationFn: (note: NoteWithoutId) => createNote(note),
    onSuccess: (response) => {
      const { _id, title, content, background } = response.note;
      queryClient.setQueryData(["notes"], (oldNotes: Note[]) => {
        return [...oldNotes, { _id, title, content, background }];
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (note: Note) => updateNote(note),
    onSuccess: (response) => {
      const { _id, title, content, background } = response.note;
      queryClient.setQueryData(["notes"], (oldNotes: Note[]) => {
        return oldNotes.map((note) =>
          note._id === _id ? { _id, title, content, background } : note,
        );
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: (response) => {
      const { _id } = response.note;
      queryClient.setQueryData(["notes"], (oldNotes: Note[]) => {
        return oldNotes.filter((note) => note._id !== _id);
      });
    },
  });

  return {
    notesQuery,
    createNote: createMutation.mutate,
    updateNote: updateMutation.mutate,
    deleteNote: deleteMutation.mutate,
  };
};
