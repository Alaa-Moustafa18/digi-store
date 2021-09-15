import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User = {
    name: 'admin',
    address: 'alexandria',
    membership: 1,
  };
  constructor() {}

  getUser(): Observable<User> {
    return of(this.user);
  }
}
