
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

  const playCompletionSound = useCallback(() => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  }, []);

  const testSound = useCallback(() => {
    // Start a 5-second test timer
    setTotalTime(5);
    setTimeLeft(5);
    setIsRunning(true);
    setHasStarted(true);
    setIsPaused(false);
    wakeLock.request();
  }, []);

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
    setIsRunning(false);
    setIsPaused(false);
    setHasStarted(false);
    setTimeLeft(totalTime);
    wakeLock.release();
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
          if (prev <= 1) {
            setIsRunning(false);
            setHasStarted(false);
            wakeLock.release();
            playCompletionSound();
            
            // Show notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Meditation Complete', {
                body: 'Your meditation session has finished.',
                icon: '/favicon.ico'
              });
            }
            
            return 0;
          }
          return prev - 1;
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
  }, [isRunning, timeLeft, playCompletionSound]);

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
