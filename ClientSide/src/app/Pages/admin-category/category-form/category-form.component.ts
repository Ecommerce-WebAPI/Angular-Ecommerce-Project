import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminSidebarComponent } from "../../../components/admin-sidebar/admin-sidebar.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-category-form',
    standalone: true,
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.css'],
    imports: [AdminSidebarComponent, CommonModule, ReactiveFormsModule]
})
export class CategoryFormComponent implements OnInit, OnDestroy {
    categoryForm?: FormGroup;
    categoryId: any;
    category: any;
    subscriber: Subscription | undefined;
    routeSubscriber: Subscription | undefined;
    selectedFile: File | undefined;
    uploading: boolean = false; // Flag to track if image is uploading

    constructor(
        public categoryService: CategoryService,
        public activatedRoute: ActivatedRoute,
        public formBuilder: FormBuilder,
        public router: Router
    ) {}

    get getName() { return this.categoryForm?.get('name'); }
    get getDescription() { return this.categoryForm?.get('description'); }
    get getImage() { return this.categoryForm?.get('image'); }

    ngOnDestroy(): void {
        if (this.subscriber) {
            this.subscriber.unsubscribe();
        }
        if (this.routeSubscriber) {
            this.routeSubscriber.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.categoryForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            image: ['', [Validators.required]],
            description: ['', [Validators.required]],
        });

        this.routeSubscriber = this.activatedRoute.params.subscribe({
            next: (params) => {
                this.categoryId = params['id'];
                this.getName?.setValue('');
                this.getDescription?.setValue('');

                if (this.categoryId != 0) {
                    this.subscriber = this.categoryService.getById(this.categoryId).subscribe({
                        next: (data) => {
                            this.category = data;
                            this.getName?.setValue(this.category.name);
                            this.getDescription?.setValue(this.category.description);
                            this.categoryForm?.get('image')?.setValue(this.category.image); // Assuming 'image' property from API
                        },
                        error: (error) => {
                            console.log(error);
                        }
                    });
                }
            }
        });
    }

    async categoryHandler() {
        if (this.categoryForm?.status === 'VALID') {
            console.log(this.categoryForm.value);

            if (this.categoryId == 0) {
                await this.categoryService.add(this.categoryForm.value).subscribe({
                    next: () => {
                        this.router.navigate(['/admincategory']);
                    },
                    error: (error) => {
                        console.log(error);
                    }
                });
            } else {
                this.categoryService.edit(this.category.id, this.categoryForm.value).subscribe({
                    next: () => {
                        this.router.navigate(['/admincategory']);
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
            this.uploading = true; // Set uploading flag to true

            const formData = new FormData();
            formData.append('file', this.selectedFile);
            formData.append('upload_preset', 'angular_images'); // Replace with your Cloudinary upload preset

            try {
                const response = await fetch('https://api.cloudinary.com/v1_1/dbo2eybma/image/upload', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                if (data.secure_url) {
                    console.log("Uploaded image URL:", data.secure_url);
                    this.categoryForm?.get('image')?.setValue(data.secure_url);
                    this.categoryForm?.markAsDirty();
                } else {
                    console.error('Failed to upload file to Cloudinary:', data);
                }
            } catch (error) {
                console.error('Error uploading file to Cloudinary:', error);
            } finally {
                this.uploading = false; // Set uploading flag back to false
            }
        }
    }

    testImgURL() {
        console.log("Current image URL:", this.categoryForm?.get('image')?.value);
    }
}
