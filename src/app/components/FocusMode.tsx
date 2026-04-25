import { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw } from 'lucide-react';
import type { Screen } from '../App';
import { Mascot } from './Mascot';

type FocusModeProps = {
  onNavigate: (screen: Screen) => void;
  onComplete: (xp: number) => void;
};

export function FocusMode({ onNavigate, onComplete }: FocusModeProps) {
  const [duration, setDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete(duration * 2);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, duration, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  const handleStart = () => {
    setIsStarted(true);
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsStarted(false);
    setTimeLeft(duration * 60);
  };

  const getMascotMood = () => {
    if (!isStarted) return 'excited';
    if (isRunning) return 'thinking';
    if (timeLeft === 0) return 'happy';
    return 'sleepy';
  };

  const getMascotMessage = () => {
    if (!isStarted) return 'Ready to focus? Let\'s do this!';
    if (isRunning && timeLeft > duration * 60 * 0.5) return 'Great start! Keep going!';
    if (isRunning && timeLeft > duration * 60 * 0.2) return 'You\'re doing amazing!';
    if (isRunning) return 'Almost there! Stay focused!';
    if (timeLeft === 0) return `Perfect! You earned ${duration * 2} XP!`;
    return 'Take a break when you need it!';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-xl">Focus Mode</h1>
        <button
          onClick={() => onNavigate('home')}
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-6 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
        {/* Duration Selector */}
        {!isStarted && (
          <div className="mb-8 w-full max-w-md">
            <label className="block text-center mb-4 text-purple-200">Select Duration</label>
            <div className="grid grid-cols-4 gap-3">
              {[15, 25, 45, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setDuration(mins)}
                  className={`py-3 rounded-xl transition-all ${
                    duration === mins
                      ? 'bg-white text-purple-900'
                      : 'bg-white/10 backdrop-blur hover:bg-white/20'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Timer Circle */}
        <div className="relative w-72 h-72 mb-8">
          {/* Background Circle */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="144"
              cy="144"
              r="130"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress Circle */}
            <circle
              cx="144"
              cy="144"
              r="130"
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 130}`}
              strokeDashoffset={`${2 * Math.PI * 130 * (1 - progress / 100)}`}
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>

          {/* Timer Display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2 font-mono">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className="text-purple-200 text-sm">
                {timeLeft === 0 ? 'Complete!' : isRunning ? 'Stay focused...' : 'Paused'}
              </div>
            </div>
          </div>

          {/* Floating Particles */}
          {isRunning && (
            <>
              <div className="absolute top-4 left-8 w-2 h-2 bg-yellow-300 rounded-full animate-ping" />
              <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-pink-300 rounded-full animate-ping delay-100" />
              <div className="absolute bottom-16 left-16 w-2 h-2 bg-purple-300 rounded-full animate-ping delay-200" />
            </>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mb-8">
          {!isStarted ? (
            <button
              onClick={handleStart}
              className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
            >
              <Play className="w-10 h-10 text-white ml-1" />
            </button>
          ) : (
            <>
              <button
                onClick={handleReset}
                className="w-16 h-16 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
              <button
                onClick={isRunning ? handlePause : () => setIsRunning(true)}
                className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
              >
                {isRunning ? (
                  <Pause className="w-10 h-10 text-white" />
                ) : (
                  <Play className="w-10 h-10 text-white ml-1" />
                )}
              </button>
            </>
          )}
        </div>

        {/* Mascot Message */}
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur rounded-3xl p-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-300 to-green-500 flex items-center justify-center text-3xl flex-shrink-0">
              {getMascotMood() === 'excited' && '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧'}
              {getMascotMood() === 'thinking' && '(¬_¬)'}
              {getMascotMood() === 'happy' && '(◕‿◕)'}
              {getMascotMood() === 'sleepy' && '(˘▽˘)zzz'}
            </div>
            <p className="text-sm text-purple-100">{getMascotMessage()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
