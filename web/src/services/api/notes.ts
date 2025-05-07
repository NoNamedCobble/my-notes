import {
  ApiResponse,
  Note,
  NoteWithoutId,
  PaginatedNotes,
} from "@/common/types";
import { api } from "@/services/api/instance";

interface NotesApiResponse<T> extends ApiResponse {
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
  const response = await api.post<NotesApiResponse<Note>>("/notes/", note);
  return response.data;
}

export async function updateNote(note: Note) {
  const response = await api.put<NotesApiResponse<Note>>(
    `/notes/${note._id}`,
    note,
  );
  return response.data;
}

export async function deleteNote(id: string) {
  const response = await api.delete<NotesApiResponse<Note>>(`/notes/${id}`);
  return response.data;
}
