import { useState } from 'react';
import { NewOnboarding } from './components/NewOnboarding';
import { NewHomeScreen } from './components/NewHomeScreen';
import { TopicChecklist } from './components/TopicChecklist';
import { RoutinePlanner } from './components/RoutinePlanner';
import { AccurateProgress } from './components/AccurateProgress';
import { FocusMode } from './components/FocusMode';

export type StudentProfile = {
  name: string;
  class: string;
  stream: string;
  subjects: string[];
  targetExams: string[];
  dailyHours: number;
  examYear?: string;
  examDate?: string;
};

export type TopicProgress = {
  topicId: string;
  videoWatchProgress: number;
  notesCompleted: boolean;
  practiceCompleted: boolean;
  revisionCount: number;
};

type DailyRoutine = {
  wakeUpTime: string;
  sleepTime: string;
  studySessions: Array<{
    start: string;
    end: string;
    activity: string;
    subject?: string;
  }>;
  breakTimes: Array<{
    start: string;
    end: string;
    activity: string;
  }>;
};

export type Screen = 'onboarding' | 'home' | 'planner' | 'progress' | 'focus' | 'analysis';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [topicProgress, setTopicProgress] = useState<Record<string, TopicProgress>>({});
  const [routine, setRoutine] = useState<DailyRoutine | null>(null);

  const handleProfileComplete = (data: StudentProfile) => {
    setProfile(data);
    setCurrentScreen('planner');
  };

  const handleRoutineSave = (newRoutine: DailyRoutine) => {
    setRoutine(newRoutine);
    setCurrentScreen('home');
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const updateTopicProgress = (topicId: string, progress: Partial<TopicProgress>) => {
    setTopicProgress(prev => ({
      ...prev,
      [topicId]: {
        ...prev[topicId],
        topicId,
        videoWatchProgress: progress.videoWatchProgress ?? prev[topicId]?.videoWatchProgress ?? 0,
        notesCompleted: progress.notesCompleted ?? prev[topicId]?.notesCompleted ?? false,
        practiceCompleted: progress.practiceCompleted ?? prev[topicId]?.practiceCompleted ?? false,
        revisionCount: progress.revisionCount ?? prev[topicId]?.revisionCount ?? 0
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {currentScreen === 'onboarding' && (
        <NewOnboarding onComplete={handleProfileComplete} />
      )}
      {currentScreen === 'planner' && profile && (
        <RoutinePlanner
          profile={profile}
          onNavigate={navigateTo}
          onSaveRoutine={handleRoutineSave}
        />
      )}
      {currentScreen === 'home' && profile && (
        <NewHomeScreen
          profile={profile}
          onNavigate={navigateTo}
          topicProgress={topicProgress}
        />
      )}
      {currentScreen === 'analysis' && profile && (
        <TopicChecklist
          profile={profile}
          onNavigate={navigateTo}
          topicProgress={topicProgress}
          onUpdateProgress={updateTopicProgress}
        />
      )}
      {currentScreen === 'progress' && profile && (
        <AccurateProgress
          profile={profile}
          onNavigate={navigateTo}
          topicProgress={topicProgress}
        />
      )}
      {currentScreen === 'focus' && profile && (
        <FocusMode
          onNavigate={navigateTo}
          onComplete={() => {}}
        />
      )}
    </div>
  );
}
