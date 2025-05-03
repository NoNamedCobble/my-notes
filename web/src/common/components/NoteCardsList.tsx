"use client";
import NoteCard from "@/common/components/NoteCard";
import { useNotes } from "@/common/hooks/useNotes";
import { Note } from "@/common/types";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function NoteCardsList() {
  const { notesQuery } = useNotes();

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const { data, isLoading, fetchNextPage } = notesQuery();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isLoading) {
    return;
  }

  return (
    <main className="grid grid-cols-2 gap-4 p-2 md:grid-cols-3 md:gap-8 md:px-8 lg:grid-cols-4 lg:px-20">
      <AnimatePresence>
        {data &&
          data.pages.map(({ notes }) =>
            notes.map((note: Note) => <NoteCard key={note._id} {...note} />),
          )}
      </AnimatePresence>
      <div ref={ref}></div>
    </main>
  );
}
