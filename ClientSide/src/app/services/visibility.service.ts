import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  private visibilitySource = new BehaviorSubject<boolean>(true);
  currentVisibility = this.visibilitySource.asObservable();

  changeVisibility(visible: boolean) {
    this.visibilitySource.next(visible);
  }
}
