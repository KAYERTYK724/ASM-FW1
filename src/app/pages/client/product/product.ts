import { Component } from '@angular/core';
import { ICategory } from '../../../interfaces/category.interface';
import { IProduct } from '../../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {
  parentCategories: ICategory[] = [];
  childCategories: ICategory[] = [];

  ngOnInit() {
    this.parentCategories = this.categories.filter((c) => !c.parent_id);
    this.childCategories = this.categories.filter((c) => c.parent_id);
  }

  getChildCategories(parentId: number): ICategory[] {
    return this.categories.filter((c) => c.parent_id === parentId);
  }

  categories: ICategory[] = [
    // CHA
    {
      id: 1,
      name: 'Thời trang nam',
      parent_id: undefined,
      status: true,
    },
    {
      id: 2,
      name: 'Phụ kiện',
      parent_id: undefined,
      status: true,
    },
    {
      id: 10,
      name: 'Thời trang theo mùa',
      parent_id: undefined,
      status: true,
    },
    {
      id: 11,
      name: 'Phong cách',
      parent_id: undefined,
      status: true,
    },
    // CON cấp 1 - Thời trang nam
    {
      id: 3,
      name: 'Áo nam',
      parent_id: 1,
      status: true,
    },
    {
      id: 4,
      name: 'Quần nam',
      parent_id: 1,
      status: true,
    },
    // CON cấp 1 - Phụ kiện
    {
      id: 5,
      name: 'Thắt lưng',
      parent_id: 2,
      status: true,
    },
    {
      id: 6,
      name: 'Ví',
      parent_id: 2,
      status: true,
    },
    // CON cấp 2 - Áo nam
    {
      id: 7,
      name: 'Áo thun',
      parent_id: 3,
      status: true,
    },
    {
      id: 8,
      name: 'Áo sơ mi',
      parent_id: 3,
      status: true,
    },
    // CON cấp 2 - Quần nam
    {
      id: 9,
      name: 'Quần jeans',
      parent_id: 4,
      status: true,
    },
    // Thời trang theo mùa
    {
      id: 12,
      name: 'Mùa hè',
      parent_id: 10,
      status: true,
    },
    {
      id: 13,
      name: 'Mùa đông',
      parent_id: 10,
      status: true,
    },
    {
      id: 14,
      name: 'Mùa thu',
      parent_id: 10,
      status: true,
    },
    {
      id: 15,
      name: 'Mùa xuân',
      parent_id: 10,
      status: true,
    },
    // Phong cách
    {
      id: 16,
      name: 'Casual (thường ngày)',
      parent_id: 11,
      status: true,
    },
    {
      id: 17,
      name: 'Streetwear',
      parent_id: 11,
      status: true,
    },
    {
      id: 18,
      name: 'Công sở',
      parent_id: 11,
      status: true,
    },
    {
      id: 19,
      name: 'Thể thao',
      parent_id: 11,
      status: true,
    },
  ];

  products: IProduct[] = [
    {
      id: 1,
      name: 'Áo thun basic cotton',
      price: 200000,
      sale_price: 150000,
      image: 'https://i.pinimg.com/736x/07/14/96/071496e9f98929dbe19325ffb13e6695.jpg',
      description: 'Áo thun chất liệu cotton mềm mại, thoáng mát',
      category_id: 7,
      status: true,
      created_at: '2026-03-01',
      updated_at: '2026-03-10',
    },
    {
      id: 2,
      name: 'Áo sơ mi trắng công sở',
      price: 350000,
      sale_price: 299000,
      image: 'https://i.pinimg.com/1200x/d9/6e/9d/d96e9dc9083ee1d90026a6a50d8ec8c9.jpg',
      description: 'Áo sơ mi lịch sự, phù hợp đi làm',
      category_id: 8,
      status: true,
      created_at: '2026-03-02',
      updated_at: '2026-03-11',
    },
    {
      id: 3,
      name: 'Quần jeans slim fit',
      price: 500000,
      sale_price: 450000,
      image: 'https://i.pinimg.com/1200x/35/51/14/3551143058277743c47a18b150759c8b.jpg',
      description: 'Quần jeans ôm dáng, phong cách hiện đại',
      category_id: 9,
      status: true,
      created_at: '2026-03-03',
      updated_at: '2026-03-12',
    },
    {
      id: 4,
      name: 'Thắt lưng da cao cấp',
      price: 300000,
      sale_price: 270000,
      image: 'https://i.pinimg.com/736x/76/54/36/765436fa43979f10e163ebdab2f9b218.jpg',
      description: 'Thắt lưng da thật, bền đẹp',
      category_id: 5,
      status: true,
      created_at: '2026-03-04',
      updated_at: '2026-03-13',
    },
    {
      id: 5,
      name: 'Ví da nam sang trọng',
      price: 400000,
      sale_price: 350000,
      image: 'https://i.pinimg.com/736x/47/58/8e/47588e53628f8d6887fdb5a5aa405ff9.jpg',
      description: 'Ví da cao cấp, thiết kế sang trọng',
      category_id: 6,
      status: true,
      created_at: '2026-03-05',
      updated_at: '2026-03-14',
    },
    {
      id: 6,
      name: 'Áo hoodie streetwear',
      price: 600000,
      sale_price: 550000,
      image: 'https://i.pinimg.com/1200x/b8/c9/ad/b8c9ad6cb1be15a9c47844b7addeca4c.jpg',
      description: 'Hoodie phong cách streetwear cá tính',
      category_id: 17,
      status: true,
      created_at: '2026-03-06',
      updated_at: '2026-03-15',
    },
    {
      id: 7,
      name: 'Áo khoác mùa đông',
      price: 800000,
      sale_price: 750000,
      image: 'https://i.pinimg.com/1200x/27/97/9d/27979d675f5b1506c637fa9ab285cad6.jpg',
      description: 'Áo khoác giữ ấm tốt cho mùa đông',
      category_id: 13,
      status: true,
      created_at: '2026-03-07',
      updated_at: '2026-03-16',
    },
    {
      id: 8,
      name: 'Áo thun mùa hè',
      price: 180000,
      sale_price: 150000,
      image: 'https://i.pinimg.com/1200x/f7/e3/47/f7e347f9c6a18756e8a496d978a85229.jpg',
      description: 'Áo thun thoáng mát dành cho mùa hè',
      category_id: 12,
      status: true,
      created_at: '2026-03-08',
      updated_at: '2026-03-17',
    },
    {
      id: 9,
      name: 'Áo thun form rộng unisex',
      price: 230000,
      sale_price: 199000,
      image: 'https://i.pinimg.com/1200x/a6/85/93/a68593220d20e4a56bc50c88688bd1d8.jpg',
      description: 'Áo thun form rộng phong cách streetwear',
      category_id: 7,
      status: true,
      created_at: '2026-03-09',
      updated_at: '2026-03-18',
    },
    {
      id: 10,
      name: 'Áo sơ mi đen slim fit',
      price: 370000,
      sale_price: 320000,
      image: 'https://i.pinimg.com/1200x/a8/8a/c8/a88ac868893906abce42cad70d065dbb.jpg',
      description: 'Áo sơ mi đen lịch lãm cho dân công sở',
      category_id: 8,
      status: true,
      created_at: '2026-03-10',
      updated_at: '2026-03-19',
    },
    {
      id: 11,
      name: 'Quần jeans rách phong cách',
      price: 550000,
      sale_price: 499000,
      image: 'https://i.pinimg.com/736x/55/3b/f0/553bf0be6dd875ca89f28df9939c2de8.jpg',
      description: 'Quần jeans rách trẻ trung, cá tính',
      category_id: 9,
      status: true,
      created_at: '2026-03-11',
      updated_at: '2026-03-20',
    },
    {
      id: 12,
      name: 'Thắt lưng da bò handmade',
      price: 350000,
      sale_price: 299000,
      image: 'https://i.pinimg.com/1200x/0e/dc/b6/0edcb65060d6b7ab65704f26e5f353b8.jpg',
      description: 'Thắt lưng da bò thật, bền đẹp',
      category_id: 5,
      status: true,
      created_at: '2026-03-12',
      updated_at: '2026-03-21',
    },
    {
      id: 13,
      name: 'Ví da mini tiện lợi',
      price: 280000,
      sale_price: 250000,
      image: 'https://i.pinimg.com/736x/20/11/32/201132fc5328b23052b397ae9cf10fa6.jpg',
      description: 'Ví nhỏ gọn, tiện mang theo',
      category_id: 6,
      status: true,
      created_at: '2026-03-13',
      updated_at: '2026-03-22',
    },
    {
      id: 14,
      name: 'Áo tank top mùa hè',
      price: 150000,
      sale_price: 120000,
      image: 'https://i.pinimg.com/1200x/05/9e/13/059e13475cf4eb9f6d22a3d082133100.jpg',
      description: 'Áo ba lỗ thoáng mát cho mùa hè',
      category_id: 12,
      status: true,
      created_at: '2026-03-14',
      updated_at: '2026-03-23',
    },
    {
      id: 15,
      name: 'Áo khoác dạ mùa đông',
      price: 900000,
      sale_price: 850000,
      image: 'https://i.pinimg.com/1200x/66/0e/31/660e31426ba08454782f15b5da470ccf.jpg',
      description: 'Áo khoác dạ giữ ấm tốt',
      category_id: 13,
      status: true,
      created_at: '2026-03-15',
      updated_at: '2026-03-24',
    },
    {
      id: 16,
      name: 'Áo hoodie basic',
      price: 580000,
      sale_price: 520000,
      image: 'https://i.pinimg.com/1200x/67/96/df/6796df3cc2ac8c54aab0fc84d3e061f4.jpg',
      description: 'Hoodie đơn giản, dễ phối đồ',
      category_id: 17,
      status: true,
      created_at: '2026-03-16',
      updated_at: '2026-03-25',
    },
  ];
}
