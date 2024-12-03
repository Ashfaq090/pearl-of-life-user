import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notes-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notes-card.component.html',
  styleUrls: ['./notes-card.component.scss']
})
export class NotesCardComponent {

  @Input() items: any[] = [];
  @Output() readonly note = new EventEmitter<any>();

  emit(note: string){
    this.note.emit(note)
  }

}
