import { useState, useEffect, useCallback, useRef } from 'react';

export function useTimer(initialSeconds: number) {
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  const [remainingTime, setRemainingTime] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [state, setState] = useState('Ready to begin');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/meditation-bell.mp3');
    audioRef.current.preload = 'auto';
  }, []);

  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const progress = (totalSeconds - remainingTime) / totalSeconds;

  const playCompletionSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Fallback if audio fails - create a simple beep
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 1);
        
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 1);
      });
    }
  }, []);

  const showNotification = useCallback(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Meditation Complete', {
        body: 'Your meditation session has finished.',
        icon: '/favicon.ico',
        tag: 'meditation-timer'
      });
    }
  }, []);

  const start = useCallback(() => {
    if (remainingTime <= 0) return;
    
    setIsRunning(true);
    setState('Meditating...');
    
    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setState('Session complete');
          playCompletionSound();
          showNotification();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [remainingTime, playCompletionSound, showNotification]);

  const pause = useCallback(() => {
    setIsRunning(false);
    setState('Paused');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setState('Ready to begin');
    setRemainingTime(totalSeconds);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [totalSeconds]);

  const toggle = useCallback(() => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  }, [isRunning, start, pause]);

  const setTimer = useCallback((minutes: number) => {
    const newSeconds = minutes * 60;
    setTotalSeconds(newSeconds);
    setRemainingTime(newSeconds);
    setIsRunning(false);
    setState('Ready to begin');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    hours,
    minutes,
    seconds,
    totalMinutes,
    remainingTime,
    isRunning,
    state,
    progress,
    start,
    pause,
    reset,
    toggle,
    setTimer
  };
}
