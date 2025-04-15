"use client";
import React, { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Control, useController, Controller } from "react-hook-form";
import { ComponentProps } from "react";

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
          <div className="flex flex-col gap-2">
            <HexColorPicker
              {...props}
              color={field.value}
              onChange={(color) => field.onChange(color)}
            />
            <HexColorInput
              color={field.value}
              onChange={(color) => field.onChange(color)}
              prefixed
              className="px-2 py-1 rounded-lg bg-input-gradient shadow-custom-blue"
            />
          </div>
        )}
      />
    </>
  );
}
