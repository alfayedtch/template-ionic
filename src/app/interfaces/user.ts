import { environment } from 'src/environments/environment';

export class User {
  id?: number;
  key?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: number;
  birthdate?: Date;
  profile_picture?: string;
  privileges?: [];
  roles?: [];
  imagePreview?: string;

  constructor(data: Partial<User>) {
    Object.assign(this, data);

    if (this.profile_picture) {
      this.imagePreview = environment.endpointForImage + this.profile_picture;
    } else {
      this.imagePreview = 'assets/img/default-avatar.png'; // fallback si pas d'image
    }
  }
}
