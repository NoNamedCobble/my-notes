"use client";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Control, useController, Controller } from "react-hook-form";
import { ComponentProps } from "react";

type FormColorPickerProps = {
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
          <HexColorPicker
            color={field.value ?? "#ffffff"}
            onChange={(color) => field.onChange(color)}
          />
        )}
      />
    </>
  );
}
