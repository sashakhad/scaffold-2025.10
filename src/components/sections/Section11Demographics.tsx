"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SleepIntakeData } from "../SleepIntakeForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Section11Props {
  form: UseFormReturn<SleepIntakeData>;
}

export function Section11Demographics({ form }: Section11Props) {
  const { register, setValue } = form;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          min="18"
          max="120"
          {...register("age", { valueAsNumber: true })}
          placeholder="25"
        />
      </div>

      <div className="space-y-3">
        <Label>Gender</Label>
        <RadioGroup
          onValueChange={(value) => setValue("gender", value as "male" | "female" | "other" | "prefer_not_to_say")}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other_gender" />
            <Label htmlFor="other_gender">Other</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="prefer_not_to_say" id="prefer_not_to_say" />
            <Label htmlFor="prefer_not_to_say">Prefer not to say</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="zipCode">Zip Code</Label>
        <Input
          id="zipCode"
          {...register("zipCode")}
          placeholder="12345"
          maxLength={10}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="height">Height (inches)</Label>
          <Input
            id="height"
            type="number"
            min="36"
            max="96"
            {...register("height", { valueAsNumber: true })}
            placeholder="70"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (lbs)</Label>
          <Input
            id="weight"
            type="number"
            min="50"
            max="500"
            {...register("weight", { valueAsNumber: true })}
            placeholder="150"
          />
        </div>
      </div>
    </div>
  );
}
