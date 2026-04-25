import { useState } from 'react';
import { Sparkles, GraduationCap, Target, Clock } from 'lucide-react';
import type { StudentProfile } from '../App';

type OnboardingProps = {
  onComplete: (profile: StudentProfile) => void;
};

const classes = ['8', '9', '10', '11 Science', '11 Commerce', '11 Humanities', '12 Science', '12 Commerce', '12 Humanities'];
const streams = ['Science', 'Commerce', 'Humanities'];
const boards = ['CBSE', 'ICSE'];

const scienceSubjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics'];
const commerceSubjects = ['Accountancy', 'Business Studies', 'Economics', 'Applied Mathematics'];
const humanitiesSubjects = ['History', 'Political Science', 'Geography', 'Psychology', 'Sociology', 'English'];

const cbseSubjects = ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Sanskrit'];
const icseSubjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History & Civics', 'Geography', 'English', 'Computer Applications'];

type ExamInfo = {
  name: string;
  description: string;
  relevance: string[];
};

const allExams: ExamInfo[] = [
  { name: 'NEET', description: 'Medical entrance', relevance: ['Science'] },
  { name: 'JEE Main', description: 'Engineering entrance', relevance: ['Science'] },
  { name: 'JEE Advanced', description: 'IIT entrance', relevance: ['Science'] },
  { name: 'CUET', description: 'Central university entrance', relevance: ['Science', 'Commerce', 'Humanities'] },
  { name: 'IAT', description: 'IISER Aptitude Test', relevance: ['Science'] },
  { name: 'NEST', description: 'NISER entrance', relevance: ['Science'] },
  { name: 'IISER Aptitude', description: 'Research institute entrance', relevance: ['Science'] },
  { name: 'KVPY', description: 'Science scholarship', relevance: ['Science', 'CBSE', 'ICSE'] },
  { name: 'NDA', description: 'Defence academy', relevance: ['Science', 'Commerce', 'Humanities', 'General', 'CBSE', 'ICSE'] },
  { name: 'CLAT', description: 'Law entrance', relevance: ['Commerce', 'Humanities'] },
  { name: 'CA Foundation', description: 'Chartered Accountant', relevance: ['Commerce'] },
  { name: 'CS Foundation', description: 'Company Secretary', relevance: ['Commerce'] },
  { name: 'CMA Foundation', description: 'Cost & Management Accountant', relevance: ['Commerce'] },
  { name: 'NIFT', description: 'Fashion design entrance', relevance: ['Humanities'] },
  { name: 'NID', description: 'Design institute entrance', relevance: ['Humanities'] },
  { name: 'UCEED', description: 'Design entrance (IIT)', relevance: ['Humanities'] },
  { name: 'CEED', description: 'Design PG entrance', relevance: ['Humanities'] },
  { name: 'BHU UET', description: 'Banaras Hindu University', relevance: ['Science', 'Commerce', 'Humanities'] },
  { name: 'SAT', description: 'International admission', relevance: ['Science', 'Commerce', 'Humanities', 'CBSE', 'ICSE'] },
  { name: 'NTSE', description: 'National scholarship exam', relevance: ['General', 'CBSE', 'ICSE'] },
  { name: 'Science Olympiad', description: 'NSO/NSTSE/ISSO', relevance: ['General', 'CBSE', 'ICSE'] },
  { name: 'Math Olympiad', description: 'IMO/PRMO/RMO', relevance: ['General', 'CBSE', 'ICSE'] },
  { name: 'English Olympiad', description: 'IEO/IOEL', relevance: ['General', 'CBSE', 'ICSE'] },
  { name: 'CBSE Boards', description: 'Class 10 board exam', relevance: ['CBSE'] },
  { name: 'ICSE Boards', description: 'Class 10 board exam', relevance: ['ICSE'] }
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [dailyHours, setDailyHours] = useState(2);

  const isFoundationClass = () => {
    const classNum = parseInt(selectedClass);
    return classNum >= 8 && classNum <= 10;
  };

  const getSubjectsForStream = () => {
    if (isFoundationClass()) {
      if (selectedBoard === 'CBSE') return cbseSubjects;
      if (selectedBoard === 'ICSE') return icseSubjects;
      return [];
    }

    if (selectedStream === 'Science') return scienceSubjects;
    if (selectedStream === 'Commerce') return commerceSubjects;
    if (selectedStream === 'Humanities') return humanitiesSubjects;
    return [];
  };

  const getRelevantExams = (): ExamInfo[] => {
    if (isFoundationClass() && selectedBoard) {
      return allExams.filter(exam =>
        exam.relevance.includes(selectedBoard) || exam.relevance.includes('General')
      );
    }

    if (selectedStream === 'Science') {
      return allExams.filter(exam =>
        exam.relevance.includes('Science') || exam.relevance.includes('General')
      );
    }

    if (selectedStream === 'Commerce') {
      return allExams.filter(exam =>
        exam.relevance.includes('Commerce') || exam.relevance.includes('General')
      );
    }

    if (selectedStream === 'Humanities') {
      return allExams.filter(exam =>
        exam.relevance.includes('Humanities') || exam.relevance.includes('General')
      );
    }

    return allExams;
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject]
    );
  };

  const toggleExam = (exam: string) => {
    setSelectedExams(prev =>
      prev.includes(exam) ? prev.filter(e => e !== exam) : [...prev, exam]
    );
  };

  const handleComplete = () => {
    onComplete({
      name,
      class: selectedClass,
      stream: isFoundationClass() ? selectedBoard : selectedStream,
      subjects: selectedSubjects,
      targetExams: selectedExams,
      dailyHours
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl mb-2">StudyQuest</h1>
            <p className="text-gray-600">Your AI-Powered 80/20 Study Companion</p>
          </div>

          {/* Step 1: Name */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-700">What's your name?</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-2xl bg-purple-50 border-2 border-purple-200 focus:border-purple-400 outline-none transition-colors"
                />
              </div>
              <button
                onClick={() => name && setStep(2)}
                disabled={!name}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Class & Stream/Board */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-3 text-gray-700 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Select Your Class
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {classes.map((cls) => (
                    <button
                      key={cls}
                      onClick={() => {
                        setSelectedClass(cls);
                        setSelectedBoard('');
                        setSelectedStream('');
                        if (cls.includes('Science')) setSelectedStream('Science');
                        else if (cls.includes('Commerce')) setSelectedStream('Commerce');
                        else if (cls.includes('Humanities')) setSelectedStream('Humanities');
                      }}
                      className={`py-3 rounded-xl border-2 transition-all text-sm ${
                        selectedClass === cls
                          ? 'bg-purple-500 text-white border-purple-500'
                          : 'bg-white border-purple-200 hover:border-purple-400'
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>

              {/* Board Selection for Classes 8-10 */}
              {selectedClass && isFoundationClass() && (
                <div>
                  <label className="block mb-3 text-gray-700">Select Your Board</label>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 mb-3">
                    <p className="text-xs text-gray-700">
                      📚 Choose your school board for personalized content
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {boards.map((board) => (
                      <button
                        key={board}
                        onClick={() => setSelectedBoard(board)}
                        className={`py-4 rounded-xl border-2 transition-all ${
                          selectedBoard === board
                            ? 'bg-purple-500 text-white border-purple-500'
                            : 'bg-white border-purple-200 hover:border-purple-400'
                        }`}
                      >
                        <div className="text-lg mb-1">{board}</div>
                        <div className={`text-xs ${
                          selectedBoard === board ? 'text-purple-100' : 'text-gray-500'
                        }`}>
                          {board === 'CBSE' ? 'National curriculum' : 'English-medium board'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stream Selection for Classes 11-12 */}
              {selectedClass && !isFoundationClass() && (
                <div>
                  <label className="block mb-3 text-gray-700">Stream</label>
                  <div className="grid grid-cols-3 gap-2">
                    {streams.map((stream) => (
                      <button
                        key={stream}
                        onClick={() => setSelectedStream(stream)}
                        className={`py-3 rounded-xl border-2 transition-all ${
                          selectedStream === stream
                            ? 'bg-purple-500 text-white border-purple-500'
                            : 'bg-white border-purple-200 hover:border-purple-400'
                        }`}
                      >
                        {stream}
                      </button>
                    ))}
                  </div>
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
                  disabled={!selectedClass || (isFoundationClass() ? !selectedBoard : false)}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-lg transition-all disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Subjects */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-3 text-gray-700">Select Your Subjects</label>
                {isFoundationClass() && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-3 mb-3">
                    <p className="text-xs text-gray-700">
                      📖 Showing {selectedBoard} board subjects for Class {selectedClass}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2">
                  {getSubjectsForStream().map((subject) => (
                    <button
                      key={subject}
                      onClick={() => toggleSubject(subject)}
                      className={`py-3 px-2 rounded-xl border-2 transition-all text-sm ${
                        selectedSubjects.includes(subject)
                          ? 'bg-purple-500 text-white border-purple-500'
                          : 'bg-white border-purple-200 hover:border-purple-400'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
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
                  onClick={() => setStep(4)}
                  disabled={selectedSubjects.length === 0}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-lg transition-all disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Target Exams */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-gray-700 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Target Exams (Optional)
                  </label>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    {getRelevantExams().length} available
                  </span>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 mb-3">
                  <p className="text-xs text-gray-700">
                    {isFoundationClass() && selectedBoard ? (
                      <>🎯 Showing exams for <span className="font-medium text-purple-700">{selectedBoard}</span> students in Class {selectedClass}</>
                    ) : selectedStream ? (
                      <>🎯 Showing exams relevant to <span className="font-medium text-purple-700">{selectedStream}</span> stream</>
                    ) : (
                      <>🎯 Showing foundation exams for <span className="font-medium text-purple-700">Class {selectedClass}</span></>
                    )}
                  </p>
                </div>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                  {getRelevantExams().map((exam) => (
                    <button
                      key={exam.name}
                      onClick={() => toggleExam(exam.name)}
                      className={`w-full py-3 px-4 rounded-xl border-2 transition-all text-left ${
                        selectedExams.includes(exam.name)
                          ? 'bg-purple-500 text-white border-purple-500'
                          : 'bg-white border-purple-200 hover:border-purple-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm mb-0.5">{exam.name}</div>
                          <div className={`text-xs ${
                            selectedExams.includes(exam.name) ? 'text-purple-100' : 'text-gray-500'
                          }`}>
                            {exam.description}
                          </div>
                        </div>
                        {selectedExams.includes(exam.name) && (
                          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 bg-purple-500 rounded-full" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-gray-200 rounded-2xl hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-lg transition-all"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Daily Hours */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-3 text-gray-700 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Daily Study Time
                </label>
                <div className="text-center mb-4">
                  <div className="text-5xl mb-2">{dailyHours}h</div>
                  <p className="text-gray-600 text-sm">Hours per day</p>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1h</span>
                  <span>12h</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 py-3 bg-gray-200 rounded-2xl hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Let's Go!
                </button>
              </div>
            </div>
          )}

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`w-2 h-2 rounded-full transition-all ${
                  s === step ? 'bg-purple-500 w-6' : s < step ? 'bg-purple-300' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
