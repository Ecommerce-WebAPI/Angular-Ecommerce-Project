import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { ICategory } from '../../../interfaces/i-category';

@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css'],
  imports: [AdminSidebarComponent, CommonModule, ReactiveFormsModule]
})
export class AdminProductFormComponent implements OnInit, OnDestroy {
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    categoryId: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
    price: new FormControl(null, [Validators.required, Validators.min(5)]),
    image: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    discount: new FormControl(null),
  });

  categories: ICategory[] = [];
  uploadingImage: boolean = false;

  get getName() {
    return this.productForm.get('name');
  }

  get getDescription() {
    return this.productForm.get('description');
  }

  get getPrice() {
    return this.productForm.get('price');
  }

  get getQuantity() {
    return this.productForm.get('quantity');
  }

  get getImage() {
    return this.productForm.get('image');
  }

  get getDiscount() {
    return this.productForm.get('discount');
  }

  get getCategoryId() {
    return this.productForm.get('categoryId');
  }

  productId: any;
  product: any;
  subscriber: Subscription | undefined;
  routeSubscriber: Subscription | undefined;
  selectedFile: File | undefined;

  constructor(
    public productService: ProductService,
    public categoryService: CategoryService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
    if (this.routeSubscriber) {
      this.routeSubscriber.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.routeSubscriber = this.activatedRoute.params.subscribe({
      next: (params) => {
        this.productId = params['id'];
        this.resetForm();

        if (this.productId != '0') {
          this.subscriber = this.productService.getById(this.productId).subscribe({
            next: (data) => {
              this.product = data;
              this.populateForm();
            },
            error: (error) => {
              console.log(error);
            }
          });
        }
      }
    });

    //fetch categories
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  resetForm() {
    this.getName?.setValue('');
    this.getDescription?.setValue('');
    this.getPrice?.setValue(null);
    this.getQuantity?.setValue(null);
    this.getImage?.setValue('');
    this.getDiscount?.setValue(null);
    this.getCategoryId?.setValue(null);
  }

  populateForm() {
    this.getName?.setValue(this.product.name);
    this.getDescription?.setValue(this.product.description);
    this.getPrice?.setValue(this.product.price);
    this.getQuantity?.setValue(this.product.quantity);
    this.getImage?.setValue(this.product.image);
    this.getDiscount?.setValue(this.product.discount);
    this.getCategoryId?.setValue(this.product.categoryId);
  }

  productHandler() {
    if (this.productForm.status === 'VALID') {
      console.log(this.productForm.value);

      if (this.productId == '0') {
        this.productService.add(this.productForm.value).subscribe({
          next: () => {
            this.router.navigate(['/adminproducts']);
          },
          error: (error) => {
            console.log(error);
          }
        });
      } else {
        this.productService.edit(this.productId, this.productForm.value).subscribe({
          next: () => {
            this.router.navigate(['/adminproducts']);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    } else {
      console.log("Invalid form");
    }
  }

  async onFileSelected(event: any) {
    console.log("File selected");
    this.selectedFile = event.target.files[0] as File;
    await this.uploadFile();
  }

  async uploadFile() {
    if (this.selectedFile) {
      this.uploadingImage = true;

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('upload_preset', 'angular_images');

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dbo2eybma/image/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.secure_url) {
          console.log("Uploaded image URL:", data.secure_url);
          this.productForm.patchValue({ image: data.secure_url });
          this.productForm.markAsDirty();
        } else {
          console.error('Failed to upload file to Cloudinary:', data);
        }
      } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
      } finally {
        this.uploadingImage = false;
      }
    }
  }

  testImgURL() {
    console.log("Current image URL:", this.productForm?.controls['image'].value);
  }
}
