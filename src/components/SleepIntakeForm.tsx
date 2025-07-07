"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Section1DaytimeSleepiness } from "./sections/Section1DaytimeSleepiness";
import { Section2SleepPatterns } from "./sections/Section2SleepPatterns";
import { Section3SleepDisorderedBreathing } from "./sections/Section3SleepDisorderedBreathing";
import { Section4RestlessLegs } from "./sections/Section4RestlessLegs";
import { Section5Parasomnias } from "./sections/Section5Parasomnias";
import { Section6NightmaresPTSD } from "./sections/Section6NightmaresPTSD";
import { Section7ChronotypeShiftWork } from "./sections/Section7ChronotypeShiftWork";
import { Section8SleepHygiene } from "./sections/Section8SleepHygiene";
import { Section9BedroomEnvironment } from "./sections/Section9BedroomEnvironment";
import { Section10MentalHealth } from "./sections/Section10MentalHealth";
import { Section11Demographics } from "./sections/Section11Demographics";
import { SleepReport } from "./SleepReport";

const sleepIntakeSchema = z.object({
  daytimeSleepiness: z.number().min(0).max(24),
  napsPerWeek: z.number().min(0),
  napDuration: z.number().min(0),
  fallAsleepDriving: z.boolean(),
  
  weekdayBedtime: z.string(),
  weekdayWakeTime: z.string(),
  weekdaySOL: z.number().min(0),
  weekdayWASO: z.number().min(0),
  weekdayNightWakings: z.number().min(0),
  weekendBedtime: z.string(),
  weekendWakeTime: z.string(),
  weekendSOL: z.number().min(0),
  weekendWASO: z.number().min(0),
  weekendNightWakings: z.number().min(0),
  
  snoring: z.boolean(),
  snoringLoudness: z.number().min(1).max(10).optional(),
  breathingPauses: z.boolean(),
  gaspingAwake: z.boolean(),
  morningHeadaches: z.boolean(),
  
  legDiscomfort: z.boolean(),
  legDiscomfortEvening: z.boolean().optional(),
  legDiscomfortRelief: z.boolean().optional(),
  
  sleepwalking: z.boolean(),
  sleepTalking: z.boolean(),
  nightTerrors: z.boolean(),
  
  nightmares: z.boolean(),
  nightmareFrequency: z.number().min(0).max(7).optional(),
  ptsdSymptoms: z.boolean(),
  
  morningEvening: z.enum(["morning", "evening", "neither"]),
  shiftWork: z.boolean(),
  shiftSchedule: z.string().optional(),
  
  caffeine: z.boolean(),
  caffeineTime: z.string().optional(),
  alcohol: z.boolean(),
  alcoholTime: z.string().optional(),
  nicotine: z.boolean(),
  sleepMedications: z.boolean(),
  sleepMedicationsList: z.string().optional(),
  
  roomTemperature: z.number().min(60).max(85),
  roomNoise: z.number().min(1).max(10),
  roomLight: z.number().min(1).max(10),
  mattressType: z.enum(["firm", "medium", "soft", "memory_foam", "other"]).optional(),
  sleepAlone: z.boolean(),
  petsInBed: z.boolean(),
  
  anxiety: z.number().min(0).max(10),
  depression: z.number().min(0).max(10),
  stress: z.number().min(0).max(10),
  
  age: z.number().min(18).max(120),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
  zipCode: z.string().min(5).max(10),
  weight: z.number().min(50).max(500),
  height: z.number().min(48).max(96),
});

export type SleepIntakeData = z.infer<typeof sleepIntakeSchema>;

const sections = [
  { title: "Daytime Sleepiness & Naps", component: Section1DaytimeSleepiness },
  { title: "Sleep Patterns", component: Section2SleepPatterns },
  { title: "Sleep-Disordered Breathing", component: Section3SleepDisorderedBreathing },
  { title: "Restless Legs Syndrome", component: Section4RestlessLegs },
  { title: "Parasomnias", component: Section5Parasomnias },
  { title: "Nightmares & PTSD", component: Section6NightmaresPTSD },
  { title: "Chronotype & Shift Work", component: Section7ChronotypeShiftWork },
  { title: "Sleep Hygiene", component: Section8SleepHygiene },
  { title: "Bedroom Environment", component: Section9BedroomEnvironment },
  { title: "Mental Health & Anxiety", component: Section10MentalHealth },
  { title: "Demographics", component: Section11Demographics },
];

export function SleepIntakeForm() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const form = useForm<SleepIntakeData>({
    resolver: zodResolver(sleepIntakeSchema),
    mode: "onChange",
  });

  const progress = ((currentSection + 1) / sections.length) * 100;

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const onSubmit = (data: SleepIntakeData) => {
    console.log("Form submitted:", data);
    setIsComplete(true);
  };

  if (isComplete) {
    return <SleepReport data={form.getValues()} />;
  }

  const CurrentSectionComponent = sections[currentSection].component;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Section {currentSection + 1} of {sections.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{sections[currentSection].title}</CardTitle>
          <CardDescription>
            Please answer all questions in this section to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CurrentSectionComponent form={form} />
            
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevSection}
                disabled={currentSection === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              {currentSection === sections.length - 1 ? (
                <Button type="submit">
                  Complete Assessment
                </Button>
              ) : (
                <Button type="button" onClick={nextSection}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
