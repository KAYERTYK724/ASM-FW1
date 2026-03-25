import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { IProduct } from '../../../interfaces/product.interface';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  ngOnInit(): void {
    this.fetchData();
  }
  dataListProduct = signal<IProduct[]>([]);

  constructor(private productService : ProductService){}

  fetchData = async () =>{
    const result = await this.productService.list();
    if (result.status === 200){
      this.dataListProduct.set(result.data.data)
    }
  }
}
