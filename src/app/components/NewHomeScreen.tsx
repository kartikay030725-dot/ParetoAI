import { BookOpen, Brain, Calendar, Clock, PlayCircle, Settings, TrendingUp, Bell } from 'lucide-react';
import type { StudentProfile, Screen, TopicProgress } from '../App';

type NewHomeScreenProps = {
  profile: StudentProfile;
  onNavigate: (screen: Screen) => void;
  topicProgress: Record<string, TopicProgress>;
};

export function NewHomeScreen({ profile, onNavigate, topicProgress }: NewHomeScreenProps) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';

  const calculateDaysRemaining = () => {
    if (!profile.examDate) return 0;
    const examDate = new Date(profile.examDate);
    const today = new Date();
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = calculateDaysRemaining();

  const calculateOverallProgress = () => {
    const allTopics = Object.values(topicProgress);
    if (allTopics.length === 0) return 0;

    const totalProgress = allTopics.reduce((sum, topic) => {
      const videoScore = topic.videoWatchProgress || 0;
      const notesScore = topic.notesCompleted ? 100 : 0;
      const practiceScore = topic.practiceCompleted ? 100 : 0;
      return sum + (videoScore * 0.5 + notesScore * 0.3 + practiceScore * 0.2);
    }, 0);

    return Math.round(totalProgress / allTopics.length);
  };

  const overallProgress = calculateOverallProgress();

  const todaysTasks = [
    { subject: profile.subjects[0], topic: 'Complete video lecture', type: 'video', priority: 'high' },
    { subject: profile.subjects[1], topic: 'Practice 20 PYQs', type: 'practice', priority: 'high' },
    { subject: profile.subjects[2], topic: 'Revision notes', type: 'notes', priority: 'medium' }
  ];

  const isCommonExam = ['NEET', 'JEE Main', 'JEE Advanced', 'CUET', 'CLAT', 'CA Foundation', 'CS Foundation'].includes(profile.targetExams[0]);

  const notifications = isCommonExam ? [
    { text: `${profile.targetExams[0]} registration opens in 15 days`, type: 'info' },
    { text: 'Complete high-priority topics first for maximum impact', type: 'tip' }
  ] : [
    { text: `🤖 AI has customized your study plan for ${profile.targetExams[0]}`, type: 'info' },
    { text: 'YouTube videos and topics are automatically curated for your exam', type: 'tip' },
    { text: 'Complete high-priority topics first for maximum impact', type: 'tip' }
  ];

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-b-[3rem] p-6 pb-8 text-white shadow-xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-indigo-100 text-sm">{greeting}</p>
            <h1 className="text-2xl mt-1">{profile.name}</h1>
            <p className="text-indigo-100 text-sm mt-1">
              {profile.class === 'dropper' ? 'Dropper' : `Class ${profile.class}`} • {profile.targetExams[0]}
            </p>
          </div>
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur hover:bg-white/30 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Exam Countdown */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <h2 className="text-lg">{profile.targetExams[0]} {profile.examYear}</h2>
            </div>
            <Bell className="w-5 h-5 text-yellow-300" />
          </div>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <div className="text-5xl mb-1">{daysRemaining}</div>
              <div className="text-indigo-100 text-sm">Days Remaining</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-indigo-100 mb-1">Expected: {profile.examDate}</div>
              <div className="text-xs bg-white/20 px-2 py-1 rounded-full inline-block">
                {Math.floor(daysRemaining / 30)} months left
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span>Overall Syllabus Progress</span>
              <span>{overallProgress}%</span>
            </div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
            <div className="space-y-2">
              {notifications.map((notif, idx) => (
                <div key={idx} className={`flex items-start gap-3 p-3 rounded-xl ${
                  notif.type === 'info' ? 'bg-blue-50' : 'bg-green-50'
                }`}>
                  <Bell className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                    notif.type === 'info' ? 'text-blue-600' : 'text-green-600'
                  }`} />
                  <p className="text-sm text-gray-700">{notif.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Today's Focus */}
        <div className="mb-6">
          <h2 className="text-lg mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            Today's Focus
          </h2>
          <div className="space-y-3">
            {todaysTasks.map((task, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    task.priority === 'high' ? 'bg-red-100' : 'bg-yellow-100'
                  }`}>
                    {task.type === 'video' && <PlayCircle className="w-5 h-5 text-red-600" />}
                    {task.type === 'practice' && <BookOpen className="w-5 h-5 text-orange-600" />}
                    {task.type === 'notes' && <Brain className="w-5 h-5 text-yellow-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm mb-0.5">{task.topic}</div>
                    <div className="text-xs text-gray-500">{task.subject}</div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {task.priority}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg mb-3">Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate('analysis')}
              className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <Brain className="w-8 h-8 mb-2" />
              <div className="text-sm">Topic Checklist</div>
              <div className="text-xs text-purple-100 mt-1">80/20 optimized</div>
            </button>
            <button
              onClick={() => onNavigate('planner')}
              className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <Calendar className="w-8 h-8 mb-2" />
              <div className="text-sm">Study Routine</div>
              <div className="text-xs text-pink-100 mt-1">AI planned</div>
            </button>
            <button
              onClick={() => onNavigate('progress')}
              className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <TrendingUp className="w-8 h-8 mb-2" />
              <div className="text-sm">Progress</div>
              <div className="text-xs text-blue-100 mt-1">Detailed analytics</div>
            </button>
            <button
              onClick={() => onNavigate('focus')}
              className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <Clock className="w-8 h-8 mb-2" />
              <div className="text-sm">Focus Mode</div>
              <div className="text-xs text-orange-100 mt-1">Distraction-free</div>
            </button>
          </div>
        </div>

        {/* Study Streak */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-green-100 mb-1">Study Streak</div>
              <div className="text-3xl">7 days 🔥</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-100 mb-1">Keep it going!</div>
              <div className="text-xs bg-white/20 px-3 py-1 rounded-full inline-block">
                +2% retention boost
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
