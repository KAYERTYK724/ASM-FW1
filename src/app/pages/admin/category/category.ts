import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICategory } from '../../../interfaces/category.interface';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.html',
  styleUrls: ['./category.scss'],
})
export class Category {

  categories: ICategory[] = [
    {
      id: 1,
      name: 'Điện thoại',
      parent_id: 0,
      status: true,
      created_at: '2026-03-01'
    },
    {
      id: 2,
      name: 'Laptop',
      parent_id: 0,
      status: true,
      created_at: '2026-03-05'
    },
    {
      id: 3,
      name: 'Phụ kiện',
      parent_id: 1,
      status: false,
      created_at: '2026-03-10'
    }
  ];

}