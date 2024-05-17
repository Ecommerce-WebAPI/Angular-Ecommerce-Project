import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminSidebarComponent } from "../../../components/admin-sidebar/admin-sidebar.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-category-form',
    standalone: true,
    templateUrl: './category-form.component.html',
    styleUrl: './category-form.component.css',
    imports: [AdminSidebarComponent, CommonModule, ReactiveFormsModule]
})
export class CategoryFormComponent implements OnInit, OnDestroy {
    categoryForm?: FormGroup;
    categoryId: any;
    category: any;
    subscriber: any;
    constructor(
        public categoryService: CategoryService,
        public router: Router,
        public activetedRoute: ActivatedRoute,
        public formBuilder: FormBuilder
    ) {

    }


    get getName() {
        return this.categoryForm?.get('name');
    }

    get getDescription() {
        return this.categoryForm?.get('description');
    }

    get getImage() {
        return this.categoryForm?.get('image');
    }



    ngOnDestroy(): void {
        if (this.subscriber) {
            this.subscriber.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.categoryForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            image: ['', [Validators.required]],
            description: ['', [Validators.required]],
        });
        this.activetedRoute.params.subscribe({
            next: (params) => {
                this.categoryId = params['id'];
                this.getName?.setValue('');
                this.getDescription?.setValue('');
            }
        });

        if (this.categoryId != 0) {
            this.subscriber = this.category = this.categoryService
                .getById(this.categoryId).subscribe({
                    next: (data) => {
                        this.category = data;
                        this.getName?.setValue(this.category.name);
                        this.getDescription?.setValue(this.category.description);
                    },
                    error: (error) => {
                        console.log(error);
                    }
                });
        }
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
            }
            else {
                this.categoryService.edit(this.category.id, this.categoryForm.value).subscribe({
                    next: () => {
                        this.router.navigate(['/admincategory']);
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
    async onFileSelected(event: any) {
        console.log("file selected");
        this.selectedFile = event.target.files[0] as File;
        await this.uploadFile();
    }
    async uploadFile() {
        if (this.selectedFile) {
            const formData = new FormData();
            formData.append('file', this.selectedFile);
            formData.append('upload_preset', 'angular_images');
            fetch('https://api.cloudinary.com/v1_1/dbo2eybma/image/upload', {
                method: 'POST',
                body: formData,
            })
                .then(async (response) => await response.json())
                .then(async (data) => {
                    if (data.secure_url) {
                        console.log("url:" + data.secure_url);
                        this.categoryForm?.patchValue({ image: data.secure_url });
                        console.log("image:" + this.getImage);
                        this.categoryForm?.markAsDirty();

                    }
                })
                .catch((error) => {
                    console.error('Error uploading file to Cloudinary:', error);
                });
        }
    }

    testImgURL() {
        console.log("xxx:" + this.categoryForm?.controls['image'].value);
    }
}