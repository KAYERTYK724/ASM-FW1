import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login implements OnInit {
  submitted = signal(false);
  errorMessage = signal('');
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted.set(true);
    this.errorMessage.set('');

    if (this.loginForm.invalid) return;

    const data = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    };

    this.authService.login(data).subscribe({
      next: (res: any) => {
        console.log('RES LOGIN:', res);

        if (!res?.token || !res?.user) {
          this.errorMessage.set('Đăng nhập thất bại');
          return;
        }

        // ❌ SAI: const user = { email: res.user?.email, role: res.user?.role };
        // ✅ ĐÚNG: Lấy nguyên object user từ BE vì đã có id rồi
        this.authService.saveAuth(res.token, res.user);

        if (res.user.role?.toLowerCase() === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'Sai email hoặc password');
      },
    });
  }
}
