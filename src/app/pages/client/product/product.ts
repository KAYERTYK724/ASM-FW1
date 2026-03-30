import { Component,  signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { ICategory } from '../../../interfaces/category.interface';
import { IProduct } from '../../../interfaces/product.interface';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product implements OnInit{
  categories = signal<ICategory[]>([]);
  products = signal<IProduct[]>([]);
  parentCategories = signal<ICategory[]>([]);

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  selectedCategoryId = signal<number | null>(null);

  filterProducts(): IProduct[] {
    if (!this.selectedCategoryId()) return this.products();
    return this.products().filter(
      p => p.category_id === this.selectedCategoryId()
    );
  }

  fetchData = async () => {
    const cateRes = await this.categoryService.list();
    const prodRes = await this.productService.list();

    if (cateRes.status === 200) {
      this.categories.set(cateRes.data.data);

      // lọc category cha
      this.parentCategories.set(
        cateRes.data.data.filter(
          (c: ICategory) => !c.parent_id
        )
      );
    }

    if (prodRes.status === 200) {
      this.products.set(prodRes.data.data);
    }
  };

  getChildCategories(parentId: number): ICategory[] {
    return this.categories().filter(c => c.parent_id === parentId);
  }
}
