import { api } from "@/services/api/instance";
import { NoteProps, NoteData } from "@/common/types";

export async function getNotes(): Promise<NoteProps[]> {
  const response = await api.get<NoteProps[]>("/notes/");
  return response.data;
}

export async function addNote(note: NoteData) {
  const response = await api.post("/notes/", note);
  return response.data;
}

export async function updateNote(note: NoteProps) {
  const response = await api.put(`/notes/${note._id}`, note);
  return response.data;
}
