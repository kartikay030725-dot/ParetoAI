import { ArrowLeft, TrendingUp, Award, Target, Zap } from 'lucide-react';
import type { StudentProfile, Screen } from '../App';

type ProgressScreenProps = {
  profile: StudentProfile;
  onNavigate: (screen: Screen) => void;
  xp: number;
  level: number;
  streak: number;
};

export function ProgressScreen({ profile, onNavigate, xp, level, streak }: ProgressScreenProps) {
  const subjectProgress = profile.subjects.map(subject => ({
    name: subject,
    completion: Math.floor(Math.random() * 40 + 40),
    accuracy: Math.floor(Math.random() * 20 + 70),
    questionsAttempted: Math.floor(Math.random() * 200 + 100)
  }));

  const badges = [
    { name: 'First Steps', icon: '🎯', earned: true },
    { name: 'Week Warrior', icon: '⚡', earned: true },
    { name: 'Practice Pro', icon: '✍️', earned: true },
    { name: 'Streak Master', icon: '🔥', earned: streak >= 7 },
    { name: 'Level 5', icon: '⭐', earned: level >= 5 },
    { name: 'Mock Champion', icon: '🏆', earned: false }
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 2 },
    { day: 'Fri', hours: 3.5 },
    { day: 'Sat', hours: 4 },
    { day: 'Sun', hours: 2 }
  ];

  const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-b-[3rem] p-6 pb-8 text-white mb-6">
        <button onClick={() => onNavigate('home')} className="mb-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl mb-2">Your Progress</h1>
        <p className="text-blue-100 text-sm">Keep up the amazing work!</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-4 text-white text-center">
            <Zap className="w-6 h-6 mx-auto mb-2" />
            <div className="text-2xl mb-1">{xp}</div>
            <div className="text-xs text-purple-100">Total XP</div>
          </div>
          <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl p-4 text-white text-center">
            <Award className="w-6 h-6 mx-auto mb-2" />
            <div className="text-2xl mb-1">{level}</div>
            <div className="text-xs text-pink-100">Level</div>
          </div>
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-4 text-white text-center">
            <Target className="w-6 h-6 mx-auto mb-2" />
            <div className="text-2xl mb-1">{streak}</div>
            <div className="text-xs text-orange-100">Day Streak</div>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <h2 className="mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            This Week's Activity
          </h2>
          <div className="flex items-end justify-between gap-2 h-32">
            {weeklyActivity.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-lg transition-all hover:opacity-80"
                     style={{ height: `${(day.hours / maxHours) * 100}%`, minHeight: '20px' }} />
                <div className="text-xs text-gray-600">{day.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Progress */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <h2 className="mb-4">Subject-wise Progress</h2>
          <div className="space-y-4">
            {subjectProgress.map((subject) => (
              <div key={subject.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">{subject.name}</span>
                  <span className="text-xs text-gray-500">{subject.completion}% complete</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all"
                    style={{ width: `${subject.completion}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                  <span>{subject.questionsAttempted} questions</span>
                  <span className={subject.accuracy >= 80 ? 'text-green-600' : 'text-orange-600'}>
                    {subject.accuracy}% accuracy
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <h2 className="mb-4">Achievements</h2>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className={`rounded-xl p-4 text-center transition-all ${
                  badge.earned
                    ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-md'
                    : 'bg-gray-100 opacity-50'
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <div className="text-xs">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Heatmap */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <h2 className="mb-4">Study Heatmap (Last 30 Days)</h2>
          <div className="grid grid-cols-10 gap-1">
            {Array.from({ length: 30 }, (_, i) => {
              const intensity = Math.random();
              return (
                <div
                  key={i}
                  className={`aspect-square rounded ${
                    intensity > 0.7
                      ? 'bg-green-500'
                      : intensity > 0.4
                      ? 'bg-green-300'
                      : intensity > 0.2
                      ? 'bg-green-200'
                      : 'bg-gray-200'
                  }`}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-gray-200 rounded" />
              <div className="w-3 h-3 bg-green-200 rounded" />
              <div className="w-3 h-3 bg-green-300 rounded" />
              <div className="w-3 h-3 bg-green-500 rounded" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
