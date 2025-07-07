"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SleepIntakeData } from "../SleepIntakeForm";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface Section10Props {
  form: UseFormReturn<SleepIntakeData>;
}

export function Section10MentalHealth({ form }: Section10Props) {
  const { watch, setValue } = form;
  const anxiety = watch("anxiety") || 0;
  const depression = watch("depression") || 0;
  const stress = watch("stress") || 0;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="anxiety">
          How would you rate your anxiety levels? (0 = no anxiety, 10 = severe anxiety)
        </Label>
        <div className="px-3">
          <Slider
            value={[anxiety]}
            onValueChange={(value) => setValue("anxiety", value[0])}
            max={10}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>0 - No anxiety</span>
            <span className="font-medium">{anxiety}</span>
            <span>10 - Severe anxiety</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="depression">
          How would you rate your depression levels? (0 = no depression, 10 = severe depression)
        </Label>
        <div className="px-3">
          <Slider
            value={[depression]}
            onValueChange={(value) => setValue("depression", value[0])}
            max={10}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>0 - No depression</span>
            <span className="font-medium">{depression}</span>
            <span>10 - Severe depression</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stress">
          How would you rate your stress levels? (0 = no stress, 10 = severe stress)
        </Label>
        <div className="px-3">
          <Slider
            value={[stress]}
            onValueChange={(value) => setValue("stress", value[0])}
            max={10}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>0 - No stress</span>
            <span className="font-medium">{stress}</span>
            <span>10 - Severe stress</span>
          </div>
        </div>
      </div>
    </div>
  );
}
