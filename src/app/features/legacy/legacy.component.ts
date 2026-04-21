import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SoundService } from 'src/app/services/sound.service';
import { BackgroundAudioService } from 'src/app/services/background-audio.service';
import { LEGACY_CARDS } from 'src/app/constants/legacy-cards.constant';

@Component({
  selector: 'app-legacy',
  templateUrl: './legacy.component.html',
  styleUrls: ['./legacy.component.scss'],
})
export class LegacyComponent implements OnInit, AfterViewInit, OnDestroy {
  legacyCards = LEGACY_CARDS;
  @ViewChild('bgVideo') bgVideoRef!: ElementRef<HTMLVideoElement>;
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private soundService: SoundService,
    private backgroundAudioService: BackgroundAudioService
  ) {}
  ngOnInit(): void {
    this.isAudioMuted = this.backgroundAudioService.isAudioMuted;
    this.backgroundAudioService.startIfNotStarted();
  }
  ngAfterViewInit(): void {
    this.initMediaPlayback();
  }

  ngOnDestroy(): void {
  }

  private initMediaPlayback() {
    const video = this.bgVideoRef?.nativeElement;

    // Attempt to start video (muted autoplay should usually work)
    if (video) {
      video
        .play()
        .catch((err) =>
          console.warn('Video autoplay blocked or failed:', err?.message || err)
        );
    }
  }

  scrollToTop(type: string) {
    this.soundService.playClickSound();
    const token = localStorage.getItem('accessToken');
    if (token && type === 'dashboard') {
      this.router.navigate(['/dashboard'], { queryParams: { token } });
    } else if (type === 'signup' && !token) {
      this.router.navigate(['/auth/register'], { queryParams: { token } });
    } else {
      this.router.navigate(['/auth/login']);
    }
    //   if (type === 'dashboard') {
    //     this.router.navigate(['/dashboard']);
    //   } else if (type === 'signup') {
    //     this.router.navigate(['/auth/register']);
    //   }
    // } else {
    //   this.router.navigate(['/auth/login']);
    // }
  }

  goToPage(type: string) {
    // Check for authentication token (adjust key as needed)
    const token = localStorage.getItem('accessToken');
    if (token && type === 'dashboard') {
      this.soundService.playClickSound();
      // Navigate to dashboard as a child route of the current route (features module)
      this.router.navigate(['/dashboard'], {
        relativeTo: this.route.parent,
      });
    } else if (type === 'login') {
      // Navigate to login page
      this.soundService.playClickSound();
      this.router.navigate(['/auth/login']);
    } else if (type === 'about-us') {
      this.soundService.playClickSound();
      this.router.navigate(['/about-us']);
    } else if (type === 'our-service') {
      this.soundService.playClickSound();
      this.router.navigate(['/our-service']);
    } else if (type === 'pricing') {
      this.soundService.playClickSound();
      this.router.navigate(['/pricing']);
    } else if (type === 'legacy') {
      this.soundService.playClickSound();
      this.router.navigate(['/legacy']);
    } else if (type === 'contact-us') {
      this.soundService.playClickSound();
      this.router.navigate(['/contact-us']);
    } else {
      this.soundService.playClickSound();
      this.router.navigate(['/login']);
    }
  }
  goToLogin(type: string) {
    // Navigate to login page
    const token = localStorage.getItem('accessToken');
    if (!token && type === 'login') {
      this.soundService.playClickSound();
      this.router.navigate(['/auth/login']);
    } else if (!token && type === 'signup') {
      this.soundService.playClickSound();
      this.router.navigate(['/auth/register']);
    } else {
      this.soundService.playClickSound();
      // If the user is already logged in, redirect to the dashboard
      this.router.navigate(['/dashboard']);
    }
  }
  isAudioMuted: boolean = false;

  async toggleAudio(audio?: HTMLAudioElement) {
    this.backgroundAudioService.toggle();
    this.isAudioMuted = this.backgroundAudioService.isAudioMuted;
  }
}
