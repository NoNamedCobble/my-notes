import { useSearchStore } from "@/store/useSearchStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const DELAY = 400;
export default function SearchInput() {
  const { setSearchValue } = useSearchStore();
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue] = useDebounce(inputValue, DELAY);

  useEffect(() => {
    setSearchValue(debouncedValue);
  }, [debouncedValue, setSearchValue]);

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
        placeholder="Search notes..."
        aria-label="Search notes"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
    </div>
  );
}
