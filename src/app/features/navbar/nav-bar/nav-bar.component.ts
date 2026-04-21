import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SoundService } from 'src/app/services/sound.service';
import { BackgroundAudioService } from 'src/app/services/background-audio.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [
    trigger('titleAnimation', [  // ← must match @titleAnimation in template
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class NavBarComponent implements OnInit {
  isMobileMenuOpen = false;
  isAudioMuted: boolean = false;
  constructor(private router: Router, private soundService: SoundService, private backgroundAudioService: BackgroundAudioService) {}

  ngOnInit() {
    this.isAudioMuted = this.backgroundAudioService.isAudioMuted;
    this.backgroundAudioService.startIfNotStarted();
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 1024 && this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const navbar = document.querySelector('.legacy-header');
    if (this.isMobileMenuOpen && navbar && !navbar.contains(target)) {
      this.isMobileMenuOpen = false;
    }
  }

  toggleMobileMenu(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  goToPage(type: string) {
    this.soundService.playClickSound();
    this.router.navigate([`/${type}`]);
    this.isMobileMenuOpen = false;
  }

  async toggleAudio(audio?: HTMLAudioElement) {
    this.backgroundAudioService.toggle();
    this.isAudioMuted = this.backgroundAudioService.isAudioMuted;
  }

}
