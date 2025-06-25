interface TimerDisplayProps {
  hours: number;
  minutes: number;
  seconds: number;
  state: string;
  progress: number;
}

export default function TimerDisplay({ hours, minutes, seconds, state, progress }: TimerDisplayProps) {
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
          stroke="hsla(174, 100%, 70%, 0.2)"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      
      {/* Timer Display */}
      <div className="text-center z-10">
        <div className="flex items-center justify-center space-x-2">
          {/* Hours */}
          <span className="timer-seconds font-light">{hours}</span>
          <span className="timer-seconds">:</span>
          
          {/* Minutes */}
          <span className="timer-minutes font-light">
            {minutes.toString().padStart(2, '0')}
          </span>
          <span className="timer-seconds">:</span>
          
          {/* Seconds */}
          <span className="text-5xl md:text-6xl font-light">
            {seconds.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
