import { ArrowLeft, Calendar, CheckCircle, Circle } from 'lucide-react';
import type { StudentProfile, Screen } from '../App';

type StudyPlannerProps = {
  profile: StudentProfile;
  onNavigate: (screen: Screen) => void;
};

type PlanNode = {
  day: number;
  title: string;
  subject: string;
  duration: string;
  type: 'concept' | 'practice' | 'revision' | 'mock';
  completed: boolean;
};

const generateStudyPlan = (profile: StudentProfile): PlanNode[] => {
  const plan: PlanNode[] = [];
  const subjects = profile.subjects;
  const hoursPerDay = profile.dailyHours;

  for (let day = 1; day <= 30; day++) {
    const subject = subjects[(day - 1) % subjects.length];

    if (day % 7 === 0) {
      plan.push({
        day,
        title: 'Weekly Mock Test',
        subject: 'All Subjects',
        duration: `${Math.min(hoursPerDay, 3)}h`,
        type: 'mock',
        completed: day <= 7
      });
    } else if (day % 3 === 0) {
      plan.push({
        day,
        title: 'Revision + Practice',
        subject,
        duration: `${Math.floor(hoursPerDay * 0.7)}h`,
        type: 'revision',
        completed: day <= 7
      });
    } else if (day % 2 === 0) {
      plan.push({
        day,
        title: 'Problem Solving',
        subject,
        duration: `${Math.floor(hoursPerDay * 0.8)}h`,
        type: 'practice',
        completed: day <= 7
      });
    } else {
      plan.push({
        day,
        title: 'Concept Learning',
        subject,
        duration: `${hoursPerDay}h`,
        type: 'concept',
        completed: day <= 7
      });
    }
  }

  return plan;
};

export function StudyPlanner({ profile, onNavigate }: StudyPlannerProps) {
  const plan = generateStudyPlan(profile);
  const completedCount = plan.filter(p => p.completed).length;
  const progressPercentage = (completedCount / plan.length) * 100;

  const getNodeColor = (type: PlanNode['type'], completed: boolean) => {
    if (completed) return 'bg-green-500 border-green-500';

    switch (type) {
      case 'concept':
        return 'bg-purple-200 border-purple-400';
      case 'practice':
        return 'bg-blue-200 border-blue-400';
      case 'revision':
        return 'bg-yellow-200 border-yellow-400';
      case 'mock':
        return 'bg-red-200 border-red-400';
    }
  };

  const getTypeIcon = (type: PlanNode['type']) => {
    switch (type) {
      case 'concept':
        return '📚';
      case 'practice':
        return '✍️';
      case 'revision':
        return '🔄';
      case 'mock':
        return '🎯';
    }
  };

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-b-[3rem] p-6 pb-8 text-white mb-6">
        <button onClick={() => onNavigate('home')} className="mb-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl mb-2">30-Day Study Journey</h1>
        <p className="text-purple-100 text-sm mb-4">Optimized for {profile.dailyHours}h daily study</p>

        {/* Progress */}
        <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span>Overall Progress</span>
            <span>{completedCount}/{plan.length} days</span>
          </div>
          <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-300 to-green-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="px-6">
        {/* Legend */}
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
          <h3 className="text-sm mb-3">Activity Types</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span>📚</span>
              <span>Concept Learning</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✍️</span>
              <span>Problem Solving</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔄</span>
              <span>Revision</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎯</span>
              <span>Mock Test</span>
            </div>
          </div>
        </div>

        {/* Journey Path */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-pink-200 to-blue-200" />

          {/* Nodes */}
          <div className="space-y-6">
            {plan.map((node) => (
              <div key={node.day} className="relative pl-14">
                {/* Node Circle */}
                <div className={`absolute left-2 top-2 w-8 h-8 rounded-full border-4 ${getNodeColor(node.type, node.completed)} flex items-center justify-center transition-all ${node.completed ? 'shadow-lg scale-110' : 'opacity-60'}`}>
                  {node.completed ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <Circle className="w-3 h-3 text-gray-400" />
                  )}
                </div>

                {/* Content Card */}
                <div className={`bg-white rounded-2xl p-4 shadow-md transition-all ${node.completed ? 'shadow-lg' : 'opacity-75'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getTypeIcon(node.type)}</span>
                      <div>
                        <h3 className="text-sm">{node.title}</h3>
                        <p className="text-xs text-gray-500">Day {node.day}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      {node.duration}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{node.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
