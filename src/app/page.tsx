"use client";

import { SleepIntakeForm } from "@/components/SleepIntakeForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Sleep Assessment Questionnaire
          </h1>
          <p className="text-muted-foreground text-lg">
            Complete this comprehensive assessment to receive personalized insights about your sleep patterns and recommendations.
          </p>
        </div>
        <SleepIntakeForm />
      </div>
    </div>
  );
}
