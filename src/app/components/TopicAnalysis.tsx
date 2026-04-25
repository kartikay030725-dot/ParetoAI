import { ArrowLeft, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import type { StudentProfile, Screen } from '../App';

type TopicAnalysisProps = {
  profile: StudentProfile;
  onNavigate: (screen: Screen) => void;
};

type Topic = {
  name: string;
  priority: 'high' | 'medium' | 'low';
  weightage: number;
  whyImportant: string;
  subtopics: string[];
  commonMistakes: string[];
};

const getTopicsForSubject = (subject: string): Topic[] => {
  const topicDatabase: Record<string, Topic[]> = {
    'Mathematics': [
      {
        name: 'Algebra',
        priority: 'high',
        weightage: 30,
        whyImportant: 'Forms 30% of CBSE/ICSE board exams; foundation for higher math',
        subtopics: ['Linear Equations', 'Quadratic Equations', 'Polynomials', 'Factorization'],
        commonMistakes: ['Sign errors in equations', 'Formula confusion']
      },
      {
        name: 'Geometry',
        priority: 'high',
        weightage: 25,
        whyImportant: 'Proof-based questions; high scoring',
        subtopics: ['Triangles', 'Circles', 'Constructions', 'Coordinate Geometry'],
        commonMistakes: ['Theorem statement errors', 'Wrong property application']
      },
      {
        name: 'Trigonometry',
        priority: 'high',
        weightage: 20,
        whyImportant: 'Direct formula application; scoring',
        subtopics: ['Ratios', 'Identities', 'Heights & Distances'],
        commonMistakes: ['Identity confusion', 'Angle calculation errors']
      },
      {
        name: 'Statistics',
        priority: 'medium',
        weightage: 15,
        whyImportant: 'Easy scoring; calculation-based',
        subtopics: ['Mean/Median/Mode', 'Probability', 'Data Handling'],
        commonMistakes: ['Formula selection errors']
      },
      {
        name: 'Mensuration',
        priority: 'medium',
        weightage: 10,
        whyImportant: 'Formula-based; moderate difficulty',
        subtopics: ['Areas', 'Volumes', 'Surface Areas'],
        commonMistakes: ['Formula mix-ups', 'Unit conversion']
      }
    ],
    'Science': [
      {
        name: 'Chemistry',
        priority: 'high',
        weightage: 33,
        whyImportant: 'Equal weightage in boards; reaction-based',
        subtopics: ['Chemical Reactions', 'Acids/Bases/Salts', 'Periodic Table', 'Carbon Compounds'],
        commonMistakes: ['Equation balancing', 'Valency errors']
      },
      {
        name: 'Physics',
        priority: 'high',
        weightage: 33,
        whyImportant: 'Numerical problems; formula application',
        subtopics: ['Light', 'Electricity', 'Magnetic Effects', 'Energy'],
        commonMistakes: ['Unit confusion', 'Sign convention']
      },
      {
        name: 'Biology',
        priority: 'high',
        weightage: 34,
        whyImportant: 'Diagram-based; conceptual',
        subtopics: ['Life Processes', 'Human Body', 'Heredity', 'Environment'],
        commonMistakes: ['Diagram labeling', 'Process sequence']
      }
    ],
    'Social Science': [
      {
        name: 'History',
        priority: 'high',
        weightage: 30,
        whyImportant: 'Major events & dates; long answers',
        subtopics: ['Nationalism', 'World Wars', 'Indian Independence', 'Revolutions'],
        commonMistakes: ['Date errors', 'Event sequence confusion']
      },
      {
        name: 'Geography',
        priority: 'high',
        weightage: 25,
        whyImportant: 'Map work; resources',
        subtopics: ['Resources', 'Agriculture', 'Industries', 'Map Skills'],
        commonMistakes: ['Map location errors', 'Type classification']
      },
      {
        name: 'Political Science',
        priority: 'medium',
        weightage: 25,
        whyImportant: 'Conceptual; current affairs',
        subtopics: ['Democracy', 'Constitution', 'Elections', 'Federalism'],
        commonMistakes: ['Article confusion', 'Amendment errors']
      },
      {
        name: 'Economics',
        priority: 'medium',
        weightage: 20,
        whyImportant: 'Theory + numericals',
        subtopics: ['Development', 'Sectors', 'Money & Credit', 'Globalization'],
        commonMistakes: ['GDP/GNP confusion', 'Sector classification']
      }
    ],
    'Physics': [
      {
        name: 'Mechanics',
        priority: 'high',
        weightage: 25,
        whyImportant: 'Foundation for all physics; 30% of JEE questions',
        subtopics: ['Laws of Motion', 'Work Energy Power', 'Rotational Motion'],
        commonMistakes: ['Sign convention errors', 'Missing pseudo forces in non-inertial frames']
      },
      {
        name: 'Electromagnetism',
        priority: 'high',
        weightage: 20,
        whyImportant: 'Highest weightage in competitive exams',
        subtopics: ['Electrostatics', 'Current Electricity', 'Magnetic Effects'],
        commonMistakes: ['Gauss law application errors', 'KVL/KCL sign mistakes']
      },
      {
        name: 'Modern Physics',
        priority: 'high',
        weightage: 18,
        whyImportant: 'Direct formula-based; easy scoring',
        subtopics: ['Photoelectric Effect', 'Atomic Structure', 'Nuclear Physics'],
        commonMistakes: ['Confusing energy vs wavelength relationships']
      },
      {
        name: 'Thermodynamics',
        priority: 'medium',
        weightage: 15,
        whyImportant: 'Conceptual; moderate difficulty',
        subtopics: ['Laws of Thermodynamics', 'Heat Engines', 'Kinetic Theory'],
        commonMistakes: ['Isothermal vs adiabatic process confusion']
      },
      {
        name: 'Optics',
        priority: 'medium',
        weightage: 12,
        whyImportant: 'Frequent in board exams',
        subtopics: ['Ray Optics', 'Wave Optics'],
        commonMistakes: ['Sign convention in lens/mirror formulas']
      },
      {
        name: 'Oscillations & Waves',
        priority: 'low',
        weightage: 10,
        whyImportant: 'Limited questions; lower priority',
        subtopics: ['SHM', 'Sound Waves'],
        commonMistakes: ['Phase difference calculations']
      }
    ],
    'Chemistry': [
      {
        name: 'Organic Chemistry',
        priority: 'high',
        weightage: 35,
        whyImportant: 'Largest portion in NEET/JEE; pattern recognition',
        subtopics: ['Reaction Mechanisms', 'Named Reactions', 'GOC'],
        commonMistakes: ['Stereochemistry errors', 'Missing resonance structures']
      },
      {
        name: 'Physical Chemistry',
        priority: 'high',
        weightage: 30,
        whyImportant: 'High scoring; numerical problems',
        subtopics: ['Mole Concept', 'Equilibrium', 'Electrochemistry'],
        commonMistakes: ['Unit conversion errors', 'Log calculations']
      },
      {
        name: 'Inorganic Chemistry',
        priority: 'high',
        weightage: 25,
        whyImportant: 'Memory-based; quick revision friendly',
        subtopics: ['Periodic Table', 'Chemical Bonding', 'Coordination Compounds'],
        commonMistakes: ['Exception cases in trends']
      },
      {
        name: 'Environmental Chemistry',
        priority: 'low',
        weightage: 10,
        whyImportant: 'Limited scope; theory-based',
        subtopics: ['Pollution', 'Green Chemistry'],
        commonMistakes: ['Factual errors']
      }
    ],
    'Mathematics': [
      {
        name: 'Calculus',
        priority: 'high',
        weightage: 30,
        whyImportant: 'Maximum questions in JEE; applications across topics',
        subtopics: ['Limits', 'Differentiation', 'Integration', 'Differential Equations'],
        commonMistakes: ['Integration by parts selection', 'Missing constant C']
      },
      {
        name: 'Algebra',
        priority: 'high',
        weightage: 25,
        whyImportant: 'High frequency; multiple subtopics',
        subtopics: ['Complex Numbers', 'Quadratic Equations', 'Sequences'],
        commonMistakes: ['Root calculation errors', 'Domain/range confusion']
      },
      {
        name: 'Coordinate Geometry',
        priority: 'high',
        weightage: 20,
        whyImportant: 'Scoring; standard formulas',
        subtopics: ['Straight Lines', 'Circles', 'Parabola', 'Ellipse', 'Hyperbola'],
        commonMistakes: ['Eccentricity formula confusion']
      },
      {
        name: 'Vectors & 3D',
        priority: 'medium',
        weightage: 15,
        whyImportant: 'Moderate difficulty; conceptual',
        subtopics: ['Vector Operations', 'Planes', 'Lines in 3D'],
        commonMistakes: ['Dot vs cross product usage']
      },
      {
        name: 'Probability & Statistics',
        priority: 'low',
        weightage: 10,
        whyImportant: 'Limited questions; easier when practiced',
        subtopics: ['Probability', 'Distributions'],
        commonMistakes: ['Conditional probability errors']
      }
    ],
    'Biology': [
      {
        name: 'Human Physiology',
        priority: 'high',
        weightage: 25,
        whyImportant: 'Largest NEET weightage; diagram-based',
        subtopics: ['Digestion', 'Circulation', 'Nervous System', 'Endocrine'],
        commonMistakes: ['Hormone function mix-ups', 'Pathway sequence errors']
      },
      {
        name: 'Genetics & Evolution',
        priority: 'high',
        weightage: 22,
        whyImportant: 'Conceptual + numerical; high scoring',
        subtopics: ['Mendelian Genetics', 'Molecular Basis', 'Evolution'],
        commonMistakes: ['Punnett square errors', 'Codon table mistakes']
      },
      {
        name: 'Plant Physiology',
        priority: 'high',
        weightage: 18,
        whyImportant: 'Frequent in NEET; process-based',
        subtopics: ['Photosynthesis', 'Respiration', 'Plant Growth'],
        commonMistakes: ['C3 vs C4 pathway confusion']
      },
      {
        name: 'Ecology',
        priority: 'medium',
        weightage: 15,
        whyImportant: 'Theory + application based',
        subtopics: ['Ecosystem', 'Biodiversity', 'Environmental Issues'],
        commonMistakes: ['Trophic level calculations']
      },
      {
        name: 'Cell Biology',
        priority: 'medium',
        weightage: 12,
        whyImportant: 'Foundation chapter; diagrams important',
        subtopics: ['Cell Structure', 'Cell Cycle', 'Biomolecules'],
        commonMistakes: ['Organelle function errors']
      },
      {
        name: 'Reproduction',
        priority: 'low',
        weightage: 8,
        whyImportant: 'Limited scope; easy to revise',
        subtopics: ['Sexual Reproduction', 'Reproductive Health'],
        commonMistakes: ['Developmental stage sequence']
      }
    ]
  };

  return topicDatabase[subject] || [];
};

export function TopicAnalysis({ profile, onNavigate }: TopicAnalysisProps) {
  const selectedSubject = profile.subjects[0];
  const topics = getTopicsForSubject(selectedSubject);

  const highPriorityTopics = topics.filter(t => t.priority === 'high');
  const mediumPriorityTopics = topics.filter(t => t.priority === 'medium');
  const lowPriorityTopics = topics.filter(t => t.priority === 'low');

  const totalHighWeightage = highPriorityTopics.reduce((sum, t) => sum + t.weightage, 0);

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-b-[3rem] p-6 pb-8 text-white mb-6">
        <button onClick={() => onNavigate('home')} className="mb-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl mb-2">80/20 Analysis</h1>
        <p className="text-purple-100 text-sm">Smart prioritization for {selectedSubject}</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Overview Card */}
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <h2 className="text-xl mb-2">The 80/20 Rule</h2>
          <p className="text-green-100 text-sm mb-4">
            Focus on {highPriorityTopics.length} high-priority topics that cover ~{totalHighWeightage}% of exam questions
          </p>
          <div className="bg-white/20 backdrop-blur rounded-xl p-3">
            <div className="flex items-center justify-between text-sm mb-1">
              <span>High Priority Coverage</span>
              <span>{totalHighWeightage}%</span>
            </div>
            <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all"
                style={{ width: `${totalHighWeightage}%` }}
              />
            </div>
          </div>
        </div>

        {/* High Priority Topics */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h2>High Priority ({highPriorityTopics.length})</h2>
          </div>
          <div className="space-y-3">
            {highPriorityTopics.map((topic, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 shadow-lg border-l-4 border-red-500">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="mb-1">{topic.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                        {topic.weightage}% weightage
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Why Important:</p>
                    <p className="text-gray-800">{topic.whyImportant}</p>
                  </div>

                  <div>
                    <p className="text-gray-600 mb-1">Key Subtopics:</p>
                    <div className="flex flex-wrap gap-1">
                      {topic.subtopics.map((sub, i) => (
                        <span key={i} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-lg">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-600 mb-1">Common Mistakes:</p>
                    <ul className="space-y-1">
                      {topic.commonMistakes.map((mistake, i) => (
                        <li key={i} className="text-gray-700 text-xs flex items-start gap-1">
                          <span className="text-orange-500 mt-0.5">⚠</span>
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medium Priority Topics */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-yellow-500" />
            <h2>Medium Priority ({mediumPriorityTopics.length})</h2>
          </div>
          <div className="space-y-3">
            {mediumPriorityTopics.map((topic, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow border-l-4 border-yellow-500">
                <h3 className="text-sm mb-1">{topic.name}</h3>
                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                  {topic.weightage}% weightage
                </span>
                <p className="text-xs text-gray-600 mt-2">{topic.whyImportant}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Low Priority Topics */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h2>Low Priority ({lowPriorityTopics.length})</h2>
          </div>
          <div className="space-y-3">
            {lowPriorityTopics.map((topic, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow border-l-4 border-green-500">
                <h3 className="text-sm mb-1">{topic.name}</h3>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  {topic.weightage}% weightage
                </span>
                <p className="text-xs text-gray-600 mt-2">Revise after high-priority topics</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
