import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements OnInit {
  users = signal<any[]>([]);
  loading = signal<boolean>(false);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    this.loading.set(true);

    try {
      const res = await this.userService.list();
      this.users.set(res.data.data || res.data);
    } catch (error) {
      console.error('Lỗi load users:', error);
    } finally {
      this.loading.set(false);
    }
  }
}
