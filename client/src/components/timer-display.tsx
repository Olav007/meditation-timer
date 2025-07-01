interface TimerDisplayProps {
  hours: number;
  minutes: number;
  seconds: number;
  state: string;
  progress: number;
  isPulsing?: boolean;
  isNegativeTime?: boolean;
}

export default function TimerDisplay({ hours, minutes, seconds, state, progress, isPulsing = false, isNegativeTime = false }: TimerDisplayProps) {
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
      </div>
    </div>
  );
}
