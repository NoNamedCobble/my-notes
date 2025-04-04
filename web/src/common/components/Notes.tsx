"use client";
import { getNotes } from "@/services/api/notes";
import Note from "@/common/components/Note";
import { NoteProps } from "@/common/types";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";

type NotesProps = {
  searchValue: string;
};

export default function Notes({ searchValue }: NotesProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: () => getNotes(),
  });

  const filteredNotes = (notes: NoteProps[]) =>
    notes.filter(
      ({ title, content }) =>
        title.toLowerCase().includes(searchValue.toLowerCase()) ||
        content.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <main className="grid grid-cols-2 gap-4 p-2 md:grid-cols-3 md:gap-8 md:px-8 lg:grid-cols-4 lg:px-20">
      <AnimatePresence>
        {data &&
          filteredNotes(data).map(({ _id, title, content }) => (
            <Note key={_id} _id={_id} title={title} content={content} />
          ))}
      </AnimatePresence>
    </main>
  );
}
