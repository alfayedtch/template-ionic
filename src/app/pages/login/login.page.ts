import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonIcon, IonInput, IonButton, IonText } from '@ionic/angular/standalone';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonIcon,
    IonInput,
    IonButton,
    IonText
  ],
  animations: [
    trigger('zoomIn', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class LoginPage {
  loginForm: FormGroup;
  loading = false;
  hasWrongCredentials = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

 onLogin() {
  if (this.loginForm.valid) {
    const formData = this.loginForm.value;
    this.loading = true;
    this.hasWrongCredentials = false; // reset à chaque tentative

    this.authService.login(formData).subscribe(
      response => {
        this.loading = false;
        this.router.navigateByUrl('home');
      },
      err => {
        this.loading = false;

        if (err.status === 401) {
          this.hasWrongCredentials = true;
        } else {
          console.error('Erreur serveur:', err);
        }
      }
    );
  }
}

goToRegister() {
  this.router.navigateByUrl('/register');
}
}
