import { Note, NoteWithoutId, PaginatedNotes } from "@/common/types";
import { api } from "@/services/api/instance";

interface ApiResponse<T> {
  message: string;
  note: T;
}

type FetchNotesProps = {
  pageParam: number;
  searchValue: string;
};
export async function fetchNotes({
  pageParam = 1,
  searchValue = "",
}: FetchNotesProps) {
  const response = await api.get<PaginatedNotes>(
    `/notes?page=${pageParam}&search=${searchValue}`,
  );
  return response.data;
}

export async function createNote(note: NoteWithoutId) {
  const response = await api.post<ApiResponse<Note>>("/notes/", note);
  return response.data;
}

export async function updateNote(note: Note) {
  const response = await api.put<ApiResponse<Note>>(`/notes/${note._id}`, note);
  return response.data;
}

export async function deleteNote(id: string) {
  const response = await api.delete<ApiResponse<Note>>(`/notes/${id}`);
  return response.data;
}
