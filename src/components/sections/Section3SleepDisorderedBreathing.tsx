"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SleepIntakeData } from "../SleepIntakeForm";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface Section3Props {
  form: UseFormReturn<SleepIntakeData>;
}

export function Section3SleepDisorderedBreathing({ form }: Section3Props) {
  const { register, watch, setValue } = form;
  const snoring = watch("snoring");
  const snoringLoudness = watch("snoringLoudness") || 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="snoring"
          {...register("snoring")}
        />
        <Label htmlFor="snoring">
          Do you snore regularly?
        </Label>
      </div>

      {snoring && (
        <div className="space-y-2">
          <Label htmlFor="snoringLoudness">
            How loud is your snoring? (1 = barely audible, 10 = very loud)
          </Label>
          <div className="px-3">
            <Slider
              value={[snoringLoudness]}
              onValueChange={(value) => setValue("snoringLoudness", value[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>1 - Barely audible</span>
              <span className="font-medium">{snoringLoudness}</span>
              <span>10 - Very loud</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Checkbox
          id="breathingPauses"
          {...register("breathingPauses")}
        />
        <Label htmlFor="breathingPauses">
          Has anyone observed you stop breathing during sleep?
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="gaspingAwake"
          {...register("gaspingAwake")}
        />
        <Label htmlFor="gaspingAwake">
          Do you wake up gasping or choking?
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="morningHeadaches"
          {...register("morningHeadaches")}
        />
        <Label htmlFor="morningHeadaches">
          Do you frequently wake up with headaches?
        </Label>
      </div>
    </div>
  );
}
