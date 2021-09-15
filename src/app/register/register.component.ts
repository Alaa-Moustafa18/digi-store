import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public translate: TranslateService
  ) {}
  registerForm: FormGroup = this.fb.group({});
  memberships = ['Normal', 'Gold', 'Platinum'];

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      address: this.fb.control('', Validators.required),
      membership: this.fb.control(
        { value: 'Gold', disabled: true },
        Validators.required
      ),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      localStorage.setItem('auth', 'true');
      this.router.navigate(['/home']);
    }
  }
}
