import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-items-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './add-items-card.component.html',
  styleUrls: ['./add-items-card.component.scss']
})
export class AddItemsCardComponent {

  @Input() items: any[];
  @Output() readonly label = new EventEmitter<any>();

  emit(component: string){
    this.label.emit({component})
  }

}
