"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SleepIntakeData } from "../SleepIntakeForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Section2Props {
  form: UseFormReturn<SleepIntakeData>;
}

export function Section2SleepPatterns({ form }: Section2Props) {
  const { register } = form;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="weekday" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="weekday">Weekday Schedule</TabsTrigger>
          <TabsTrigger value="weekend">Weekend Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekday" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weekdayBedtime">Typical bedtime</Label>
              <Input
                id="weekdayBedtime"
                type="time"
                {...register("weekdayBedtime")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weekdayWakeTime">Typical wake time</Label>
              <Input
                id="weekdayWakeTime"
                type="time"
                {...register("weekdayWakeTime")}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weekdaySOL">
                Sleep Onset Latency (minutes to fall asleep)
              </Label>
              <Input
                id="weekdaySOL"
                type="number"
                min="0"
                max="180"
                {...register("weekdaySOL", { valueAsNumber: true })}
                placeholder="15"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weekdayWASO">
                Wake After Sleep Onset (minutes awake during night)
              </Label>
              <Input
                id="weekdayWASO"
                type="number"
                min="0"
                max="480"
                {...register("weekdayWASO", { valueAsNumber: true })}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weekdayNightWakings">
                Number of night wakings
              </Label>
              <Input
                id="weekdayNightWakings"
                type="number"
                min="0"
                max="20"
                {...register("weekdayNightWakings", { valueAsNumber: true })}
                placeholder="0"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="weekend" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weekendBedtime">Typical bedtime</Label>
              <Input
                id="weekendBedtime"
                type="time"
                {...register("weekendBedtime")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weekendWakeTime">Typical wake time</Label>
              <Input
                id="weekendWakeTime"
                type="time"
                {...register("weekendWakeTime")}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weekendSOL">
                Sleep Onset Latency (minutes to fall asleep)
              </Label>
              <Input
                id="weekendSOL"
                type="number"
                min="0"
                max="180"
                {...register("weekendSOL", { valueAsNumber: true })}
                placeholder="15"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weekendWASO">
                Wake After Sleep Onset (minutes awake during night)
              </Label>
              <Input
                id="weekendWASO"
                type="number"
                min="0"
                max="480"
                {...register("weekendWASO", { valueAsNumber: true })}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weekendNightWakings">
                Number of night wakings
              </Label>
              <Input
                id="weekendNightWakings"
                type="number"
                min="0"
                max="20"
                {...register("weekendNightWakings", { valueAsNumber: true })}
                placeholder="0"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
