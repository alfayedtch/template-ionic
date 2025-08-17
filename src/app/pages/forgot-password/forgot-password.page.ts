import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, IonItem, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonInput, IonText } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [ CommonModule,
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
    IonText],
      animations: [
    trigger('zoomIn', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;
  loading = false;
  hasWrongCredentials = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
  }

 onRequestForgotPassword() {
  if (this.forgotPasswordForm.valid) {
    const formData = this.forgotPasswordForm.value;
    this.loading = true;
    this.hasWrongCredentials = false; // reset à chaque tentative

    this.authService.submitForgotPassword(formData).subscribe(
      response => {
        this.loading = false;
        this.router.navigateByUrl('login');
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

goToLogin(){
  this.router.navigateByUrl('/ogin');
}

}
