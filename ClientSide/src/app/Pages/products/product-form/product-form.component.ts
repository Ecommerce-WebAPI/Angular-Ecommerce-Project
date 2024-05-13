import { Component } from '@angular/core';
import { AdminSidebarComponent } from "../../../components/admin-sidebar/admin-sidebar.component";

@Component({
    selector: 'app-product-form',
    standalone: true,
    templateUrl: './product-form.component.html',
    styleUrl: './product-form.component.css',
    imports: [AdminSidebarComponent]
})
export class ProductFormComponent {

}
