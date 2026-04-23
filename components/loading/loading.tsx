export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      
      <div className="flex flex-col items-center gap-6 text-center">
        
        {/* Logo + Brand */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-4xl font-extrabold text-orange-600 tracking-wide">
            🐾 WildHeart
          </div>
          <p className="text-gray-500 text-sm">
            Animal Rescue Management System
          </p>
        </div>

        {/* Animated Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-orange-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-gray-700 font-medium">
            Preparing your dashboard...
          </p>
          <p className="text-gray-400 text-xs">
            Please wait while we fetch the latest rescue cases 🐶🐱
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-2 mt-2">
          <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-150"></span>
          <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-300"></span>
        </div>

      </div>
    </div>
  )
}