"use client";

import React from "react";
import { SleepIntakeData } from "./SleepIntakeForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, Moon, Sun } from "lucide-react";

interface SleepReportProps {
  data: SleepIntakeData;
}

export function SleepReport({ data }: SleepReportProps) {
  const calculations = calculateSleepMetrics(data);
  const interpretations = interpretSleepData(data, calculations);

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleEmailReport = () => {
    const subject = "Sleep Assessment Report";
    const body = generateEmailBody(data, calculations, interpretations);
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Your Sleep Assessment Report</CardTitle>
          <CardDescription>
            Based on your responses, here's a personalized analysis of your sleep patterns
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Sleep Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Sleep Time</p>
                <p className="text-2xl font-bold">{calculations.totalSleepTime}h</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sleep Efficiency</p>
                <p className="text-2xl font-bold">{calculations.sleepEfficiency}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sleep Onset</p>
                <p className="text-2xl font-bold">{calculations.avgSOL} min</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Night Wakings</p>
                <p className="text-2xl font-bold">{calculations.avgWASO} min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="w-5 h-5" />
              Sleep Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Average Bedtime</p>
              <p className="text-lg font-semibold">{calculations.avgBedtime}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Wake Time</p>
              <p className="text-lg font-semibold">{calculations.avgWakeTime}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mid-Sleep Point</p>
              <p className="text-lg font-semibold">{calculations.midSleepPoint}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Potential Sleep Concerns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {interpretations.concerns.length === 0 ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>No major sleep concerns identified</span>
              </div>
            ) : (
              interpretations.concerns.map((concern, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Badge variant={concern.severity === 'high' ? 'destructive' : 'secondary'}>
                    {concern.severity}
                  </Badge>
                  <div>
                    <p className="font-medium">{concern.condition}</p>
                    <p className="text-sm text-muted-foreground">{concern.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="w-5 h-5" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {interpretations.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm">{rec}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-center">
        <Button onClick={handleDownloadPDF} variant="outline">
          Download PDF
        </Button>
        <Button onClick={handleEmailReport}>
          Email Report
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>
          <strong>Disclaimer:</strong> This report is for informational purposes only and should not replace professional medical advice. 
          Please consult with a healthcare provider or sleep specialist for proper diagnosis and treatment.
        </p>
      </div>
    </div>
  );
}

function calculateSleepMetrics(data: SleepIntakeData) {
  const weekdayBedtime = parseTime(data.weekdayBedtime);
  const weekdayWakeTime = parseTime(data.weekdayWakeTime);
  const weekendBedtime = parseTime(data.weekendBedtime);
  const weekendWakeTime = parseTime(data.weekendWakeTime);

  const avgBedtime = averageTime(weekdayBedtime, weekendBedtime);
  const avgWakeTime = averageTime(weekdayWakeTime, weekendWakeTime);
  const avgSOL = (data.weekdaySOL + data.weekendSOL) / 2;
  const avgWASO = (data.weekdayWASO + data.weekendWASO) / 2;

  const timeInBed = calculateTimeDifference(avgBedtime, avgWakeTime);
  const totalSleepTime = timeInBed - (avgSOL + avgWASO) / 60;
  const sleepEfficiency = Math.round((totalSleepTime / timeInBed) * 100);
  
  const midSleepPoint = calculateMidSleepPoint(avgBedtime, totalSleepTime);

  return {
    totalSleepTime: Math.round(totalSleepTime * 10) / 10,
    sleepEfficiency,
    avgSOL: Math.round(avgSOL),
    avgWASO: Math.round(avgWASO),
    avgBedtime: formatTime(avgBedtime),
    avgWakeTime: formatTime(avgWakeTime),
    midSleepPoint: formatTime(midSleepPoint),
    timeInBed: Math.round(timeInBed * 10) / 10
  };
}

function interpretSleepData(data: SleepIntakeData, calculations: any) {
  const concerns = [];
  const recommendations = [];

  if (calculations.avgSOL > 30 || calculations.avgWASO > 30 || (data.weekdayNightWakings + data.weekendNightWakings) / 2 > 3) {
    concerns.push({
      condition: "Possible Insomnia",
      severity: "high" as const,
      description: "You may be experiencing difficulty falling asleep, staying asleep, or both."
    });
    recommendations.push("Consider establishing a consistent bedtime routine and sleep schedule");
    recommendations.push("Avoid caffeine, alcohol, and screens before bedtime");
  }

  if (data.snoring && data.breathingPauses && data.gaspingAwake) {
    concerns.push({
      condition: "Possible Sleep Apnea",
      severity: "high" as const,
      description: "Your symptoms suggest you may have sleep-disordered breathing."
    });
    recommendations.push("Consult with a sleep specialist for a sleep study evaluation");
    recommendations.push("Consider weight management if applicable");
  }

  if (data.daytimeSleepiness > 15 || data.napsPerWeek > 3) {
    concerns.push({
      condition: "Excessive Daytime Sleepiness",
      severity: "medium" as const,
      description: "You may be experiencing excessive sleepiness during the day."
    });
    recommendations.push("Evaluate your nighttime sleep quality and duration");
  }

  if (data.legDiscomfort && data.legDiscomfortEvening && data.legDiscomfortRelief) {
    concerns.push({
      condition: "Possible Restless Legs Syndrome",
      severity: "medium" as const,
      description: "Your symptoms are consistent with restless legs syndrome."
    });
    recommendations.push("Discuss iron levels and RLS treatment options with your doctor");
  }

  const midSleepHour = parseTime(calculations.midSleepPoint);
  if (midSleepHour > 4) {
    concerns.push({
      condition: "Possible Delayed Sleep Phase Disorder",
      severity: "medium" as const,
      description: "Your sleep schedule may be significantly delayed compared to conventional times."
    });
    recommendations.push("Consider light therapy and gradual schedule adjustment");
  }

  if (calculations.sleepEfficiency < 85) {
    concerns.push({
      condition: "Poor Sleep Efficiency",
      severity: "medium" as const,
      description: "You may be spending too much time in bed relative to actual sleep time."
    });
    recommendations.push("Consider sleep restriction therapy under professional guidance");
  }

  recommendations.push("Maintain a consistent sleep schedule, even on weekends");
  recommendations.push("Create a comfortable sleep environment (cool, dark, quiet)");
  recommendations.push("Regular exercise can improve sleep quality, but avoid vigorous activity close to bedtime");

  if (data.anxiety > 7 || data.depression > 7 || data.stress > 7) {
    recommendations.push("Consider addressing mental health concerns, as they significantly impact sleep quality");
  }

  return { concerns, recommendations };
}

function parseTime(timeString: string): number {
  if (!timeString) return 0;
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours + minutes / 60;
}

function averageTime(time1: number, time2: number): number {
  return (time1 + time2) / 2;
}

function calculateTimeDifference(bedtime: number, wakeTime: number): number {
  if (wakeTime < bedtime) {
    return (24 - bedtime) + wakeTime;
  }
  return wakeTime - bedtime;
}

function calculateMidSleepPoint(bedtime: number, sleepDuration: number): number {
  return (bedtime + sleepDuration / 2) % 24;
}

function formatTime(time: number): string {
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function generateEmailBody(data: SleepIntakeData, calculations: any, interpretations: any): string {
  return `Sleep Assessment Report Summary

Sleep Metrics:
- Total Sleep Time: ${calculations.totalSleepTime} hours
- Sleep Efficiency: ${calculations.sleepEfficiency}%
- Average Sleep Onset: ${calculations.avgSOL} minutes
- Average Night Wakings: ${calculations.avgWASO} minutes

Sleep Schedule:
- Average Bedtime: ${calculations.avgBedtime}
- Average Wake Time: ${calculations.avgWakeTime}
- Mid-Sleep Point: ${calculations.midSleepPoint}

Potential Concerns:
${interpretations.concerns.map((c: any) => `- ${c.condition}: ${c.description}`).join('\n')}

Recommendations:
${interpretations.recommendations.map((r: string) => `- ${r}`).join('\n')}

Please consult with a healthcare provider for proper medical evaluation.`;
}
