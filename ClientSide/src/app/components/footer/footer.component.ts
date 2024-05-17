import { Component, OnInit } from '@angular/core';
import { VisibilityService } from '../../services/visibility.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
isVisible: boolean = true;

  constructor(private visibilityService: VisibilityService) { }

  ngOnInit() {
    this.visibilityService.currentVisibility.subscribe(visible => this.isVisible = visible);
  }
}
