import { useState } from 'react';
import { ArrowLeft, Search, Play, Plus, Check, ThumbsUp, Clock, TrendingUp } from 'lucide-react';
import type { StudentProfile, Screen } from '../App';

type YouTubeHubProps = {
  profile: StudentProfile;
  onNavigate: (screen: Screen) => void;
};

type Video = {
  id: string;
  title: string;
  channel: string;
  duration: string;
  views: string;
  thumbnail: string;
  priority: 'high' | 'medium' | 'low';
  topic: string;
  added: boolean;
};

const getVideosForSubject = (subject: string): Video[] => {
  const videoDatabase: Record<string, Video[]> = {
    'Mathematics': [
      {
        id: 'math1',
        title: 'Algebra Complete Chapter | CBSE Class 10',
        channel: 'Maths with Anil Kumar',
        duration: '2:15:30',
        views: '1.5M',
        thumbnail: '📐',
        priority: 'high',
        topic: 'Algebra',
        added: false
      },
      {
        id: 'math2',
        title: 'Geometry Theorems & Proofs | ICSE Class 10',
        channel: 'Vedantu Class 10',
        duration: '1:45:20',
        views: '890K',
        thumbnail: '📏',
        priority: 'high',
        topic: 'Geometry',
        added: false
      },
      {
        id: 'math3',
        title: 'Trigonometry One Shot | Boards 2026',
        channel: 'Physics Wallah Foundation',
        duration: '1:30:15',
        views: '1.2M',
        thumbnail: '📊',
        priority: 'high',
        topic: 'Trigonometry',
        added: false
      }
    ],
    'Science': [
      {
        id: 'sci1',
        title: 'Chemical Reactions Complete | CBSE Class 10',
        channel: 'Science with Hazel',
        duration: '1:50:30',
        views: '2.1M',
        thumbnail: '🧪',
        priority: 'high',
        topic: 'Chemistry',
        added: false
      },
      {
        id: 'sci2',
        title: 'Electricity & Magnetism | Board Exam Focus',
        channel: 'Vedantu',
        duration: '2:05:45',
        views: '1.7M',
        thumbnail: '⚡',
        priority: 'high',
        topic: 'Physics',
        added: false
      },
      {
        id: 'sci3',
        title: 'Life Processes Animation | Biology Class 10',
        channel: 'Magnet Brains',
        duration: '1:25:20',
        views: '1.4M',
        thumbnail: '🫀',
        priority: 'high',
        topic: 'Biology',
        added: false
      }
    ],
    'Social Science': [
      {
        id: 'sst1',
        title: 'Nationalism in India | History Class 10',
        channel: 'Social School by Unacademy',
        duration: '1:35:30',
        views: '980K',
        thumbnail: '📜',
        priority: 'high',
        topic: 'History',
        added: false
      },
      {
        id: 'sst2',
        title: 'Resources & Development | Geography',
        channel: 'Digraj Sir',
        duration: '1:20:15',
        views: '750K',
        thumbnail: '🌍',
        priority: 'high',
        topic: 'Geography',
        added: false
      },
      {
        id: 'sst3',
        title: 'Democracy & Diversity | Political Science',
        channel: 'Sunlike Study',
        duration: '58:30',
        views: '650K',
        thumbnail: '🏛️',
        priority: 'medium',
        topic: 'Political Science',
        added: false
      }
    ],
    'Physics': [
      {
        id: '1',
        title: 'Laws of Motion - Complete Chapter | NEET Physics',
        channel: 'Physics Wallah',
        duration: '2:45:30',
        views: '2.3M',
        thumbnail: '🎯',
        priority: 'high',
        topic: 'Mechanics',
        added: false
      },
      {
        id: '2',
        title: 'Electrostatics One Shot | JEE Mains 2024',
        channel: 'Unacademy JEE',
        duration: '3:15:20',
        views: '1.8M',
        thumbnail: '⚡',
        priority: 'high',
        topic: 'Electromagnetism',
        added: false
      },
      {
        id: '3',
        title: 'Modern Physics Rapid Revision | Class 12',
        channel: 'Vedantu',
        duration: '1:30:45',
        views: '950K',
        thumbnail: '🔬',
        priority: 'high',
        topic: 'Modern Physics',
        added: false
      },
      {
        id: '4',
        title: 'Thermodynamics PYQ Discussion',
        channel: 'Competishun',
        duration: '58:30',
        views: '450K',
        thumbnail: '🌡️',
        priority: 'medium',
        topic: 'Thermodynamics',
        added: false
      }
    ],
    'Chemistry': [
      {
        id: '5',
        title: 'Organic Chemistry GOC Complete Marathon',
        channel: 'Pahul Sir',
        duration: '4:20:15',
        views: '3.1M',
        thumbnail: '🧪',
        priority: 'high',
        topic: 'Organic Chemistry',
        added: false
      },
      {
        id: '6',
        title: 'Mole Concept & Stoichiometry One Shot',
        channel: 'Arvind Arora',
        duration: '2:10:30',
        views: '1.5M',
        thumbnail: '⚖️',
        priority: 'high',
        topic: 'Physical Chemistry',
        added: false
      },
      {
        id: '7',
        title: 'Periodic Table Trends - Visual Learning',
        channel: 'Crash Course',
        duration: '45:20',
        views: '2.7M',
        thumbnail: '📊',
        priority: 'high',
        topic: 'Inorganic Chemistry',
        added: false
      }
    ],
    'Mathematics': [
      {
        id: '8',
        title: 'Integration Techniques Complete Guide | JEE',
        channel: 'Neha Agrawal',
        duration: '3:35:40',
        views: '1.9M',
        thumbnail: '∫',
        priority: 'high',
        topic: 'Calculus',
        added: false
      },
      {
        id: '9',
        title: 'Complex Numbers Marathon Session',
        channel: 'Mohit Tyagi',
        duration: '2:50:15',
        views: '1.2M',
        thumbnail: 'ℂ',
        priority: 'high',
        topic: 'Algebra',
        added: false
      },
      {
        id: '10',
        title: 'Conic Sections Quick Revision',
        channel: 'Unacademy',
        duration: '1:45:20',
        views: '890K',
        thumbnail: '⭕',
        priority: 'high',
        topic: 'Coordinate Geometry',
        added: false
      }
    ],
    'Biology': [
      {
        id: '11',
        title: 'Human Physiology Complete Chapter | NEET',
        channel: 'Dr. Vani Sood',
        duration: '3:10:30',
        views: '2.5M',
        thumbnail: '🫀',
        priority: 'high',
        topic: 'Human Physiology',
        added: false
      },
      {
        id: '12',
        title: 'Genetics & Evolution One Shot',
        channel: 'Biology By Vani',
        duration: '2:40:15',
        views: '1.7M',
        thumbnail: '🧬',
        priority: 'high',
        topic: 'Genetics',
        added: false
      },
      {
        id: '13',
        title: 'Photosynthesis Animated Explanation',
        channel: 'Shomu\'s Biology',
        duration: '52:30',
        views: '1.3M',
        thumbnail: '🌱',
        priority: 'high',
        topic: 'Plant Physiology',
        added: false
      }
    ]
  };

  return videoDatabase[subject] || [];
};

export function YouTubeHub({ profile, onNavigate }: YouTubeHubProps) {
  const [selectedSubject, setSelectedSubject] = useState(profile.subjects[0]);
  const [videos, setVideos] = useState(getVideosForSubject(profile.subjects[0]));
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
    setVideos(getVideosForSubject(subject));
  };

  const toggleAddVideo = (videoId: string) => {
    setVideos(videos.map(v =>
      v.id === videoId ? { ...v, added: !v.added } : v
    ));
  };

  const addedCount = videos.filter(v => v.added).length;
  const highPriorityVideos = videos.filter(v => v.priority === 'high');

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-b-[3rem] p-6 pb-8 text-white mb-6">
        <button onClick={() => onNavigate('home')} className="mb-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl mb-2">YouTube Learning Hub</h1>
        <p className="text-red-100 text-sm mb-4">AI-curated videos for high-priority topics</p>

        {/* Search Bar */}
        <div className="bg-white/20 backdrop-blur rounded-2xl p-3 flex items-center gap-3">
          <Search className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder-white/70"
          />
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Subject Tabs */}
        <div className="overflow-x-auto -mx-6 px-6">
          <div className="flex gap-2 min-w-max">
            {profile.subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => handleSubjectChange(subject)}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  selectedSubject === subject
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:shadow-md'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm text-green-100">Your Playlist</h3>
              <div className="text-3xl mt-1">{addedCount} videos</div>
            </div>
            <Play className="w-12 h-12 text-white/30" />
          </div>
          <p className="text-sm text-green-100">
            {highPriorityVideos.length} high-priority recommendations available
          </p>
        </div>

        {/* High Priority Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-red-500" />
            <h2>High Priority (80/20 Optimized)</h2>
          </div>
          <div className="space-y-3">
            {highPriorityVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-2xl p-4 shadow-lg"
              >
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-32 h-20 bg-gradient-to-br from-red-200 to-pink-200 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                    {video.thumbnail}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm mb-1 line-clamp-2">{video.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">{video.channel}</p>

                    <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        {video.views}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                        {video.topic}
                      </span>
                      <button
                        onClick={() => toggleAddVideo(video.id)}
                        className={`ml-auto flex items-center gap-1 px-3 py-1 rounded-full text-xs transition-all ${
                          video.added
                            ? 'bg-green-500 text-white'
                            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        }`}
                      >
                        {video.added ? (
                          <>
                            <Check className="w-3 h-3" />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-5">
          <h3 className="text-sm mb-2 flex items-center gap-2">
            <span className="text-lg">🤖</span>
            AI Recommendation
          </h3>
          <p className="text-sm text-gray-700">
            Based on your 80/20 analysis, watching these {highPriorityVideos.length} videos will cover{' '}
            <span className="font-medium text-purple-700">~75% of exam-relevant content</span> for {selectedSubject}.
            Start with the top video for maximum impact!
          </p>
        </div>

        {/* Learning Path */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <h2 className="mb-4">Suggested Learning Path</h2>
          <div className="space-y-3">
            {highPriorityVideos.slice(0, 3).map((video, index) => (
              <div key={video.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 text-white flex items-center justify-center flex-shrink-0 text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{video.title}</p>
                  <p className="text-xs text-gray-500">{video.duration} • {video.topic}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
