import {
  ApiErrorResponse,
  Note,
  NoteWithoutId,
  PaginatedNotes,
} from "@/common/types";
import {
  createNote,
  deleteNote,
  fetchNotes,
  updateNote,
} from "@/services/api/notes";
import { useSearchStore } from "@/store/useSearchStore";
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";

type NotesInfinityData = InfiniteData<PaginatedNotes>;
export const useNotes = () => {
  const queryClient = useQueryClient();
  const { searchValue } = useSearchStore();

  const handleError = (error: ApiErrorResponse) => {
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage);
  };

  const notesQuery = () =>
    useInfiniteQuery({
      queryKey: ["notes", searchValue],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => fetchNotes({ pageParam, searchValue }),
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const createMutation = useMutation({
    mutationFn: (note: NoteWithoutId) => createNote(note),
    onError: handleError,
    onSuccess: ({ note, message }) => {
      queryClient.setQueryData<NotesInfinityData>(
        ["notes", searchValue],
        (oldData) => {
          if (!oldData) return oldData;

          const firstPage = oldData.pages[0];
          const remainingPages = oldData.pages.slice(1);
          if (firstPage) {
            return {
              ...oldData,
              pages: [
                {
                  ...firstPage,
                  notes: [note, ...firstPage.notes],
                },
                ...remainingPages,
              ],
            };
          }
        },
      );

      toast.success(message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (note: Note) => updateNote(note),
    onError: handleError,
    onSuccess: ({ note, message }) => {
      queryClient.setQueryData<NotesInfinityData>(
        ["notes", searchValue],
        (oldData) => {
          if (!oldData) return oldData;

          const updatedPages = oldData.pages.map((page) => ({
            ...page,
            notes: page.notes.map((oldNote) =>
              oldNote._id === note._id ? note : oldNote,
            ),
          }));

          return {
            ...oldData,
            pages: updatedPages,
          };
        },
      );

      toast.success(message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onError: handleError,
    onSuccess: ({ note, message }) => {
      queryClient.setQueryData<NotesInfinityData>(
        ["notes", searchValue],
        (oldData) => {
          if (!oldData) return oldData;

          const updatedPages = oldData.pages.map((page) => ({
            ...page,
            notes: page.notes.filter((n) => n._id !== note._id),
          }));

          return {
            ...oldData,
            pages: updatedPages,
          };
        },
      );
      toast.success(message);
    },
  });

  return {
    notesQuery,
    createNote: createMutation.mutate,
    updateNote: updateMutation.mutate,
    deleteNote: deleteMutation.mutate,
  };
};
