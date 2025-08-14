import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonList, IonItem, PopoverController, IonLabel, IonIcon, IonAvatar, IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-profile-menu',
  template: `
  <ion-content class="profile-content">
  <!-- En-tête avec avatar -->
  <div class="profile-header">
    <ion-avatar class="profile-avatar">
      <img src="https://alfayedtchagnao.site/wp-content/uploads/2025/07/profil-Photoroom.png" alt="Photo de profil" />
    </ion-avatar>
    <h4>{{ user?.firstname }} {{ user?.lastname }}</h4>
    <p>{{ user?.email }}</p>
  </div>

  <!-- Liste d’actions -->
  <ion-list class="profile-list">
    <ion-item button detail="true" (click)="goToProfile()">
      <ion-label>M profil</ion-label>
    </ion-item>

    <ion-item button detail="true" (click)="logout()" >
      <ion-label>Déconnexion</ion-label>
    </ion-item>
  </ion-list>
</ion-content>
  `,
  standalone: true,
  imports: [CommonModule, IonList, IonItem,IonLabel,IonAvatar,IonContent],
  styles: [`
    .profile-content {
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  background-color: #f5f6fa;
  min-height: 100%;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 4px solid #4facfe;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.profile-header h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0.5rem 0;
  color: #333;
}

.profile-header p {
  font-size: 0.5rem;
  color: #666;
}

.profile-list {
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  background-color: #fff;
}

.profile-list ion-item {
  --background: white;
  --ion-item-background: white;
  --border-color: transparent;
  font-weight: 500;
}

.profile-list ion-item ion-icon {
  color: #4facfe;
}

.profile-list ion-item[color="danger"] ion-icon {
  color: #ff6b6b;
}

.profile-list ion-item:hover {
  --background: #355bc5ff;
}
`],
})
export class ProfileMenuComponent {
  user!:User|null;
  constructor(
    private router: Router,
    private authService: AuthService,
    private popoverCtrl: PopoverController
  ) {
      this.authService.currentUser.subscribe(currentUser => this.user = currentUser)
  }

  goToProfile() {
    //this.popoverCtrl.dismiss();
    this.router.navigate(['/home/profile']);
  }

  logout() {
    this.popoverCtrl.dismiss();
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
