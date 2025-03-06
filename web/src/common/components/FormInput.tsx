import Image from "next/image";

type InputProps = {
  title: string;
  type: "text" | "password" | "email" | "number";
  iconSrc: string;
  isRequired?: boolean;
};

export default function Input({
  title,
  type,
  iconSrc,
  isRequired = false,
}: InputProps) {
  return (
    <label
      htmlFor={title}
      className="my-2 flex h-11 w-full overflow-hidden rounded-full bg-input-gradient pl-6 shadow-custom-blue"
    >
      <Image src={iconSrc} alt={title} width="22" height="15" unoptimized />
      <input
        placeholder={title}
        id={title}
        type={type}
        aria-label={title}
        required={isRequired}
        className="mx-2 w-full bg-transparent text-lg capitalize"
      />
    </label>
  );
}
