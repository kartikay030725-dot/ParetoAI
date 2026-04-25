import { useState } from 'react';
import { ArrowLeft, Play, CheckCircle, Circle, Youtube, BookOpen, FileText, RotateCcw } from 'lucide-react';
import type { StudentProfile, Screen, TopicProgress } from '../App';

type TopicChecklistProps = {
  profile: StudentProfile;
  onNavigate: (screen: Screen) => void;
  topicProgress: Record<string, TopicProgress>;
  onUpdateProgress: (topicId: string, progress: Partial<TopicProgress>) => void;
};

type Topic = {
  id: string;
  name: string;
  priority: 'high' | 'medium' | 'low';
  weightage: number;
  videoLink: string;
  videoTitle: string;
  channel: string;
  duration: string;
  subtopics: string[];
  pyqCount: number;
};

const getTopicsForSubject = (subject: string, examName?: string): Topic[] => {
  // Generic topics for custom/unknown exams
  const generateGenericTopics = (subject: string): Topic[] => {
    return [
      {
        id: `${subject.toLowerCase()}_fundamentals`,
        name: `${subject} Fundamentals`,
        priority: 'high',
        weightage: 30,
        videoLink: `https://youtube.com/results?search_query=${encodeURIComponent(subject + ' complete course ' + (examName || ''))}`,
        videoTitle: `Complete ${subject} Course for ${examName || 'Competitive Exams'}`,
        channel: 'Curated by AI',
        duration: '4:00:00',
        subtopics: ['Core Concepts', 'Basic Principles', 'Foundation Topics'],
        pyqCount: 30
      },
      {
        id: `${subject.toLowerCase()}_advanced`,
        name: `Advanced ${subject} Topics`,
        priority: 'high',
        weightage: 25,
        videoLink: `https://youtube.com/results?search_query=${encodeURIComponent(subject + ' advanced topics ' + (examName || ''))}`,
        videoTitle: `Advanced ${subject} for ${examName || 'Exams'}`,
        channel: 'Curated by AI',
        duration: '3:30:00',
        subtopics: ['Complex Problems', 'Advanced Theory', 'Application'],
        pyqCount: 25
      },
      {
        id: `${subject.toLowerCase()}_practice`,
        name: `${subject} Problem Solving`,
        priority: 'high',
        weightage: 20,
        videoLink: `https://youtube.com/results?search_query=${encodeURIComponent(subject + ' problems ' + (examName || ''))}`,
        videoTitle: `${subject} Practice Questions`,
        channel: 'Curated by AI',
        duration: '2:45:00',
        subtopics: ['Numerical Problems', 'Conceptual Questions', 'Tricks & Shortcuts'],
        pyqCount: 40
      },
      {
        id: `${subject.toLowerCase()}_revision`,
        name: `${subject} Quick Revision`,
        priority: 'medium',
        weightage: 15,
        videoLink: `https://youtube.com/results?search_query=${encodeURIComponent(subject + ' revision ' + (examName || ''))}`,
        videoTitle: `${subject} Rapid Revision`,
        channel: 'Curated by AI',
        duration: '2:00:00',
        subtopics: ['Important Formulas', 'Key Concepts', 'Common Mistakes'],
        pyqCount: 20
      },
      {
        id: `${subject.toLowerCase()}_additional`,
        name: `${subject} Additional Topics`,
        priority: 'low',
        weightage: 10,
        videoLink: `https://youtube.com/results?search_query=${encodeURIComponent(subject + ' extra topics ' + (examName || ''))}`,
        videoTitle: `${subject} Supplementary Content`,
        channel: 'Curated by AI',
        duration: '1:30:00',
        subtopics: ['Bonus Topics', 'Edge Cases'],
        pyqCount: 10
      }
    ];
  };

  const topics: Record<string, Topic[]> = {
    'Physics': [
      {
        id: 'phy_mechanics',
        name: 'Mechanics (Laws of Motion, Work-Energy)',
        priority: 'high',
        weightage: 25,
        videoLink: 'https://youtube.com/watch?v=example1',
        videoTitle: 'Complete Mechanics Marathon | JEE/NEET',
        channel: 'Physics Wallah',
        duration: '3:45:20',
        subtopics: ['Newton\'s Laws', 'Friction', 'Work-Energy Theorem', 'Circular Motion'],
        pyqCount: 45
      },
      {
        id: 'phy_electro',
        name: 'Electrostatics & Current Electricity',
        priority: 'high',
        weightage: 22,
        videoLink: 'https://youtube.com/watch?v=example2',
        videoTitle: 'Electrostatics One Shot | All Concepts',
        channel: 'Unacademy JEE',
        duration: '4:15:30',
        subtopics: ['Coulomb\'s Law', 'Gauss Law', 'Capacitance', 'Ohm\'s Law', 'Kirchhoff'],
        pyqCount: 38
      },
      {
        id: 'phy_modern',
        name: 'Modern Physics',
        priority: 'high',
        weightage: 18,
        videoLink: 'https://youtube.com/watch?v=example3',
        videoTitle: 'Modern Physics Complete Chapter',
        channel: 'Vedantu',
        duration: '2:30:45',
        subtopics: ['Photoelectric Effect', 'Bohr Model', 'Nuclear Physics'],
        pyqCount: 28
      },
      {
        id: 'phy_waves',
        name: 'Waves & Oscillations',
        priority: 'medium',
        weightage: 15,
        videoLink: 'https://youtube.com/watch?v=example4',
        videoTitle: 'SHM and Waves Full Theory',
        channel: 'Mohit Tyagi',
        duration: '2:10:15',
        subtopics: ['SHM', 'Sound Waves', 'Doppler Effect'],
        pyqCount: 22
      },
      {
        id: 'phy_thermo',
        name: 'Thermodynamics',
        priority: 'medium',
        weightage: 12,
        videoLink: 'https://youtube.com/watch?v=example5',
        videoTitle: 'Thermodynamics Crash Course',
        channel: 'Competishun',
        duration: '1:50:30',
        subtopics: ['Laws of Thermodynamics', 'Heat Engines'],
        pyqCount: 18
      },
      {
        id: 'phy_optics',
        name: 'Ray & Wave Optics',
        priority: 'low',
        weightage: 8,
        videoLink: 'https://youtube.com/watch?v=example6',
        videoTitle: 'Optics Quick Revision',
        channel: 'Physics Galaxy',
        duration: '1:30:20',
        subtopics: ['Reflection', 'Refraction', 'Interference'],
        pyqCount: 12
      }
    ],
    'Chemistry': [
      {
        id: 'chem_organic',
        name: 'Organic Chemistry GOC & Reactions',
        priority: 'high',
        weightage: 35,
        videoLink: 'https://youtube.com/watch?v=example7',
        videoTitle: 'Complete Organic Chemistry | All Reactions',
        channel: 'Pahul Sir',
        duration: '5:20:40',
        subtopics: ['GOC', 'Hydrocarbons', 'Named Reactions', 'Mechanisms'],
        pyqCount: 52
      },
      {
        id: 'chem_physical',
        name: 'Physical Chemistry (Mole, Equilibrium)',
        priority: 'high',
        weightage: 30,
        videoLink: 'https://youtube.com/watch?v=example8',
        videoTitle: 'Physical Chemistry Numerical Masterclass',
        channel: 'Arvind Arora',
        duration: '3:40:25',
        subtopics: ['Mole Concept', 'Equilibrium', 'Electrochemistry', 'Kinetics'],
        pyqCount: 41
      },
      {
        id: 'chem_inorganic',
        name: 'Inorganic Chemistry',
        priority: 'high',
        weightage: 25,
        videoLink: 'https://youtube.com/watch?v=example9',
        videoTitle: 'Inorganic Chemistry Memory Techniques',
        channel: 'Unacademy NEET',
        duration: '2:55:30',
        subtopics: ['Periodic Table', 'Chemical Bonding', 'Coordination'],
        pyqCount: 35
      },
      {
        id: 'chem_env',
        name: 'Environmental Chemistry',
        priority: 'low',
        weightage: 10,
        videoLink: 'https://youtube.com/watch?v=example10',
        videoTitle: 'Environmental Chemistry Rapid Revision',
        channel: 'Etoos',
        duration: '45:15',
        subtopics: ['Pollution', 'Green Chemistry'],
        pyqCount: 8
      }
    ],
    'Mathematics': [
      {
        id: 'math_calculus',
        name: 'Calculus (Differentiation, Integration)',
        priority: 'high',
        weightage: 30,
        videoLink: 'https://youtube.com/watch?v=example11',
        videoTitle: 'Complete Calculus for JEE | All Techniques',
        channel: 'Neha Agrawal',
        duration: '4:30:50',
        subtopics: ['Limits', 'Derivatives', 'Integration', 'DPP', 'Definite Integrals'],
        pyqCount: 48
      },
      {
        id: 'math_algebra',
        name: 'Algebra (Complex, Quadratic, Sequences)',
        priority: 'high',
        weightage: 25,
        videoLink: 'https://youtube.com/watch?v=example12',
        videoTitle: 'Algebra Marathon | JEE Advanced Level',
        channel: 'Mohit Tyagi',
        duration: '3:50:30',
        subtopics: ['Complex Numbers', 'Quadratic', 'Progressions', 'Binomial'],
        pyqCount: 42
      },
      {
        id: 'math_coordinate',
        name: 'Coordinate Geometry',
        priority: 'high',
        weightage: 20,
        videoLink: 'https://youtube.com/watch?v=example13',
        videoTitle: 'Coordinate Geometry Complete',
        channel: 'Unacademy JEE',
        duration: '3:20:15',
        subtopics: ['Straight Line', 'Circle', 'Parabola', 'Ellipse', 'Hyperbola'],
        pyqCount: 38
      },
      {
        id: 'math_vector',
        name: 'Vectors & 3D Geometry',
        priority: 'medium',
        weightage: 15,
        videoLink: 'https://youtube.com/watch?v=example14',
        videoTitle: 'Vectors 3D Complete Theory',
        channel: 'Physics Wallah',
        duration: '2:40:20',
        subtopics: ['Vector Operations', 'Dot/Cross Product', '3D Lines & Planes'],
        pyqCount: 25
      },
      {
        id: 'math_prob',
        name: 'Probability & Statistics',
        priority: 'low',
        weightage: 10,
        videoLink: 'https://youtube.com/watch?v=example15',
        videoTitle: 'Probability Tricks and Shortcuts',
        channel: 'Vedantu',
        duration: '1:45:30',
        subtopics: ['Probability', 'Distributions', 'Mean/Variance'],
        pyqCount: 15
      }
    ],
    'Biology': [
      {
        id: 'bio_physio',
        name: 'Human Physiology',
        priority: 'high',
        weightage: 25,
        videoLink: 'https://youtube.com/watch?v=example16',
        videoTitle: 'Human Physiology Complete | NEET 2026',
        channel: 'Dr. Vani Sood',
        duration: '4:10:35',
        subtopics: ['Digestion', 'Circulation', 'Respiration', 'Excretion', 'Neural'],
        pyqCount: 45
      },
      {
        id: 'bio_genetics',
        name: 'Genetics & Evolution',
        priority: 'high',
        weightage: 22,
        videoLink: 'https://youtube.com/watch?v=example17',
        videoTitle: 'Genetics One Shot | All Concepts',
        channel: 'Biology By Vani',
        duration: '3:30:20',
        subtopics: ['Mendelian', 'Molecular Basis', 'Evolution'],
        pyqCount: 38
      },
      {
        id: 'bio_plant',
        name: 'Plant Physiology',
        priority: 'high',
        weightage: 18,
        videoLink: 'https://youtube.com/watch?v=example18',
        videoTitle: 'Plant Physiology Marathon',
        channel: 'Vedantu NEET',
        duration: '3:05:45',
        subtopics: ['Photosynthesis', 'Respiration', 'Growth'],
        pyqCount: 32
      },
      {
        id: 'bio_ecology',
        name: 'Ecology & Environment',
        priority: 'medium',
        weightage: 15,
        videoLink: 'https://youtube.com/watch?v=example19',
        videoTitle: 'Ecology Complete Chapter',
        channel: 'Unacademy NEET',
        duration: '2:20:30',
        subtopics: ['Ecosystem', 'Biodiversity', 'Environmental Issues'],
        pyqCount: 25
      },
      {
        id: 'bio_repro',
        name: 'Reproduction',
        priority: 'medium',
        weightage: 12,
        videoLink: 'https://youtube.com/watch?v=example20',
        videoTitle: 'Reproduction Rapid Revision',
        channel: 'Biology with Supriya',
        duration: '1:50:15',
        subtopics: ['Sexual Reproduction', 'Reproductive Health'],
        pyqCount: 18
      },
      {
        id: 'bio_biotech',
        name: 'Biotechnology',
        priority: 'low',
        weightage: 8,
        videoLink: 'https://youtube.com/watch?v=example21',
        videoTitle: 'Biotechnology Quick Notes',
        channel: 'Shomu Biology',
        duration: '1:15:20',
        subtopics: ['Genetic Engineering', 'Applications'],
        pyqCount: 12
      }
    ]
  };

  // Return predefined topics if available, otherwise generate generic topics
  return topics[subject] || generateGenericTopics(subject);
};

export function TopicChecklist({ profile, onNavigate, topicProgress, onUpdateProgress }: TopicChecklistProps) {
  const [selectedSubject, setSelectedSubject] = useState(profile.subjects[0]);
  const examName = profile.targetExams[0];
  const topics = getTopicsForSubject(selectedSubject, examName);

  const highPriorityTopics = topics.filter(t => t.priority === 'high');
  const mediumPriorityTopics = topics.filter(t => t.priority === 'medium');
  const lowPriorityTopics = topics.filter(t => t.priority === 'low');

  const totalWeightage = highPriorityTopics.reduce((sum, t) => sum + t.weightage, 0);

  const isCommonExam = ['NEET', 'JEE Main', 'JEE Advanced', 'CUET', 'CLAT', 'CA Foundation', 'CS Foundation'].includes(examName);
  const isCustomContent = topics.length > 0 && topics[0].channel === 'Curated by AI';

  const getTopicCompletion = (topicId: string) => {
    const progress = topicProgress[topicId];
    if (!progress) return 0;

    const videoScore = progress.videoWatchProgress;
    const notesScore = progress.notesCompleted ? 100 : 0;
    const practiceScore = progress.practiceCompleted ? 100 : 0;

    return Math.round((videoScore * 0.5 + notesScore * 0.3 + practiceScore * 0.2) / 100 * 100);
  };

  const handleVideoProgress = (topicId: string, progress: number) => {
    onUpdateProgress(topicId, { videoWatchProgress: progress });
  };

  return (
    <div className="min-h-screen pb-6 bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-b-[3rem] p-6 pb-8 text-white shadow-xl">
        <button onClick={() => onNavigate('home')} className="mb-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl mb-2">Topic-wise Mastery Checklist</h1>
        <p className="text-indigo-100 text-sm">80/20 optimized learning path with video lectures</p>
      </div>

      <div className="px-6 -mt-4">
        {/* AI Custom Content Notice */}
        {isCustomContent && (
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-4 mb-6 text-white shadow-lg">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🤖</div>
              <div className="flex-1">
                <h3 className="text-sm mb-1">AI-Customized Content for {examName}</h3>
                <p className="text-xs text-blue-100">
                  We've intelligently curated topics and YouTube resources specifically for your exam.
                  Click any video link to find the best content on YouTube!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Subject Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {profile.subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap text-sm ${
                  selectedSubject === subject
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* 80/20 Summary */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg mb-1">Focus on High Priority</h2>
              <p className="text-emerald-100 text-sm">
                {highPriorityTopics.length} topics cover {totalWeightage}% of {isCustomContent ? `${examName}` : 'exam'}
              </p>
            </div>
            <div className="text-4xl">{isCustomContent ? '🤖' : '🎯'}</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Strategic Coverage</span>
              <span>{totalWeightage}%</span>
            </div>
            <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all"
                style={{ width: `${totalWeightage}%` }}
              />
            </div>
          </div>
        </div>

        {/* High Priority Topics */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <h2 className="text-lg">High Priority ({highPriorityTopics.length} topics)</h2>
          </div>
          <div className="space-y-3">
            {highPriorityTopics.map((topic) => {
              const completion = getTopicCompletion(topic.id);
              const progress = topicProgress[topic.id];

              return (
                <div key={topic.id} className="bg-white rounded-2xl shadow-md border-l-4 border-red-500 overflow-hidden">
                  {/* Header */}
                  <div className="p-4 pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-sm mb-1">{topic.name}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                            {topic.weightage}% weightage
                          </span>
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                            {topic.pyqCount} PYQs
                          </span>
                          {isCustomContent && (
                            <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <span>🤖</span>
                              AI Curated
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl ${completion === 100 ? 'text-green-500' : 'text-gray-400'}`}>
                          {completion === 100 ? <CheckCircle className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{completion}%</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all"
                        style={{ width: `${completion}%` }}
                      />
                    </div>

                    {/* Video Section */}
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-3 mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Youtube className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm mb-1">{topic.videoTitle}</div>
                          <div className="text-xs text-gray-600 mb-2">
                            {topic.channel} • {topic.duration}
                            {isCustomContent && (
                              <span className="block text-xs text-blue-600 mt-0.5">
                                📺 Opens YouTube search for best videos
                              </span>
                            )}
                          </div>
                          <a
                            href={topic.videoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
                          >
                            <Play className="w-3 h-3" />
                            {isCustomContent ? 'Find Videos' : 'Watch Lecture'}
                          </a>
                        </div>
                      </div>

                      {/* Video Progress */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-600">Video Progress</span>
                          <span className="text-gray-700">{progress?.videoWatchProgress || 0}%</span>
                        </div>
                        <div className="flex gap-1">
                          {[0, 25, 50, 75, 100].map((val) => (
                            <button
                              key={val}
                              onClick={() => handleVideoProgress(topic.id, val)}
                              className={`flex-1 py-1.5 rounded text-xs transition-all ${
                                (progress?.videoWatchProgress || 0) >= val
                                  ? 'bg-red-500 text-white'
                                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                              }`}
                            >
                              {val}%
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Subtopics */}
                    <div className="mb-3">
                      <div className="text-xs text-gray-600 mb-2">Key Topics:</div>
                      <div className="flex flex-wrap gap-1">
                        {topic.subtopics.map((sub, i) => (
                          <span key={i} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-lg">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Checklist */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onUpdateProgress(topic.id, { notesCompleted: !progress?.notesCompleted })}
                        className={`flex items-center gap-2 p-2 rounded-lg border-2 transition-all text-xs ${
                          progress?.notesCompleted
                            ? 'bg-green-50 border-green-500 text-green-700'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                        <span>Notes</span>
                        {progress?.notesCompleted && <CheckCircle className="w-3 h-3 ml-auto" />}
                      </button>
                      <button
                        onClick={() => onUpdateProgress(topic.id, { practiceCompleted: !progress?.practiceCompleted })}
                        className={`flex items-center gap-2 p-2 rounded-lg border-2 transition-all text-xs ${
                          progress?.practiceCompleted
                            ? 'bg-green-50 border-green-500 text-green-700'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Practice</span>
                        {progress?.practiceCompleted && <CheckCircle className="w-3 h-3 ml-auto" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Medium Priority Topics */}
        {mediumPriorityTopics.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <h2 className="text-lg">Medium Priority ({mediumPriorityTopics.length} topics)</h2>
            </div>
            <div className="space-y-3">
              {mediumPriorityTopics.map((topic) => {
                const completion = getTopicCompletion(topic.id);

                return (
                  <div key={topic.id} className="bg-white rounded-xl shadow border-l-4 border-yellow-500 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-sm mb-1">{topic.name}</h3>
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                          {topic.weightage}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">{completion}%</div>
                    </div>
                    <a
                      href={topic.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                    >
                      <Play className="w-3 h-3" />
                      {topic.videoTitle}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Low Priority Topics */}
        {lowPriorityTopics.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <h2 className="text-lg">Low Priority ({lowPriorityTopics.length} topics)</h2>
              <span className="text-xs text-gray-500">Complete after high priority</span>
            </div>
            <div className="space-y-2">
              {lowPriorityTopics.map((topic) => (
                <div key={topic.id} className="bg-white rounded-xl shadow border-l-4 border-green-500 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm">{topic.name}</h3>
                      <span className="text-xs text-gray-500">{topic.weightage}% • {topic.duration}</span>
                    </div>
                    <a
                      href={topic.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700"
                    >
                      <Play className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
