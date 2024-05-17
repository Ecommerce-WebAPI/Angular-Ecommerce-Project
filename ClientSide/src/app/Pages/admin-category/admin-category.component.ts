import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from "../../components/admin-sidebar/admin-sidebar.component";
import { ICategory } from '../../interfaces/i-category';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-admin-category',
    standalone: true,
    templateUrl: './admin-category.component.html',
    styleUrl: './admin-category.component.css',
    imports: [AdminSidebarComponent, CommonModule, RouterLink]
})
export class AdminCategoryComponent implements OnInit {

    category:ICategory[];
    constructor(public categoryService: CategoryService) { 
      this.category = [];
    }
  
    ngOnInit():void {
      this.categoryService.getAll().subscribe({
        next: (data) => {
          this.category = data;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    deleteHandler(categoryId: number): void {
      this.categoryService.delete(categoryId).subscribe({
        next: () => {
          this.category = this.category.filter((category) => category.id !== categoryId);
        },
        error: (error) => {
          console.log(error);
        }
      });
  
    }
  }
  