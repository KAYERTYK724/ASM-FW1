import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrls: ['./product.scss'],
})
export class Product {

  products: IProduct[] = [
    {
      id: 1,
      name: 'Áo thun nam',
      price: 250000,
      image: 'https://picsum.photos/100?1',
      category: 'Áo'
    },
    {
      id: 2,
      name: 'Quần jeans',
      price: 400000,
      image: 'https://picsum.photos/100?2',
      category: 'Quần'
    },
    {
      id: 3,
      name: 'Áo hoodie',
      price: 500000,
      image: 'https://picsum.photos/100?3',
      category: 'Áo khoác'
    }
  ];

}