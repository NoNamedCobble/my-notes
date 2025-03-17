"use client";
import { NoteProps } from "@/common/types";
import api from "@/common/utils/axios";
import { AnimatePresence } from "framer-motion";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";

import Note from "@/common/components/Note";

type NotesProps = {
  searchValue: string;
};

export default function Notes({ searchValue }: NotesProps) {
  const [notes, setNotes] = useState<NoteProps[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("notes/");
        if (response.status === StatusCodes.OK) {
          setNotes(response.data);
        }
      } catch (err) {
        console.log("GetNotesError: ", err);
      }
    };

    fetchNotes();
  }, []);
  return (
    <main className="grid grid-cols-2 gap-4 p-2 md:grid-cols-3 md:gap-8 md:px-8 lg:grid-cols-4 lg:px-20">
      <AnimatePresence>
        {notes
          .filter(({ title, content }) =>
            (title + content).toLowerCase().includes(searchValue.toLowerCase()),
          )
          .map(({ _id, title, content }) => (
            <Note key={_id} _id={_id} title={title} content={content} />
          ))}
      </AnimatePresence>
    </main>
  );
}
