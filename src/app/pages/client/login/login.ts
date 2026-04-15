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

        // vì service đã .then(res => res.data)
        const token = res.data.token;

        // decode token lấy role
        const decoded: any = jwtDecode(token);

        const user = {
          email: decoded.email,
          role: decoded.role
        };

        // lưu qua service (chuẩn hơn)
        this.authService.saveAuth(token, user);

        // điều hướng theo role
        if (user.role === 'admin') {
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