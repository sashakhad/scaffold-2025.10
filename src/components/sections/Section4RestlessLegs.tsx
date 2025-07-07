"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SleepIntakeData } from "../SleepIntakeForm";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Section4Props {
  form: UseFormReturn<SleepIntakeData>;
}

export function Section4RestlessLegs({ form }: Section4Props) {
  const { register, watch } = form;
  const legDiscomfort = watch("legDiscomfort");

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="legDiscomfort"
          {...register("legDiscomfort")}
        />
        <Label htmlFor="legDiscomfort">
          Do you experience uncomfortable sensations in your legs when trying to sleep?
        </Label>
      </div>

      {legDiscomfort && (
        <>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="legDiscomfortEvening"
              {...register("legDiscomfortEvening")}
            />
            <Label htmlFor="legDiscomfortEvening">
              Do these sensations worsen in the evening or at night?
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="legDiscomfortRelief"
              {...register("legDiscomfortRelief")}
            />
            <Label htmlFor="legDiscomfortRelief">
              Do these sensations improve with movement (walking, stretching)?
            </Label>
          </div>
        </>
      )}
    </div>
  );
}
