interface TimerDisplayProps {
  hours: number;
  minutes: number;
  seconds: number;
  state: string;
  progress: number;
  isPulsing?: boolean;
  isNegativeTime?: boolean;
  isCompleted?: boolean;
  totalElapsedMinutes?: number;
  totalElapsedSeconds?: number;
  overtimeSeconds?: number;
}

export default function TimerDisplay({ 
  hours, 
  minutes, 
  seconds, 
  state, 
  progress, 
  isPulsing = false, 
  isNegativeTime = false,
  isCompleted = false,
  totalElapsedMinutes = 0,
  totalElapsedSeconds = 0,
  overtimeSeconds = 0
}: TimerDisplayProps) {
  // Progress circle calculations
  const circumference = 2 * Math.PI * 140; // radius = 140
  const offset = circumference - (progress * circumference);

  return (
    <div className="relative flex items-center justify-center mb-16">
      {/* Progress Ring */}
      <svg className="progress-ring absolute" width="300" height="300" viewBox="0 0 300 300">
        <circle
          className="progress-ring-circle"
          cx="150"
          cy="150"
          r="140"
          fill="none"
          stroke={isPulsing ? "hsla(0, 100%, 60%, 0.6)" : "hsla(174, 100%, 70%, 0.2)"}
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      
      {/* Timer Display */}
      <div className="text-center z-10">
{isCompleted ? (
          /* Completion Time Display - Beautiful Statistics */
          <div className="space-y-6 animate-fade-in">
            {/* Main Session Stats Card */}
            <div className="bg-gradient-to-br from-purple-900/30 to-slate-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              {/* Total Session Time - Large Display */}
              <div className="mb-4">
                <div className="text-xs uppercase tracking-widest mb-2 opacity-60" style={{ color: 'var(--ethereal-cyan)' }}>
                  Total Meditation Time
                </div>
                <div className="flex items-baseline justify-center space-x-1">
                  <span className="text-4xl font-light tabular-nums" style={{ color: 'var(--ethereal-cyan)' }}>
                    {totalElapsedMinutes}
                  </span>
                  <span className="text-xl opacity-60" style={{ color: 'var(--ethereal-cyan)' }}>min</span>
                  <span className="text-2xl font-light tabular-nums ml-2" style={{ color: 'var(--ethereal-cyan)' }}>
                    {totalElapsedSeconds.toString().padStart(2, '0')}
                  </span>
                  <span className="text-sm opacity-60" style={{ color: 'var(--ethereal-cyan)' }}>sec</span>
                </div>
              </div>
              
              {/* Progress Bar Visualization */}
              <div className="w-full bg-slate-700/30 rounded-full h-2 mb-4">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: '100%',
                    background: 'linear-gradient(90deg, hsla(174, 100%, 70%, 0.8) 0%, hsla(280, 100%, 70%, 0.6) 100%)'
                  }}
                />
              </div>
              
              {/* Overtime Display - Only if present */}
              {overtimeSeconds > 0 && (
                <div className="mt-4 pt-4 border-t border-orange-400/20">
                  <div className="text-xs uppercase tracking-widest mb-2 opacity-60 text-orange-400">
                    Extra Time
                  </div>
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-orange-400 text-lg">+</span>
                    <span className="text-2xl font-light tabular-nums text-orange-400">
                      {Math.floor(overtimeSeconds / 60)}
                    </span>
                    <span className="text-sm opacity-70 text-orange-400">min</span>
                    <span className="text-lg font-light tabular-nums ml-2 text-orange-400">
                      {(overtimeSeconds % 60).toString().padStart(2, '0')}
                    </span>
                    <span className="text-xs opacity-70 text-orange-400">sec</span>
                  </div>
                  
                  {/* Overtime Progress Bar */}
                  <div className="w-full bg-orange-900/20 rounded-full h-1 mt-2">
                    <div 
                      className="h-full bg-orange-400/60 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((overtimeSeconds / 300) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Achievement Badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-emerald-400 font-medium">Session Complete</span>
              </div>
            </div>
          </div>
        ) : (
          /* Regular Countdown Display */
          <div className="flex items-baseline justify-center">
            {/* Negative sign for overtime */}
            {isNegativeTime && (
              <span className="text-red-400 mr-2 timer-minutes">-</span>
            )}
            
            {/* Hours - only show if > 0 */}
            {hours > 0 && (
              <>
                <span className="timer-seconds font-light tabular-nums">
                  {hours.toString().padStart(2, '0')}
                </span>
                <span className="timer-colon">:</span>
              </>
            )}
            
            {/* Minutes */}
            <span className="timer-minutes font-light tabular-nums" style={{ minWidth: '4ch' }}>
              {minutes.toString().padStart(2, '0')}
            </span>
            <span className="timer-colon">:</span>
            
            {/* Seconds */}
            <span className="timer-seconds font-light tabular-nums">
              {seconds.toString().padStart(2, '0')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
