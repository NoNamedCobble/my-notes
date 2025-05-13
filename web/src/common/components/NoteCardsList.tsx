"use client";
import NoteCard from "@/common/components/NoteCard";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useNotesQuery } from "../hooks/useNotesHooks";

export default function NoteCardsList() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const { data, isLoading, fetchNextPage } = useNotesQuery();

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
            notes.map((note) => <NoteCard key={note._id} {...note} />),
          )}
      </AnimatePresence>
      <div ref={ref}></div>
    </main>
  );
}
