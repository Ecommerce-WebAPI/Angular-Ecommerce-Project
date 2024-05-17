import { Component } from '@angular/core';
import { CategoriesComponent } from '../../components/categories/categories.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CategoriesComponent]
})
export class HomeComponent {

}

