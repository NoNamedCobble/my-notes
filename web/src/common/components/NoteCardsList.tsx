"use client";
import NoteCard from "@/common/components/NoteCard";
import { useNotes } from "@/common/hooks/useNotes";
import { Note } from "@/common/types";
import { useSearchStore } from "@/store/useSearchStore";
import { AnimatePresence } from "framer-motion";

export default function NoteCardsList() {
  const { notesQuery } = useNotes();
  const { searchValue } = useSearchStore();

  const { data, error, isLoading } = notesQuery();

  const filteredNotes = (notes: Note[]) =>
    notes.filter(
      ({ title, content }) =>
        title.toLowerCase().includes(searchValue.toLowerCase()) ||
        content.toLowerCase().includes(searchValue.toLowerCase()),
    );

  return (
    <main className="grid grid-cols-2 gap-4 p-2 md:grid-cols-3 md:gap-8 md:px-8 lg:grid-cols-4 lg:px-20">
      <AnimatePresence>
        {data &&
          filteredNotes(data).map(({ _id, title, content, background }) => (
            <NoteCard
              key={_id}
              _id={_id}
              title={title}
              content={content}
              background={background}
            />
          ))}
      </AnimatePresence>
    </main>
  );
}
