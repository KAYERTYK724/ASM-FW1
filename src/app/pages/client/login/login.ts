import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {

  submitted = signal(false);
  errorMessage = signal('');
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted.set(true);

    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value)
      .then((res: any) => {

        //  
        const token = res.token;

        const decoded: any = jwtDecode(token);

        const user = {
          email: decoded.email,
          role: decoded.role
        };

        this.authService.saveAuth(token, user);

        if (decoded.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }

      })
      .catch(() => {
        this.errorMessage.set('Sai email hoặc password');
      });
  }
}