type MascotProps = {
  mood: 'happy' | 'sleepy' | 'excited' | 'thinking';
  message?: string;
};

export function Mascot({ mood, message }: MascotProps) {
  const getMascotFace = () => {
    switch (mood) {
      case 'happy':
        return '(◕‿◕)';
      case 'sleepy':
        return '(˘▽˘)zzz';
      case 'excited':
        return '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧';
      case 'thinking':
        return '(¬_¬)';
      default:
        return '(◕‿◕)';
    }
  };

  const getMascotColor = () => {
    switch (mood) {
      case 'happy':
        return 'from-green-300 to-green-500';
      case 'sleepy':
        return 'from-blue-300 to-blue-500';
      case 'excited':
        return 'from-yellow-300 to-orange-500';
      case 'thinking':
        return 'from-purple-300 to-purple-500';
      default:
        return 'from-green-300 to-green-500';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl">
      <div className="flex items-center gap-4">
        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getMascotColor()} flex items-center justify-center text-3xl flex-shrink-0 animate-bounce`}>
          {getMascotFace()}
        </div>
        {message && (
          <div className="flex-1">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-3 relative">
              <p className="text-sm text-gray-700">{message}</p>
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-purple-50" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
