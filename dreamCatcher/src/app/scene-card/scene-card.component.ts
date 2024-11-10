import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scene-card',
  templateUrl: './scene-card.component.html',
  styleUrls: ['./scene-card.component.css']
})
export class SceneCardComponent {
  @Input() location: any;
  @Output() viewLocation = new EventEmitter<any>();

  onViewLocation() {
    this.viewLocation.emit(this.location);
  }
}
