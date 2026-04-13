import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../../services/blog.service';
import { IBlog } from '../../../interfaces/blog.interface';

@Component({
  selector: 'app-blog',
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog implements OnInit{
  ngOnInit(): void {
    this.fetchData();
  }

  dataBloglist = signal<IBlog[]>([]);

  constructor(private blogService : BlogService){}

  fetchData = async () =>{
    const result = await this.blogService.list();
    if (result.status === 200){
      this.dataBloglist.set(result.data.data)
    }
  }
}
