"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SleepIntakeData } from "../SleepIntakeForm";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Section5Props {
  form: UseFormReturn<SleepIntakeData>;
}

export function Section5Parasomnias({ form }: Section5Props) {
  const { register } = form;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="sleepwalking"
          {...register("sleepwalking")}
        />
        <Label htmlFor="sleepwalking">
          Do you sleepwalk or have episodes of complex behavior during sleep?
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="sleepTalking"
          {...register("sleepTalking")}
        />
        <Label htmlFor="sleepTalking">
          Do you talk in your sleep frequently?
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="nightTerrors"
          {...register("nightTerrors")}
        />
        <Label htmlFor="nightTerrors">
          Do you experience night terrors or sudden awakening with intense fear?
        </Label>
      </div>
    </div>
  );
}
