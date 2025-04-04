import { api } from "@/services/api/instance";
import { NoteProps } from "@/common/types";

export async function getNotes(): Promise<NoteProps[]> {
  const response = await api.get<NoteProps[]>("/notes/");
  return response.data;
}
