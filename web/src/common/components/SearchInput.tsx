import { useSearchStore } from "@/store/useSearchStore";
import Image from "next/image";
import { ComponentProps, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const DELAY = 400;

type SearchInputProps = ComponentProps<"input">;

export default function SearchInput(props: SearchInputProps) {
  const { setSearchValue } = useSearchStore();
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue] = useDebounce(inputValue, DELAY);

  useEffect(() => {
    setSearchValue(debouncedValue);
  }, [debouncedValue, setSearchValue]);

  return (
    <div
      role="search"
      className="flex h-14 w-full max-w-screen-sm items-center text-black"
    >
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
        {...props}
      />
    </div>
  );
}
