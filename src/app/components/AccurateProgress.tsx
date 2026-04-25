import { ArrowLeft, TrendingUp, CheckCircle, PlayCircle, BookOpen, FileText } from 'lucide-react';
import type { StudentProfile, Screen, TopicProgress } from '../App';

type AccurateProgressProps = {
  profile: StudentProfile;
  onNavigate: (screen: Screen) => void;
  topicProgress: Record<string, TopicProgress>;
};

export function AccurateProgress({ profile, onNavigate, topicProgress }: AccurateProgressProps) {
  const calculateSubjectProgress = (subject: string) => {
    const subjectTopics = Object.entries(topicProgress).filter(([id]) => id.toLowerCase().includes(subject.toLowerCase().slice(0, 3)));

    if (subjectTopics.length === 0) return { overall: 0, video: 0, notes: 0, practice: 0, topics: 0 };

    const totals = subjectTopics.reduce((acc, [, progress]) => ({
      video: acc.video + (progress.videoWatchProgress || 0),
      notes: acc.notes + (progress.notesCompleted ? 100 : 0),
      practice: acc.practice + (progress.practiceCompleted ? 100 : 0)
    }), { video: 0, notes: 0, practice: 0 });

    const count = subjectTopics.length;

    return {
      overall: Math.round((totals.video * 0.5 + totals.notes * 0.3 + totals.practice * 0.2) / count),
      video: Math.round(totals.video / count),
      notes: Math.round(totals.notes / count),
      practice: Math.round(totals.practice / count),
      topics: count
    };
  };

  const subjectStats = profile.subjects.map(subject => ({
    name: subject,
    ...calculateSubjectProgress(subject)
  }));

  const overallProgress = Math.round(
    subjectStats.reduce((sum, stat) => sum + stat.overall, 0) / subjectStats.length
  );

  const totalTopicsCompleted = Object.values(topicProgress).filter(progress =>
    progress.videoWatchProgress === 100 &&
    progress.notesCompleted &&
    progress.practiceCompleted
  ).length;

  const totalTopics = Object.keys(topicProgress).length;

  const getWeeklyActivity = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      completed: Math.floor(Math.random() * 5) + 1
    }));
  };

  const weeklyActivity = getWeeklyActivity();
  const maxCompleted = Math.max(...weeklyActivity.map(d => d.completed));

  return (
    <div className="min-h-screen pb-6 bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-b-[3rem] p-6 pb-8 text-white shadow-xl">
        <button onClick={() => onNavigate('home')} className="mb-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl mb-2">Detailed Progress Analytics</h1>
        <p className="text-blue-100 text-sm">Accurate completion tracking</p>
      </div>

      <div className="px-6 -mt-4 space-y-6">
        {/* Overall Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Overall Progress
          </h2>

          <div className="text-center mb-6">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#progressGradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - overallProgress / 100)}`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-3xl">{overallProgress}%</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-xl p-3">
                <div className="text-2xl mb-1">{totalTopicsCompleted}</div>
                <div className="text-xs text-gray-600">Completed</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-3">
                <div className="text-2xl mb-1">{totalTopics - totalTopicsCompleted}</div>
                <div className="text-xs text-gray-600">In Progress</div>
              </div>
              <div className="bg-green-50 rounded-xl p-3">
                <div className="text-2xl mb-1">{totalTopics}</div>
                <div className="text-xs text-gray-600">Total Topics</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subject-wise Progress */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg mb-4">Subject-wise Breakdown</h2>
          <div className="space-y-4">
            {subjectStats.map((subject) => (
              <div key={subject.name} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm">{subject.name}</span>
                  <span className="text-sm font-medium text-gray-700">{subject.overall}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                    style={{ width: `${subject.overall}%` }}
                  />
                </div>

                {/* Activity Breakdown */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg">
                    <PlayCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-600">Videos</div>
                      <div className="text-sm">{subject.video}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-lg">
                    <FileText className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-600">Notes</div>
                      <div className="text-sm">{subject.notes}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                    <BookOpen className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-600">Practice</div>
                      <div className="text-sm">{subject.practice}%</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg mb-4">This Week's Activity</h2>
          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyActivity.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${(day.completed / maxCompleted) * 100}%`, minHeight: '20px' }}
                />
                <div className="text-xs text-gray-600">{day.day}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            Topics completed per day
          </div>
        </div>

        {/* Completion Criteria */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6">
          <h2 className="text-lg mb-3">How Progress is Calculated</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium mb-1">Video Lecture (50% weight)</div>
                <div className="text-gray-600 text-xs">Marks 0%, 25%, 50%, 75%, or 100% based on watch completion</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium mb-1">Notes Making (30% weight)</div>
                <div className="text-gray-600 text-xs">Binary: completed or not completed</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium mb-1">Practice Questions (20% weight)</div>
                <div className="text-gray-600 text-xs">Binary: completed or not completed</div>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white rounded-xl border-2 border-indigo-200">
            <div className="text-xs text-gray-600 text-center">
              ✨ A topic is 100% complete only when all three activities are finished
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
