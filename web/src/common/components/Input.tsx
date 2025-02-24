import Image from "next/image";

type InputProps = {
  title: string;
  iconSrc: string;
};

export default function Input({ title, iconSrc }: InputProps) {
  return (
    <label
      htmlFor={title}
      className="bg-input-gradient w-full h-[50px] rounded-full my-4 pl-8 flex shadow-custom-blue overflow-hidden"
    >
      <Image src={iconSrc} alt={title} width="25" height="20" />
      <input
        placeholder={title}
        id={title}
        className="ml-3 text-[1.6rem] bg-transparent w-full outline-none capitalize "
      />
    </label>
  );
}
