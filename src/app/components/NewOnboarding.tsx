import { useState } from 'react';
import { Sparkles, GraduationCap, Target, Clock, Calendar } from 'lucide-react';
import type { StudentProfile } from '../App';

type OnboardingProps = {
  onComplete: (profile: StudentProfile) => void;
};

const studentTypes = [
  { id: '11', label: 'Class 11', icon: '📚', desc: '1st year of preparation' },
  { id: '12', label: 'Class 12', icon: '🎯', desc: 'Final year push' },
  { id: 'dropper', label: 'Dropper', icon: '💪', desc: 'Gap year focus' }
];

const streams = ['Science (PCM)', 'Science (PCB)', 'Science (PCMB)', 'Commerce', 'Humanities'];

const examsByStream: Record<string, { name: string; fullName: string; typical: string }[]> = {
  'Science (PCM)': [
    { name: 'JEE Main', fullName: 'Joint Entrance Examination Main', typical: 'April 2026' },
    { name: 'JEE Advanced', fullName: 'IIT Entrance Exam', typical: 'May 2026' },
    { name: 'BITSAT', fullName: 'BITS Admission Test', typical: 'May 2026' },
    { name: 'VITEEE', fullName: 'VIT Engineering Entrance', typical: 'April 2026' },
    { name: 'SRMJEEE', fullName: 'SRM Joint Entrance', typical: 'April 2026' }
  ],
  'Science (PCB)': [
    { name: 'NEET', fullName: 'National Eligibility cum Entrance Test', typical: 'May 2026' },
    { name: 'AIIMS', fullName: 'All India Institute of Medical Sciences', typical: 'May 2026' },
    { name: 'JIPMER', fullName: 'JIPMER MBBS Entrance', typical: 'June 2026' }
  ],
  'Science (PCMB)': [
    { name: 'NEET', fullName: 'National Eligibility cum Entrance Test', typical: 'May 2026' },
    { name: 'JEE Main', fullName: 'Joint Entrance Examination Main', typical: 'April 2026' },
    { name: 'AIIMS', fullName: 'All India Institute of Medical Sciences', typical: 'May 2026' }
  ],
  'Commerce': [
    { name: 'CA Foundation', fullName: 'Chartered Accountancy Foundation', typical: 'May 2026' },
    { name: 'CS Foundation', fullName: 'Company Secretary Foundation', typical: 'June 2026' },
    { name: 'CUET', fullName: 'Common University Entrance Test', typical: 'May 2026' }
  ],
  'Humanities': [
    { name: 'CUET', fullName: 'Common University Entrance Test', typical: 'May 2026' },
    { name: 'CLAT', fullName: 'Common Law Admission Test', typical: 'May 2026' },
    { name: 'NIFT', fullName: 'National Institute of Fashion Technology', typical: 'January 2026' }
  ]
};

const academicYears = ['2025', '2026', '2027'];

export function NewOnboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [studentType, setStudentType] = useState('');
  const [stream, setStream] = useState('');
  const [targetExam, setTargetExam] = useState('');
  const [customExamName, setCustomExamName] = useState('');
  const [examYear, setExamYear] = useState('');
  const [dailyHours, setDailyHours] = useState(6);

  const availableExams = stream ? examsByStream[stream] || [] : [];
  const isCustomExam = targetExam === 'OTHER';

  const handleComplete = () => {
    const finalExamName = isCustomExam ? customExamName : targetExam;
    const selectedExam = availableExams.find(e => e.name === targetExam);
    onComplete({
      name,
      class: studentType,
      stream,
      subjects: stream === 'Science (PCM)' ? ['Physics', 'Chemistry', 'Mathematics'] :
               stream === 'Science (PCB)' ? ['Physics', 'Chemistry', 'Biology'] :
               stream === 'Science (PCMB)' ? ['Physics', 'Chemistry', 'Mathematics', 'Biology'] :
               stream === 'Commerce' ? ['Accountancy', 'Business Studies', 'Economics'] :
               ['History', 'Political Science', 'Geography'],
      targetExams: [finalExamName],
      dailyHours,
      examYear,
      examDate: selectedExam?.typical || `May ${examYear}`
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-2xl">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-purple-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">ExamReady AI</h1>
            <p className="text-gray-600">Smart 80/20 Preparation System for Class 11-12 & Droppers</p>
          </div>

          {/* Step 1: Name & Student Type */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-700">What's your name?</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-2xl bg-indigo-50 border-2 border-indigo-200 focus:border-indigo-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block mb-3 text-gray-700 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  I am a...
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {studentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setStudentType(type.id)}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        studentType === type.id
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-indigo-500 shadow-lg'
                          : 'bg-white border-indigo-200 hover:border-indigo-400'
                      }`}
                    >
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <div className="text-sm mb-1">{type.label}</div>
                      <div className={`text-xs ${studentType === type.id ? 'text-indigo-100' : 'text-gray-500'}`}>
                        {type.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => name && studentType && setStep(2)}
                disabled={!name || !studentType}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Stream & Target Exam */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-3 text-gray-700">Your Stream</label>
                <div className="space-y-2">
                  {streams.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setStream(s);
                        setTargetExam('');
                      }}
                      className={`w-full py-3 px-4 rounded-xl border-2 transition-all text-left ${
                        stream === s
                          ? 'bg-indigo-500 text-white border-indigo-500'
                          : 'bg-white border-indigo-200 hover:border-indigo-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {stream && (
                <div>
                  <label className="block mb-3 text-gray-700 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Primary Target Exam
                  </label>
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {availableExams.map((exam) => (
                      <button
                        key={exam.name}
                        onClick={() => {
                          setTargetExam(exam.name);
                          setCustomExamName('');
                        }}
                        className={`w-full py-3 px-4 rounded-xl border-2 transition-all text-left ${
                          targetExam === exam.name
                            ? 'bg-purple-500 text-white border-purple-500'
                            : 'bg-white border-purple-200 hover:border-purple-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm mb-1">{exam.name}</div>
                            <div className={`text-xs ${
                              targetExam === exam.name ? 'text-purple-100' : 'text-gray-500'
                            }`}>
                              {exam.fullName}
                            </div>
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            targetExam === exam.name ? 'bg-white/20' : 'bg-gray-100'
                          }`}>
                            {exam.typical}
                          </div>
                        </div>
                      </button>
                    ))}

                    {/* Other Exam Option */}
                    <button
                      onClick={() => setTargetExam('OTHER')}
                      className={`w-full py-3 px-4 rounded-xl border-2 transition-all text-left ${
                        targetExam === 'OTHER'
                          ? 'bg-indigo-500 text-white border-indigo-500'
                          : 'bg-white border-indigo-200 hover:border-indigo-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm mb-1">Other Exam</div>
                          <div className={`text-xs ${
                            targetExam === 'OTHER' ? 'text-indigo-100' : 'text-gray-500'
                          }`}>
                            Enter your custom exam
                          </div>
                        </div>
                        <div className="text-xl">✏️</div>
                      </div>
                    </button>
                  </div>

                  {/* Custom Exam Input */}
                  {isCustomExam && (
                    <div className="mt-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
                      <label className="block text-sm text-gray-700 mb-2">Enter Exam Name</label>
                      <input
                        type="text"
                        value={customExamName}
                        onChange={(e) => setCustomExamName(e.target.value)}
                        placeholder="e.g., GATE, UPSC, IELTS, State PET..."
                        className="w-full px-4 py-3 rounded-xl bg-white border-2 border-indigo-200 focus:border-indigo-500 outline-none transition-colors"
                      />
                      <p className="text-xs text-gray-600 mt-2">
                        💡 Our AI will adapt the study plan to your exam's requirements
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 bg-gray-200 rounded-2xl hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!stream || !targetExam || (isCustomExam && !customExamName.trim())}
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Exam Year & Study Hours */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-3 text-gray-700 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Target Academic Year
                </label>
                <p className="text-sm text-gray-500 mb-3">
                  When are you planning to attempt {targetExam}?
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {academicYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => setExamYear(year)}
                      className={`py-4 rounded-xl border-2 transition-all ${
                        examYear === year
                          ? 'bg-indigo-500 text-white border-indigo-500'
                          : 'bg-white border-indigo-200 hover:border-indigo-400'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-3 text-gray-700 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Daily Study Hours
                </label>
                <p className="text-sm text-gray-500 mb-3">
                  How many hours can you dedicate daily?
                </p>
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">{dailyHours}h</div>
                  <p className="text-gray-600 text-sm">
                    {dailyHours < 4 && 'Light preparation'}
                    {dailyHours >= 4 && dailyHours < 7 && 'Moderate intensity'}
                    {dailyHours >= 7 && dailyHours < 10 && 'High intensity'}
                    {dailyHours >= 10 && 'Maximum dedication'}
                  </p>
                </div>
                <input
                  type="range"
                  min="2"
                  max="14"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2h</span>
                  <span>14h</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 bg-gray-200 rounded-2xl hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  disabled={!examYear}
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5" />
                  Start Your Journey
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
    </div>
  );
}
