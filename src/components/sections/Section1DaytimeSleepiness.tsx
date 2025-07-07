"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SleepIntakeData } from "../SleepIntakeForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface Section1Props {
  form: UseFormReturn<SleepIntakeData>;
}

export function Section1DaytimeSleepiness({ form }: Section1Props) {
  const { register, watch, setValue } = form;
  const daytimeSleepiness = watch("daytimeSleepiness") || 0;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="daytimeSleepiness">
          How sleepy do you feel during the day? (0 = not sleepy, 24 = extremely sleepy)
        </Label>
        <div className="px-3">
          <Slider
            value={[daytimeSleepiness]}
            onValueChange={(value) => setValue("daytimeSleepiness", value[0])}
            max={24}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>0 - Not sleepy</span>
            <span className="font-medium">{daytimeSleepiness}</span>
            <span>24 - Extremely sleepy</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="napsPerWeek">How many naps do you take per week?</Label>
        <Input
          id="napsPerWeek"
          type="number"
          min="0"
          max="21"
          {...register("napsPerWeek", { valueAsNumber: true })}
          placeholder="0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="napDuration">Average nap duration (minutes)</Label>
        <Input
          id="napDuration"
          type="number"
          min="0"
          max="240"
          {...register("napDuration", { valueAsNumber: true })}
          placeholder="30"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="fallAsleepDriving"
          {...register("fallAsleepDriving")}
        />
        <Label htmlFor="fallAsleepDriving">
          Have you ever fallen asleep while driving or had to pull over due to sleepiness?
        </Label>
      </div>
    </div>
  );
}
