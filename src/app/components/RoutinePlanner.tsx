import { useState } from 'react';
import { ArrowLeft, Clock, Coffee, Moon, Sun, Sunrise, Check, GraduationCap } from 'lucide-react';
import type { StudentProfile, Screen } from '../App';

type RoutinePlannerProps = {
  profile: StudentProfile;
  onNavigate: (screen: Screen) => void;
  onSaveRoutine: (routine: DailyRoutine) => void;
};

type TimeSlot = {
  start: string;
  end: string;
  activity: string;
  subject?: string;
};

type DailyRoutine = {
  wakeUpTime: string;
  sleepTime: string;
  studySessions: TimeSlot[];
  breakTimes: TimeSlot[];
};

export function RoutinePlanner({ profile, onNavigate, onSaveRoutine }: RoutinePlannerProps) {
  const [step, setStep] = useState(1);
  const [wakeUpTime, setWakeUpTime] = useState('06:00');
  const [sleepTime, setSleepTime] = useState('23:00');
  const [schoolTiming, setSchoolTiming] = useState<'yes' | 'no' | 'coaching'>('no');
  const [schoolStart, setSchoolStart] = useState('08:00');
  const [schoolEnd, setSchoolEnd] = useState('14:00');
  const [breakPreference, setBreakPreference] = useState<'short' | 'long'>('short');

  const isDropper = profile.class === 'dropper';

  const generateRoutine = (): DailyRoutine => {
    const sessions: TimeSlot[] = [];
    const breaks: TimeSlot[] = [];

    if (isDropper || schoolTiming === 'no') {
      // Full day study plan for droppers
      sessions.push(
        { start: '06:30', end: '08:30', activity: 'Morning Study Session', subject: profile.subjects[0] },
        { start: '09:00', end: '12:00', activity: 'Core Study Session 1', subject: profile.subjects[1] },
        { start: '14:00', end: '17:00', activity: 'Core Study Session 2', subject: profile.subjects[2] },
        { start: '17:30', end: '19:30', activity: 'Revision Session', subject: 'Mixed Topics' },
        { start: '20:00', end: '22:00', activity: 'Practice & Mock Tests', subject: 'All Subjects' }
      );

      breaks.push(
        { start: '08:30', end: '09:00', activity: 'Breakfast' },
        { start: '12:00', end: '14:00', activity: 'Lunch & Rest' },
        { start: '17:00', end: '17:30', activity: 'Evening Snack' },
        { start: '19:30', end: '20:00', activity: 'Dinner' }
      );
    } else {
      // School/college students
      sessions.push(
        { start: '06:00', end: '07:30', activity: 'Morning Revision', subject: profile.subjects[0] },
        { start: schoolEnd, end: '16:00', activity: 'Post-School Session', subject: profile.subjects[1] },
        { start: '17:00', end: '19:00', activity: 'Evening Study', subject: profile.subjects[2] },
        { start: '20:00', end: '22:00', activity: 'Night Practice', subject: 'Mixed' }
      );

      breaks.push(
        { start: '07:30', end: '08:00', activity: 'Breakfast' },
        { start: '16:00', end: '17:00', activity: 'Rest & Refresh' },
        { start: '19:00', end: '20:00', activity: 'Dinner' }
      );
    }

    return {
      wakeUpTime,
      sleepTime,
      studySessions: sessions,
      breakTimes: breaks
    };
  };

  const handleSave = () => {
    const routine = generateRoutine();
    onSaveRoutine(routine);
    onNavigate('home');
  };

  return (
    <div className="min-h-screen pb-6 bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-b-[3rem] p-6 pb-8 text-white shadow-xl">
        <button onClick={() => onNavigate('home')} className="mb-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl mb-2">AI Routine Builder</h1>
        <p className="text-indigo-100 text-sm">Personalized schedule based on your lifestyle</p>
      </div>

      <div className="px-6 -mt-4">
        {/* Step 1: Sleep Schedule */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div>
              <h2 className="text-lg mb-4 flex items-center gap-2">
                <Sun className="w-5 h-5 text-orange-500" />
                Your Daily Schedule
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">When do you wake up?</label>
                  <input
                    type="time"
                    value={wakeUpTime}
                    onChange={(e) => setWakeUpTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-indigo-50 border-2 border-indigo-200 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">When do you sleep?</label>
                  <input
                    type="time"
                    value={sleepTime}
                    onChange={(e) => setSleepTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-indigo-50 border-2 border-indigo-200 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Moon className="w-6 h-6 text-indigo-600" />
                    <div>
                      <div className="text-sm font-medium">Sleep Analysis</div>
                      <div className="text-xs text-gray-600">
                        You'll get ~{Math.abs(parseInt(sleepTime.split(':')[0]) - parseInt(wakeUpTime.split(':')[0]) - 24)} hours of sleep
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: School/Coaching Schedule */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div>
              <h2 className="text-lg mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-500" />
                School/College/Coaching
              </h2>

              <div className="space-y-3 mb-4">
                <button
                  onClick={() => setSchoolTiming('no')}
                  className={`w-full py-4 px-4 rounded-xl border-2 transition-all text-left ${
                    schoolTiming === 'no'
                      ? 'bg-indigo-500 text-white border-indigo-500'
                      : 'bg-white border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="text-sm mb-1">No Classes (Dropper/Self-Study)</div>
                  <div className={`text-xs ${schoolTiming === 'no' ? 'text-indigo-100' : 'text-gray-500'}`}>
                    Full day available for study
                  </div>
                </button>

                <button
                  onClick={() => setSchoolTiming('yes')}
                  className={`w-full py-4 px-4 rounded-xl border-2 transition-all text-left ${
                    schoolTiming === 'yes'
                      ? 'bg-indigo-500 text-white border-indigo-500'
                      : 'bg-white border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="text-sm mb-1">School/College Timing</div>
                  <div className={`text-xs ${schoolTiming === 'yes' ? 'text-indigo-100' : 'text-gray-500'}`}>
                    Regular school hours
                  </div>
                </button>

                <button
                  onClick={() => setSchoolTiming('coaching')}
                  className={`w-full py-4 px-4 rounded-xl border-2 transition-all text-left ${
                    schoolTiming === 'coaching'
                      ? 'bg-indigo-500 text-white border-indigo-500'
                      : 'bg-white border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="text-sm mb-1">Coaching Classes</div>
                  <div className={`text-xs ${schoolTiming === 'coaching' ? 'text-indigo-100' : 'text-gray-500'}`}>
                    Fixed coaching schedule
                  </div>
                </button>
              </div>

              {(schoolTiming === 'yes' || schoolTiming === 'coaching') && (
                <div className="space-y-3 bg-indigo-50 rounded-xl p-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Start Time</label>
                    <input
                      type="time"
                      value={schoolStart}
                      onChange={(e) => setSchoolStart(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border-2 border-indigo-200 focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">End Time</label>
                    <input
                      type="time"
                      value={schoolEnd}
                      onChange={(e) => setSchoolEnd(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border-2 border-indigo-200 focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Generated Routine */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-500" />
                Your Personalized Routine
              </h2>

              <div className="space-y-3">
                {generateRoutine().studySessions.map((session, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        {idx === 0 && <Sunrise className="w-6 h-6 text-white" />}
                        {idx > 0 && idx < 3 && <Sun className="w-6 h-6 text-white" />}
                        {idx >= 3 && <Moon className="w-6 h-6 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">{session.activity}</span>
                          <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                            {session.start} - {session.end}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600">
                          Focus: {session.subject}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="text-sm mb-2">Break Times</h3>
                <div className="flex flex-wrap gap-2">
                  {generateRoutine().breakTimes.map((breakTime, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg text-xs">
                      <Coffee className="w-3 h-3 text-green-600" />
                      <span>{breakTime.activity}</span>
                      <span className="text-gray-500">({breakTime.start})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Save Routine
              </button>
            </div>
          </div>
        )}

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s === step ? 'bg-indigo-500 w-8' : s < step ? 'bg-indigo-300 w-2' : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
