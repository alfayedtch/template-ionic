import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IonicModule],
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss']
})
export class ResetPasswordPage implements OnInit {
  resetForm: FormGroup;
  token: string = '';
  success = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  async onSubmit() {
    if (this.resetForm.invalid) return;

    const { password, confirmPassword } = this.resetForm.value;

    if (password !== confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas.';
      const toast = await this.toastCtrl.create({
        message: 'Les mots de passe ne correspondent pas',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }

    this.authService.resetPassword(this.token, password).subscribe({
      next: async () => {
        this.success = true;
        const toast = await this.toastCtrl.create({
          message: 'Mot de passe réinitialisé avec succès ✅',
          duration: 2000,
          color: 'success'
        });
        toast.present();

        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: async () => {
        this.error = 'Erreur lors de la réinitialisation.';
        const toast = await this.toastCtrl.create({
          message: this.error,
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }

  login() {
    this.router.navigate(['/custum/login']);
  }
}
