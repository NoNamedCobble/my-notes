"use client";
import { NoteProps } from "@/common/types";
import { AnimatePresence } from "framer-motion";

import Note from "@/common/components/Note";

type NotesProps = {
  searchValue: string;
  notes: NoteProps[];
};

export default function Notes({ searchValue, notes }: NotesProps) {
  const filterNotes = (notes: NoteProps[]) =>
    notes.filter(({ title, content }) =>
      (title + content).toLowerCase().includes(searchValue.toLowerCase()),
    );
  return (
    <main className="grid grid-cols-2 gap-4 p-2 md:grid-cols-3 md:gap-8 md:px-8 lg:grid-cols-4 lg:px-20">
      <AnimatePresence>
        {filterNotes(notes).map(({ _id, title, content }) => (
          <Note key={_id} _id={_id} title={title} content={content} />
        ))}
      </AnimatePresence>
    </main>
  );
}
