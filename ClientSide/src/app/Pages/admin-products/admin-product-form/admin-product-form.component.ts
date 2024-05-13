import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    imageUrl: new FormControl(null)

  })

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
  subscriber: any;
  constructor(
    public productService: ProductService,
    public router: Router,
    public activetedRoute: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe({
      next: (params) => {
        this.productId = params['id'];
        this.getName?.setValue('');
        this.getDescription?.setValue('');
        this.getPrice?.setValue(null);
        this.getQuantity?.setValue(null);
        this.getImage?.setValue('');
        this.getDiscount?.setValue(null);
        this.getCategoryId?.setValue(null);
      }
    });

    if (this.productId != 0) {
      this.subscriber = this.product = this.productService
        .getById(this.productId).subscribe({
          next: (data) => {
            this.product = data;
            this.getName?.setValue(this.product.name);
            this.getDescription?.setValue(this.product.description);
            this.getPrice?.setValue(this.product.price);
            this.getQuantity?.setValue(this.product.quantity);
            this.getImage?.setValue(this.product.image);
            this.getDiscount?.setValue(this.product.discount);
            this.getCategoryId?.setValue(this.product.categoryId);
          },
          error: (error) => {
            console.log(error);
          }
        });
    }
  }

  productHandler() {
    if (this.productForm.status === 'VALID') {
      console.log(this.productForm.value);

      if (this.productId == 0) {
        this.productService.add(this.productForm.value).subscribe({
          next: () => {
            this.router.navigate(['/adminproducts']);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
      else {
        this.productService.edit(this.product.id, this.productForm.value).subscribe({
          next: () => {
            this.router.navigate(['/adminproducts']);
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
    }
    else {
      console.log("Invalid form");
    }
  }

  selectedFile: File | undefined;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.uploadFile();
  }
  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('upload_preset', 'angular_images');

      fetch('https://api.cloudinary.com/v1_1/dbo2eybma/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.secure_url) {
            console.log(`Uploaded Image Url ${data.secure_url}`);
            this.productForm?.patchValue({ imageUrl: data.secure_url });
          }
        })
        .catch((error) => {
          console.error('Error uploading file to Cloudinary:', error);
        });
    }
  }
}