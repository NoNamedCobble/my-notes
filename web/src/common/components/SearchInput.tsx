import { useSearchStore } from "@/store/useSearchStore";
import Image from "next/image";
import { useState } from "react";

export default function SearchInput() {
  const { searchValue, setSearchValue } = useSearchStore();
  const [placeholder, setPlaceholder] = useState("Search notes...");

  const placeholders = [
    "Write your note here...",
    "What's on your mind?",
    "Add a new note...",
    "Thoughts for today...",
    "Take a note...",
    "What's the plan?",
    "Quick reminder...",
    "Search notes...",
  ];

  return (
    <div role="search" className="flex w-full items-center">
      <Image
        src="images/search.svg"
        alt="Search input"
        className="absolute ml-4 opacity-50"
        width={20}
        height={20}
      />
      <input
        type="search"
        className="h-full w-full rounded-full bg-secondary px-10 text-lg"
        placeholder={placeholder}
        aria-label="Search notes"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
    </div>
  );
}
