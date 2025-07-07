"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SleepIntakeData } from "../SleepIntakeForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Section7Props {
  form: UseFormReturn<SleepIntakeData>;
}

export function Section7ChronotypeShiftWork({ form }: Section7Props) {
  const { register, watch, setValue } = form;
  const shiftWork = watch("shiftWork");

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Are you naturally more of a morning person or evening person?</Label>
        <RadioGroup
          onValueChange={(value) => setValue("morningEvening", value as "morning" | "evening" | "neither")}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="morning" id="morning" />
            <Label htmlFor="morning">Morning person (early to bed, early to rise)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="evening" id="evening" />
            <Label htmlFor="evening">Evening person (late to bed, late to rise)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="neither" id="neither" />
            <Label htmlFor="neither">Neither strongly morning nor evening</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="shiftWork"
          {...register("shiftWork")}
        />
        <Label htmlFor="shiftWork">
          Do you work shift work or irregular hours?
        </Label>
      </div>

      {shiftWork && (
        <div className="space-y-2">
          <Label htmlFor="shiftSchedule">
            Please describe your shift schedule
          </Label>
          <Input
            id="shiftSchedule"
            {...register("shiftSchedule")}
            placeholder="e.g., rotating 12-hour shifts, night shift 11pm-7am"
          />
        </div>
      )}
    </div>
  );
}
