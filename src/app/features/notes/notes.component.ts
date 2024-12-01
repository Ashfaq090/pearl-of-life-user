import { Component, OnInit } from '@angular/core';
import { FeaturesService } from '../features.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  constructor(
    private readonly featuresService: FeaturesService
  ){}

  public notes: any[];
  
  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(){
    this.featuresService.getNotes().subscribe({
      next: (response) => {
        this.notes = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}