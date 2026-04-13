import { Component, OnInit, signal, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../../services/blog.service';
import { IBlog } from '../../../interfaces/blog.interface';

@Component({
  selector: 'app-detail-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-blog.html',
  styleUrls: ['./detail-blog.scss']
})
export class DetailBlog implements OnInit {
  blog: IBlog | null = null;
  dataListBlog = signal<IBlog[]>([]);

  prevBlog: IBlog | null = null;
  nextBlog: IBlog | null = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      const id = Number(params.get('id'));
      await this.fetchData(id);
    });
  }

  async fetchData(id: number) {
    try {
      const [detail, list] = await Promise.all([
        this.blogService.getById(id),
        this.blogService.list(),
      ]);

      if (detail && detail.status === 200) {
        this.blog = detail.data.data;
      }

      if (list && list.status === 200) {
        const blogs = list.data.data;
        this.dataListBlog.set(blogs);
        this.handlePrevNext(id, blogs);
      }

      this.cdr.detectChanges();
    } catch (error) {
      console.error(error);
    }
  }

  handlePrevNext(id: number, blogs: IBlog[]) {
    if (!Array.isArray(blogs)) return;

    const index = blogs.findIndex((b) => b.id === id);
    this.prevBlog = index > 0 ? blogs[index - 1] : null;
    this.nextBlog = index < blogs.length - 1 ? blogs[index + 1] : null;
  }
}
