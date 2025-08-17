import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonAvatar,
  IonContent,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  PopoverController,
  IonFooter,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ProfileMenuComponent } from './profile-menu.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonAvatar,
    IonContent,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonFooter
  ],
})
export class HomePage implements OnInit {
  private currentPopover: HTMLIonPopoverElement | null = null;
  user!: User | null;
  constructor(
    private router: Router,
    private popoverCtrl: PopoverController,
    private authService: AuthService
  ) {
    // Fermer le popover au changement de page
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closePopover();
      });
    this.authService.currentUser.subscribe(
      (currentUser:User) => (this.user = currentUser)
    );
  }
  ngOnInit(): void {
    this.authService.getUserByToken().subscribe(
      (response: any) => {
        this.authService.setCurrentUserValue(<User>response.user);
      },
      (err) => {
        this.logout();
      }
    );
  }

  async openProfileMenu(ev: any) {
    // Fermer l'ancien si ouvert
    this.closePopover();

    const popover = await this.popoverCtrl.create({
      component: ProfileMenuComponent,
      event: ev,
      translucent: true,
      backdropDismiss: true,
    });
    this.currentPopover = popover;
    await popover.present();
  }

  closePopover() {
    if (this.currentPopover) {
      this.currentPopover.dismiss();
      this.currentPopover = null;
    }
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigateByUrl('home');
  }
}
