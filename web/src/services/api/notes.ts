import { Note, NoteWithoutId } from "@/common/types";
import { api } from "@/services/api/instance";

interface ApiResponse<T> {
  message: string;
  note: T;
}

export async function fetchNotes() {
  const response = await api.get<Note[]>("/notes/");
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

export async function deleteNote(note: Note) {
  const response = await api.delete<ApiResponse<Note>>(`/notes/${note._id}`);
  return response.data;
}
