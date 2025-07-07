"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SleepIntakeData } from "../SleepIntakeForm";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Section9Props {
  form: UseFormReturn<SleepIntakeData>;
}

export function Section9BedroomEnvironment({ form }: Section9Props) {
  const { register, watch, setValue } = form;
  const roomTemperature = watch("roomTemperature") || 70;
  const roomNoise = watch("roomNoise") || 1;
  const roomLight = watch("roomLight") || 1;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="roomTemperature">
          What temperature do you keep your bedroom? (°F)
        </Label>
        <div className="px-3">
          <Slider
            value={[roomTemperature]}
            onValueChange={(value) => setValue("roomTemperature", value[0])}
            max={85}
            min={60}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>60°F - Cold</span>
            <span className="font-medium">{roomTemperature}°F</span>
            <span>85°F - Hot</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="roomNoise">
          How noisy is your bedroom environment? (1 = very quiet, 10 = very noisy)
        </Label>
        <div className="px-3">
          <Slider
            value={[roomNoise]}
            onValueChange={(value) => setValue("roomNoise", value[0])}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>1 - Very quiet</span>
            <span className="font-medium">{roomNoise}</span>
            <span>10 - Very noisy</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="roomLight">
          How much light enters your bedroom at night? (1 = very dark, 10 = very bright)
        </Label>
        <div className="px-3">
          <Slider
            value={[roomLight]}
            onValueChange={(value) => setValue("roomLight", value[0])}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>1 - Very dark</span>
            <span className="font-medium">{roomLight}</span>
            <span>10 - Very bright</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label>What type of mattress do you sleep on?</Label>
        <RadioGroup
          onValueChange={(value) => setValue("mattressType", value as "firm" | "medium" | "soft" | "memory_foam" | "other")}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="firm" id="firm" />
            <Label htmlFor="firm">Firm</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="soft" id="soft" />
            <Label htmlFor="soft">Soft</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="memory_foam" id="memory_foam" />
            <Label htmlFor="memory_foam">Memory foam</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other">Other</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="sleepAlone"
          {...register("sleepAlone")}
        />
        <Label htmlFor="sleepAlone">
          Do you sleep alone?
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="petsInBed"
          {...register("petsInBed")}
        />
        <Label htmlFor="petsInBed">
          Do pets sleep in your bed?
        </Label>
      </div>
    </div>
  );
}
