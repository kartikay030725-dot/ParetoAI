import {
  BookOpen,
  Brain,
  Target,
  TrendingUp,
  Youtube,
  Zap,
  Trophy,
  Flame,
  Star,
} from "lucide-react";
import type { StudentProfile, Screen } from "../App";
import { Mascot } from "./Mascot";

type HomeScreenProps = {
  profile: StudentProfile;
  xp: number;
  level: number;
  streak: number;
  onNavigate: (screen: Screen) => void;
  onAddXP: (points: number) => void;
};

export function HomeScreen({
  profile,
  xp,
  level,
  streak,
  onNavigate,
  onAddXP,
}: HomeScreenProps) {
  const xpForNextLevel = level * 100;
  const xpProgress =
    ((xp % xpForNextLevel) / xpForNextLevel) * 100;

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
        ? "Good Afternoon"
        : "Good Evening";

  const todaysMissions = [
    {
      icon: Brain,
      title: "Review High-Priority Topics",
      subject: profile.subjects[0],
      xp: 50,
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: BookOpen,
      title: "Complete 10 Practice Questions",
      subject: profile.subjects[1] || profile.subjects[0],
      xp: 30,
      color: "from-pink-400 to-pink-600",
    },
    {
      icon: Target,
      title: "Watch Curated Video",
      subject: profile.subjects[0],
      xp: 20,
      color: "from-blue-400 to-blue-600",
    },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-b-[3rem] p-6 pb-8 text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-purple-100 text-sm">
              {greeting}
            </p>
            <h1 className="text-2xl mt-1">
              {profile.name}! 👋
            </h1>
          </div>
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
            <Trophy className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/20 backdrop-blur rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame className="w-4 h-4 text-orange-300" />
              <span className="text-2xl">{streak}</span>
            </div>
            <p className="text-xs text-purple-100">
              Day Streak
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-2xl">{level}</span>
            </div>
            <p className="text-xs text-purple-100">Level</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="text-2xl">{xp}</span>
            </div>
            <p className="text-xs text-purple-100">Total XP</p>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Level {level}</span>
            <span className="text-sm">Level {level + 1}</span>
          </div>
          <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-300 to-orange-400 transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
          <p className="text-xs text-purple-100 mt-2 text-center">
            {xpForNextLevel - (xp % xpForNextLevel)} XP to next
            level
          </p>
        </div>
      </div>

      {/* Mascot */}
      <div className="px-6 -mt-12 mb-6">
        <Mascot
          mood="happy"
          message="Let's crush today's goals!"
        />
      </div>

      {/* Today's Missions */}
      <div className="px-6 mb-6">
        <h2 className="mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-500" />
          Today's Missions
        </h2>
        <div className="space-y-3">
          {todaysMissions.map((mission, index) => (
            <button
              key={index}
              onClick={() => onAddXP(mission.xp)}
              className="w-full bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mission.color} flex items-center justify-center flex-shrink-0`}
                >
                  <mission.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-sm mb-0.5">
                    {mission.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {mission.subject}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                  <Zap className="w-3 h-3 text-yellow-600" />
                  <span className="text-xs text-yellow-700">
                    +{mission.xp}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6">
        <h2 className="mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate("analysis")}
            className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <Brain className="w-8 h-8 mb-2" />
            <h3 className="text-sm">80/20 Analysis</h3>
          </button>
          <button
            onClick={() => onNavigate("planner")}
            className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <BookOpen className="w-8 h-8 mb-2" />
            <h3 className="text-sm">Study Planner</h3>
          </button>
          <button
            onClick={() => onNavigate("youtube")}
            className="bg-gradient-to-br from-red-400 to-red-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <Youtube className="w-8 h-8 mb-2" />
            <h3 className="text-sm">Video Hub</h3>
          </button>
          <button
            onClick={() => onNavigate("progress")}
            className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <TrendingUp className="w-8 h-8 mb-2" />
            <h3 className="text-sm">Progress</h3>
          </button>
        </div>
      </div>

      {/* Floating Focus Button */}
      <button
        onClick={() => onNavigate("focus")}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform"
      >
        <Zap className="w-8 h-8" />
      </button>
    </div>
  );
}