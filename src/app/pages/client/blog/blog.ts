import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBlog } from '../../../interfaces/blog.interface';

@Component({
  selector: 'app-blog',
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {

  blogs: IBlog[] = [
    {
      id: 1,
      title: 'Những loại máy uốn tóc nào là tốt nhất?',
      image: 'https://i.pinimg.com/1200x/bc/88/82/bc8882da2bf88ae977d10c6e4992400e.jpg',
      created_at: '16 Tháng 2 2020',
      content:
        'Máy uốn tóc là sản phẩm không thể thiếu cho việc tạo kiểu. Bạn nên chọn loại có điều chỉnh nhiệt độ và chất liệu ceramic để bảo vệ tóc.',
    },
    {
      id: 2,
      title: 'Cách phối đồ nam chuẩn fashion 2026',
      image: 'https://i.pinimg.com/1200x/bc/f5/f6/bcf5f647effa24ee046be97b30f569bc.jpg',
      created_at: '18 Tháng 2 2020',
      content:
        'Xu hướng 2026 tập trung vào phong cách tối giản, màu trung tính và form rộng. Kết hợp áo basic với quần jeans là lựa chọn an toàn.',
    },
    {
      id: 3,
      title: 'Top 10 outfit streetwear hot nhất',
      image: 'https://i.pinimg.com/736x/89/cd/44/89cd44f8997ab2647b359a67497505e2.jpg',
      created_at: '20 Tháng 2 2020',
      content:
        'Streetwear luôn là phong cách dẫn đầu giới trẻ. Hoodie, sneaker và quần baggy là combo không thể thiếu.',
    },
    {
      id: 4,
      title: 'Cách chọn áo hoodie phù hợp',
      image: 'https://i.pinimg.com/1200x/9e/14/4d/9e144dec0550755dbfd2aab1857b6e2c.jpg',
      created_at: '22 Tháng 2 2020',
      content:
        'Khi chọn hoodie, bạn nên chú ý đến chất liệu và form dáng để đảm bảo vừa vặn và thoải mái khi mặc.',
    },
    {
      id: 5,
      title: 'Xu hướng thời trang mùa hè',
      image: 'https://i.pinimg.com/1200x/89/c1/30/89c130620e33f868fb1cf510aaed8ff9.jpg',
      created_at: '25 Tháng 2 2020',
      content:
        'Mùa hè ưu tiên các loại vải thoáng mát như cotton, linen với màu sắc sáng và nhẹ nhàng.',
    },
    {
      id: 6,
      title: 'Phối đồ với quần jeans nam',
      image: 'https://i.pinimg.com/736x/d5/11/02/d511020aa22a7d74ccaa31ccc7f86e06.jpg',
      created_at: '28 Tháng 2 2020',
      content:
        'Quần jeans dễ phối với nhiều loại áo như áo thun, sơ mi hoặc hoodie, phù hợp nhiều hoàn cảnh.',
    },
    {
      id: 7,
      title: 'Tips chọn giày sneaker đẹp',
      image: 'https://i.pinimg.com/1200x/d4/5f/fd/d45ffd59b83b91987d5f5e83a6a6d3c2.jpg',
      created_at: '02 Tháng 3 2020',
      content:
        'Sneaker nên chọn theo phong cách cá nhân và ưu tiên sự thoải mái khi di chuyển.',
    },
    {
      id: 8,
      title: 'Phong cách công sở nam hiện đại',
      image: 'https://i.pinimg.com/736x/00/92/ed/0092edd8d08b30a8be995e1035ab3d3b.jpg',
      created_at: '05 Tháng 3 2020',
      content:
        'Phong cách công sở hiện đại hướng đến sự tối giản, lịch lãm nhưng vẫn thoải mái.',
    },
    {
      id: 9,
      title: 'Cách bảo quản quần áo bền lâu',
      image: 'https://i.pinimg.com/1200x/78/e9/5c/78e95cc58f512eabb4208b9c3bf56b12.jpg',
      created_at: '08 Tháng 3 2020',
      content:
        'Giặt đúng cách, phơi đúng nhiệt độ và bảo quản nơi khô ráo sẽ giúp quần áo bền hơn.',
    },
  ];
}
