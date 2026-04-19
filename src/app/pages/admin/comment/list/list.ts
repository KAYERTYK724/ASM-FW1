import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../../../services/comment.service';
import { IComment } from '../../../../interfaces/comment.interface';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../../../services/notification/notification.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.html',
  styleUrls: ['./list.scss'],
})
export class List implements OnInit {
  dataListComment = signal<IComment[]>([]);
  constructor(
    private commentService: CommentService,
    private noti: NotificationService,
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const cmtRes = await this.commentService.list()
      this.dataListComment.set(cmtRes.data.data);

    } catch (error) {
      console.log(error);
      this.noti.show('Lỗi tải dữ liệu', 'danger');
    }
  };
}
