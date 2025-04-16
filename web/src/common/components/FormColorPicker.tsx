"use client";
import { ComponentProps } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { Control, Controller } from "react-hook-form";

type FormColorPickerProps = ComponentProps<typeof HexColorPicker> & {
  control: Control<any>;
  name: string;
};

export default function FormColorPicker({
  control,
  name,
  ...props
}: FormColorPickerProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex h-52 w-2/5 flex-col gap-2">
            <HexColorPicker
              {...props}
              className="!h-full !w-full"
              color={field.value}
              onChange={(color) => field.onChange(color)}
            />
            <HexColorInput
              color={field.value}
              onChange={(color) => field.onChange(color)}
              prefixed
              className="rounded-lg bg-input-gradient px-2 py-1 shadow-custom-blue"
            />
          </div>
        )}
      />
    </>
  );
}
