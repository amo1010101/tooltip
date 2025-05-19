import React from 'react';
import { DiagnosticForm } from '../components/DiagnosticForm';
import { Card, CardContent } from '@/components/ui/card';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Your Personal Growth Journey
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Let's start by understanding where you are in your life journey.
            This assessment will help us create a personalized growth plan for you.
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">What to Expect</h2>
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h3 className="font-medium">Assessment (10-15 minutes)</h3>
                    <p className="text-gray-600">Answer questions about five key life areas: Health & Energy, Mental & Emotions, Relations, Work & Finance, and Self Development.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h3 className="font-medium">Personalized Insights</h3>
                    <p className="text-gray-600">Receive detailed feedback about your strengths and areas for growth in each life area.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h3 className="font-medium">Custom Growth Plan</h3>
                    <p className="text-gray-600">Get actionable recommendations and next steps tailored to your current situation.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Tips for Best Results</h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Find a quiet space where you can focus
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Answer honestly - there are no right or wrong answers
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Consider your experiences over the past month
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Take your time to reflect on each question
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <DiagnosticForm />
      </div>
    </div>
  );
} 