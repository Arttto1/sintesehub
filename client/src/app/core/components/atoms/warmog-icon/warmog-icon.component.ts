import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  effect,
  inject,
  input,
  signal,
  computed,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { cva } from 'class-variance-authority';

@Component({
  standalone: true,
  selector: 'warmog-icon',
  templateUrl: './warmog-icon.component.html',
  styleUrls: ['./warmog-icon.component.css'],
  imports: [CommonModule],
})
export class WarmogIconComponent {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  public active = input(false);
  public blockActive = input(false);
  public icon = input.required<string>();
  public iconSize = input<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'>(
    'md',
  );
  public iconColor = input<
    | 'sintese'
    | 'primary'
    | 'secondary'
    | 'white-tertiary'
    | 'success'
    | 'negative'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'noChange'
  >('noChange');

  public svgIcon = signal<SafeHtml | null>(null);

  private iconVariants = cva('', {
    variants: {
      size: {
        xs: 'w-2 h-2',
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-10 h-10',
        '2xl': 'w-14 h-14',
        full: 'w-full',
      },
      color: {
        sintese: 'fill-sintese',
        primary: 'fill-primary',
        secondary: 'fill-secondary',
        'white-tertiary': 'fill-white-tertiary',
        success: 'fill-success',
        negative: 'fill-negative',
        warning: 'fill-warning',
        info: 'fill-info',
        light: 'fill-light',
        dark: 'fill-dark',
        noChange: '',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'noChange',
    },
  });

  public readonly iconClass = computed(() =>
    this.iconVariants({ size: this.iconSize(), color: this.iconColor() }),
  );

  constructor() {
    effect(() => {
      this.active();
      if (!this.blockActive()) {
        this.loadIcon();
      }
    });
  }

  ngOnInit() {
    this.loadIcon();
  }

  private async loadIcon() {
    try {
      const svg = await firstValueFrom(
        this.http.get(
          `/icons/${this.icon() + (this.active() ? '-active' : '')}.svg`,
          { responseType: 'text' },
        ),
      );
      this.svgIcon.set(this.sanitizer.bypassSecurityTrustHtml(svg));
    } catch (error) {
      console.error(`Error loading icon: ${this.icon()}`, error);
    }
  }
}
