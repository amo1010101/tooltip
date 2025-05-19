'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

type Question = {
  id: string;
  pillar: string;
  subPillar: string;
  text: string;
  type: 'slider' | 'likert' | 'binary' | 'open';
  options?: string[];
};

const diagnosticQuestions: Question[] = [
  // Health & Energy Questions
  {
    id: 'sleep-1',
    pillar: 'health-energy',
    subPillar: 'sleep-recovery',
    text: 'How would you rate your sleep quality over the past week?',
    type: 'slider'
  },
  {
    id: 'sleep-2',
    pillar: 'health-energy',
    subPillar: 'sleep-recovery',
    text: 'Do you have a consistent bedtime routine?',
    type: 'binary'
  },
  {
    id: 'nutrition-1',
    pillar: 'health-energy',
    subPillar: 'nutrition-hydration',
    text: 'How many portions of vegetables do you eat daily?',
    type: 'likert',
    options: ['0-1', '2-3', '4-5', '6+']
  },
  {
    id: 'activity-1',
    pillar: 'health-energy',
    subPillar: 'physical-activity',
    text: 'Describe your current exercise routine:',
    type: 'open'
  },

  // Mental & Emotions Questions
  {
    id: 'stress-1',
    pillar: 'mental-emotions',
    subPillar: 'stress-management',
    text: 'How well do you handle stress on a typical day?',
    type: 'slider'
  },
  {
    id: 'emotions-1',
    pillar: 'mental-emotions',
    subPillar: 'emotional-regulation',
    text: 'Do you have tools or practices for managing difficult emotions?',
    type: 'binary'
  },

  // Relations Questions
  {
    id: 'social-1',
    pillar: 'relations',
    subPillar: 'friends-social',
    text: 'How satisfied are you with your social connections?',
    type: 'slider'
  },
  {
    id: 'family-1',
    pillar: 'relations',
    subPillar: 'family',
    text: 'How often do you connect with family members?',
    type: 'likert',
    options: ['Daily', 'Weekly', 'Monthly', 'Rarely']
  },

  // Work & Finance Questions
  {
    id: 'career-1',
    pillar: 'work-finance',
    subPillar: 'career-direction',
    text: 'How aligned do you feel with your current career path?',
    type: 'slider'
  },
  {
    id: 'finance-1',
    pillar: 'work-finance',
    subPillar: 'financial-health',
    text: 'Do you have a monthly budget system?',
    type: 'binary'
  },

  // Self Development Questions
  {
    id: 'growth-1',
    pillar: 'self-development',
    subPillar: 'personal-growth',
    text: 'How often do you engage in learning activities?',
    type: 'likert',
    options: ['Daily', 'Weekly', 'Monthly', 'Rarely']
  },
  {
    id: 'vision-1',
    pillar: 'self-development',
    subPillar: 'life-vision',
    text: 'What are your main personal development goals?',
    type: 'open'
  }
];

export function DiagnosticForm() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState(0);

  const currentQuestion = diagnosticQuestions[currentQuestionIndex];
  const totalQuestions = diagnosticQuestions.length;

  const calculatePillarScores = (answers: Record<string, any>) => {
    const pillarScores: Record<string, number> = {};
    const pillarCounts: Record<string, number> = {};

    // Calculate raw scores
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = diagnosticQuestions.find(q => q.id === questionId);
      if (!question) return;

      const pillar = question.pillar;
      if (!pillarScores[pillar]) {
        pillarScores[pillar] = 0;
        pillarCounts[pillar] = 0;
      }

      // Convert different answer types to scores
      let score = 0;
      switch (question.type) {
        case 'slider':
          score = answer; // Already 0-100
          break;
        case 'binary':
          score = answer ? 100 : 0;
          break;
        case 'likert':
          const likertMap: Record<string, number> = {
            'Daily': 100,
            'Weekly': 75,
            'Monthly': 50,
            'Rarely': 25,
            '0-1': 25,
            '2-3': 50,
            '4-5': 75,
            '6+': 100
          };
          score = likertMap[answer] || 50;
          break;
        case 'open':
          score = answer.length > 0 ? 75 : 25; // Basic scoring for open answers
          break;
      }

      pillarScores[pillar] += score;
      pillarCounts[pillar]++;
    });

    // Calculate averages
    Object.keys(pillarScores).forEach(pillar => {
      pillarScores[pillar] = Math.round(pillarScores[pillar] / pillarCounts[pillar]);
    });

    return pillarScores;
  };

  const handleAnswer = async (value: any) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: value
    };
    setAnswers(newAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setProgress(((currentQuestionIndex + 1) / totalQuestions) * 100);
    } else {
      // Calculate final scores
      const scores = calculatePillarScores(newAnswers);
      console.log('Final scores:', scores);

      try {
        // Store scores in localStorage
        localStorage.setItem('diagnostic_scores', JSON.stringify(scores));

        // Mark onboarding as completed
        const response = await fetch('/api/complete-onboarding', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ scores }),
        });

        if (!response.ok) {
          throw new Error('Failed to complete onboarding');
        }

        // Navigate to results page
        router.push('/onboarding/results');
      } catch (error) {
        console.error('Error completing onboarding:', error);
        // You might want to show an error message to the user here
      }
    }
  };

  const renderQuestionInput = () => {
    switch (currentQuestion.type) {
      case 'slider':
        return (
          <div className="w-full px-4 py-8">
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              onValueChange={(value) => handleAnswer(value[0])}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Not at all</span>
              <span>Very much</span>
            </div>
          </div>
        );

      case 'likert':
        return (
          <Select onValueChange={handleAnswer}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {currentQuestion.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'binary':
        return (
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => handleAnswer(true)}
            >
              Yes
            </Button>
            <Button
              variant="outline"
              onClick={() => handleAnswer(false)}
            >
              No
            </Button>
          </div>
        );

      case 'open':
        return (
          <textarea
            className="w-full p-2 border rounded-md"
            rows={4}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="Type your answer here..."
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Initial Assessment</CardTitle>
          <CardDescription>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </CardDescription>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <h3 className="text-lg font-medium">{currentQuestion.text}</h3>
            {renderQuestionInput()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 