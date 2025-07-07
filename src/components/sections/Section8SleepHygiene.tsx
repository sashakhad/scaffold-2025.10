"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SleepIntakeData } from "../SleepIntakeForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface Section8Props {
  form: UseFormReturn<SleepIntakeData>;
}

export function Section8SleepHygiene({ form }: Section8Props) {
  const { register, watch } = form;
  const caffeine = watch("caffeine");
  const alcohol = watch("alcohol");
  const sleepMedications = watch("sleepMedications");

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="caffeine"
          {...register("caffeine")}
        />
        <Label htmlFor="caffeine">
          Do you consume caffeine regularly?
        </Label>
      </div>

      {caffeine && (
        <div className="space-y-2">
          <Label htmlFor="caffeineTime">
            What time do you typically have your last caffeinated drink?
          </Label>
          <Input
            id="caffeineTime"
            type="time"
            {...register("caffeineTime")}
          />
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Checkbox
          id="alcohol"
          {...register("alcohol")}
        />
        <Label htmlFor="alcohol">
          Do you consume alcohol regularly?
        </Label>
      </div>

      {alcohol && (
        <div className="space-y-2">
          <Label htmlFor="alcoholTime">
            What time do you typically have your last alcoholic drink?
          </Label>
          <Input
            id="alcoholTime"
            type="time"
            {...register("alcoholTime")}
          />
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Checkbox
          id="nicotine"
          {...register("nicotine")}
        />
        <Label htmlFor="nicotine">
          Do you use nicotine products (cigarettes, vaping, etc.)?
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="sleepMedications"
          {...register("sleepMedications")}
        />
        <Label htmlFor="sleepMedications">
          Do you take sleep medications or supplements?
        </Label>
      </div>

      {sleepMedications && (
        <div className="space-y-2">
          <Label htmlFor="sleepMedicationsList">
            Please list your sleep medications/supplements and dosages
          </Label>
          <Textarea
            id="sleepMedicationsList"
            {...register("sleepMedicationsList")}
            placeholder="e.g., Melatonin 3mg, Ambien 10mg as needed"
            rows={3}
          />
        </div>
      )}
    </div>
  );
}
