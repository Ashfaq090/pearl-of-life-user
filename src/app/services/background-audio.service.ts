import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackgroundAudioService {
  private audio: HTMLAudioElement | null = null;
  private isMuted = false;

  constructor() {
    this.initializeAudio();
  }

  private initializeAudio() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio('/assets/new-audio.mpeg');
      this.audio.preload = 'auto';
      this.audio.loop = true; // Assuming it should loop
      this.audio.volume = 0.5; // Set a default volume
    }
  }

  startIfNotStarted() {
    if (this.audio && this.audio.paused && !this.isMuted) {
      this.play();
    }
  }

  play() {
    if (this.audio && this.audio.paused) {
      this.audio.muted = false;
      this.audio.play().catch(err => console.warn('Audio play failed:', err));
      this.isMuted = false;
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
      this.isMuted = true;
    }
  }

  toggle() {
    if (this.audio) {
      if (this.audio.paused) {
        this.play();
      } else {
        this.pause();
      }
    }
  }

  get isAudioMuted(): boolean {
    return this.isMuted;
  }

  get currentTime(): number {
    return this.audio ? this.audio.currentTime : 0;
  }

  set currentTime(time: number) {
    if (this.audio) {
      this.audio.currentTime = time;
    }
  }
}