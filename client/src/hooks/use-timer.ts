
import { useState, useEffect, useRef, useCallback } from 'react';
import { wakeLock } from '@/lib/wake-lock';

export function useTimer(initialMinutes: number = 31) {
  const [totalTime, setTotalTime] = useState(initialMinutes * 60);
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const progress = totalTime > 0 ? (totalTime - timeLeft) / totalTime : 0;

  const playDongSound = useCallback(() => {
    // Create a meditation bell/dong sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Lower frequency for a deeper, more calming sound
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A note
    oscillator.frequency.exponentialRampToValueAtTime(220, audioContext.currentTime + 0.5); // Drop to lower A
    
    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 2);
  }, []);

  const playCompletionSound = useCallback(() => {
    // Triple dong for completion
    playDongSound();
    setTimeout(() => playDongSound(), 300);
    setTimeout(() => playDongSound(), 600);
  }, [playDongSound]);

  const triggerVibration = useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]); // Short-pause-short vibration pattern
    }
  }, []);

  const testSound = useCallback(() => {
    // Play a single dong sound for testing
    playDongSound();
    if ('vibrate' in navigator) {
      navigator.vibrate(200); // Test vibration
    }
  }, [playDongSound]);

  const toggle = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
      setIsPaused(true);
      wakeLock.release();
    } else {
      setIsRunning(true);
      setIsPaused(false);
      setHasStarted(true);
      wakeLock.request();
    }
  }, [isRunning]);

  const reset = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
    setHasStarted(true);
    setTimeLeft(totalTime);
    wakeLock.request();
  }, [totalTime]);

  const stop = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setHasStarted(false);
    setTimeLeft(totalTime);
    wakeLock.release();
  }, [totalTime]);

  const setTimer = useCallback((minutes: number) => {
    const newTotalTime = minutes * 60;
    setTotalTime(newTotalTime);
    setTimeLeft(newTotalTime);
    setIsRunning(false);
    setIsPaused(false);
    setHasStarted(false);
    wakeLock.release();
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTimeLeft = prev - 1;
          
          // Play dong every 10 seconds (but not at 0)
          if (newTimeLeft > 0 && newTimeLeft % 10 === 0) {
            playDongSound();
          }
          
          // Vibrate after 30 seconds have passed (every 30 seconds)
          if (newTimeLeft > 0 && (totalTime - newTimeLeft) % 30 === 0 && (totalTime - newTimeLeft) > 0) {
            triggerVibration();
          }
          
          if (newTimeLeft <= 0) {
            setIsRunning(false);
            setHasStarted(false);
            wakeLock.release();
            playCompletionSound();
            triggerVibration();
            
            // Show notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Meditation Complete', {
                body: 'Your meditation session has finished.',
                icon: '/favicon.ico'
              });
            }
            
            return 0;
          }
          return newTimeLeft;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, timeLeft, totalTime, playCompletionSound, playDongSound, triggerVibration]);

  // Handle page visibility change to maintain wake lock
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && isRunning) {
        await wakeLock.request();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isRunning]);

  const state = isRunning 
    ? 'Meditating...' 
    : isPaused 
      ? 'Paused' 
      : hasStarted 
        ? 'Stopped' 
        : '';

  return {
    hours,
    minutes,
    seconds,
    totalMinutes: Math.floor(totalTime / 60),
    progress,
    isRunning,
    isPaused,
    hasStarted,
    state,
    toggle,
    reset,
    stop,
    setTimer,
    testSound
  };
}
