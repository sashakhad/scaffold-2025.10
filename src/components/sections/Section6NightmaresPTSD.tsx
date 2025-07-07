"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SleepIntakeData } from "../SleepIntakeForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface Section6Props {
  form: UseFormReturn<SleepIntakeData>;
}

export function Section6NightmaresPTSD({ form }: Section6Props) {
  const { register, watch } = form;
  const nightmares = watch("nightmares");

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="nightmares"
          {...register("nightmares")}
        />
        <Label htmlFor="nightmares">
          Do you experience frequent nightmares?
        </Label>
      </div>

      {nightmares && (
        <div className="space-y-2">
          <Label htmlFor="nightmareFrequency">
            How many nights per week do you have nightmares?
          </Label>
          <Input
            id="nightmareFrequency"
            type="number"
            min="0"
            max="7"
            {...register("nightmareFrequency", { valueAsNumber: true })}
            placeholder="0"
          />
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Checkbox
          id="ptsdSymptoms"
          {...register("ptsdSymptoms")}
        />
        <Label htmlFor="ptsdSymptoms">
          Do you experience symptoms related to trauma or PTSD that affect your sleep?
        </Label>
      </div>
    </div>
  );
}
