import { Component, OnInit } from '@angular/core';
import { VisibilityService } from '../../services/visibility.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
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
