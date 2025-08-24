import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WarmogInputComponent } from '../../core/components/atoms/warmog-input/warmog-input.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [WarmogInputComponent],
})
export class SignInComponent implements OnInit {
  public router = inject(Router);
  public authService = inject(AuthService);

  public showForm = signal<boolean>(false);

  public signInForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public errorText = signal<string | null>(null);

  ngOnInit() {
    setTimeout(() => {
      this.showForm.set(true);
    }, 5000);
  }

  public async signIn() {
    if (this.signInForm.invalid) {
      this.errorText.set('Por favor, preencha todos os campos corretamente.');
      return;
    }

    try {
      const response = await this.authService.signIn(this.signInForm.value);

      if (!response.data?.signIn) return;
      localStorage.setItem('user', JSON.stringify(response.data.signIn));
      this.router.navigate(['/dashboard']);
      console.log('Sign in successful:', response);
    } catch (error) {
      this.errorText.set('Credenciais inválidas.');
    }
  }
}
