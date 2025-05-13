"use client";
import { ComponentProps } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export interface FormColorPickerProps<T extends FieldValues>
  extends ComponentProps<typeof HexColorPicker> {
  control: Control<T>;
  name: Path<T>;
}

export default function FormColorPicker<T extends FieldValues>({
  control,
  name,
  ...props
}: FormColorPickerProps<T>) {
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
