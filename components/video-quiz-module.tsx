"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowRight, ArrowLeft, Play, Pause, CheckCircle2, XCircle, Sparkles } from "lucide-react"

interface VideoQuizModuleProps {
  moduleIndex: number
  title: string
  videoTitle: string
  onComplete: (moduleIndex: number, isCorrect: boolean) => void
  onBack: () => void
}

const quizData = [
  {
    // Module 0: What Are RCTs?
    question: "What is the main purpose of randomisation in an RCT?",
    options: [
      "To make the study more complicated",
      "To ensure groups are similar except for the treatment",
      "To save money on the study",
      "To make participants feel special",
    ],
    correctAnswer: 1,
    explanation:
      "Correct! Randomisation ensures that the groups being compared are similar in all ways except for the treatment they receive. This creates a fair comparison and reduces bias.",
    videoDescription:
      "RCTs are scientific experiments that test whether a treatment works by comparing it to a control group. The key is random assignment - like flipping a coin to decide who gets what treatment. This ensures fair comparison and helps us trust the results.",
  },
  {
    // Module 1: How Do RCTs Work?
    question: "What is a placebo?",
    options: [
      "A new type of medication",
      "A fake treatment with no active ingredients",
      "A side effect of treatment",
      "A type of randomisation",
    ],
    correctAnswer: 1,
    explanation:
      "Exactly right! A placebo is a fake treatment that looks like the real treatment but contains no active ingredients. It helps researchers determine if improvements are due to the treatment itself or the placebo effect.",
    videoDescription:
      "Running an RCT involves several steps: recruiting participants, randomly assigning them to groups, giving treatments (including placebos), measuring outcomes, and analyzing results. Double-blinding means neither patients nor doctors know who gets what treatment, preventing bias.",
  },
  {
    // Module 2: Why Do RCTs Matter?
    question: "Which of the following is a key strength of RCTs?",
    options: [
      "They are always quick and cheap",
      "They work for every research question",
      "They can help establish cause-and-effect relationships",
      "They never have ethical concerns",
    ],
    correctAnswer: 2,
    explanation:
      "Perfect! RCTs can help establish causation - they can prove that a treatment causes an effect. This is because randomisation and controlled conditions minimize other factors that could explain the results. This makes RCTs the gold standard for testing treatments.",
    videoDescription:
      "RCTs are crucial for evidence-based medicine. They help doctors know which treatments actually work, protect patients from ineffective or harmful treatments, and guide healthcare policy. While they have limitations (cost, time, ethics), they remain our best tool for proving what works in medicine.",
  },
]

export default function VideoQuizModule({ moduleIndex, title, videoTitle, onComplete, onBack }: VideoQuizModuleProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasWatched, setHasWatched] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>()
  const [showFeedback, setShowFeedback] = useState(false)

  const data = quizData[moduleIndex]

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (!hasWatched) {
      setTimeout(() => {
        setHasWatched(true)
        setIsPlaying(false)
      }, 3000) // Simulate video watching
    }
  }

  const handleContinueToQuiz = () => {
    setShowQuiz(true)
  }

  const handleSubmitAnswer = () => {
    setShowFeedback(true)
  }

  const handleNext = () => {
    const isCorrect = selectedAnswer === data.correctAnswer
    onComplete(moduleIndex, isCorrect)
  }

  const triggerConfetti = () => {
    const colors = ["#8b5cf6", "#10b981", "#3b82f6", "#f59e0b", "#ec4899"]
    const confettiCount = 50

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div")
      confetti.className = "confetti"
      confetti.style.left = Math.random() * 100 + "vw"
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.animationDelay = Math.random() * 0.5 + "s"
      confetti.style.animationDuration = 2 + Math.random() * 1 + "s"
      document.body.appendChild(confetti)

      setTimeout(() => confetti.remove(), 3500)
    }
  }

  useEffect(() => {
    if (showFeedback && selectedAnswer === data.correctAnswer) {
      triggerConfetti()
    }
  }, [showFeedback, selectedAnswer, data.correctAnswer])

  const isCorrect = selectedAnswer === data.correctAnswer

  if (!showQuiz) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <Button onClick={onBack} variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Level {moduleIndex + 1}
          </div>
          <h2 className="text-4xl font-bold text-balance">{title}</h2>
          <p className="text-xl text-muted-foreground text-balance">Watch the video to unlock the quiz</p>
        </div>

        <Card className="border-2 border-primary/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">{videoTitle}</CardTitle>
            <CardDescription>A quick explanation of this key concept</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Video Player Mockup */}
            <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg overflow-hidden border-2 border-primary/20">
              <div className="absolute inset-0 flex items-center justify-center">
                {!isPlaying ? (
                  <div className="text-center space-y-4">
                    <div className="mx-auto h-20 w-20 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Play className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">Click to watch</p>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center space-y-4 p-8">
                      <div className="mx-auto h-16 w-16 rounded-full bg-primary/30 flex items-center justify-center animate-pulse">
                        <Sparkles className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-lg font-medium">Video Playing...</p>
                      <p className="text-sm text-muted-foreground max-w-md">{data.videoDescription}</p>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handlePlayPause}
                className="absolute inset-0 w-full h-full cursor-pointer"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              />
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button onClick={handlePlayPause} variant="outline" size="lg" className="gap-2 bg-transparent">
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    {hasWatched ? "Replay" : "Play Video"}
                  </>
                )}
              </Button>
              {hasWatched && (
                <Button onClick={handleContinueToQuiz} size="lg" className="gap-2 shadow-lg">
                  Continue to Quiz
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <Button onClick={onBack} variant="ghost" className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
          Quiz Time
        </div>
        <h2 className="text-4xl font-bold text-balance">Test Your Knowledge</h2>
        <p className="text-xl text-muted-foreground text-balance">Answer this question to continue</p>
      </div>

      <Card className="border-2 border-primary/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-balance">{data.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => setSelectedAnswer(Number.parseInt(value))}
            disabled={showFeedback}
          >
            <div className="space-y-3">
              {data.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                    showFeedback
                      ? index === data.correctAnswer
                        ? "border-accent bg-accent/10 shadow-lg"
                        : selectedAnswer === index
                          ? "border-destructive bg-destructive/10"
                          : "border-border"
                      : selectedAnswer === index
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-sm leading-relaxed">
                    {option}
                  </Label>
                  {showFeedback && index === data.correctAnswer && (
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                  )}
                  {showFeedback && selectedAnswer === index && index !== data.correctAnswer && (
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </RadioGroup>

          {showFeedback && (
            <Card
              className={`${isCorrect ? "border-accent bg-accent/10" : "border-destructive bg-destructive/10"} animate-in slide-in-from-bottom duration-300`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-2">
                    <p className="font-semibold text-lg">
                      {isCorrect ? "Amazing! You got it right!" : "Not quite, but that's okay!"}
                    </p>
                    <p className="text-sm leading-relaxed">{data.explanation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-3">
            {!showFeedback ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === undefined}
                size="lg"
                className="shadow-lg"
              >
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNext} size="lg" className="gap-2 shadow-lg">
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
