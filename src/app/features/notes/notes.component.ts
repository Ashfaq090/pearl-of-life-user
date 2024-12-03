import { Component, OnInit } from '@angular/core';
import { ADD_ITEMS_LIST } from 'src/app/constants/app.constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageNotesComponent } from './manage-notes/manage-notes.component';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  constructor(
    private readonly notesService: NotesService,
    private readonly ngbModalService: NgbModal,
  ){}

  public notes: any[];
  public addCardItems: any = [
    ADD_ITEMS_LIST.NOTES
  ]
  
  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(){
    this.notesService.getNotes().subscribe({
      next: (response) => {
        this.notes = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  openNotePopup(item: any){

    console.log(item)

    // Open the modal
    const modalRef = this.ngbModalService.open(ManageNotesComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
      centered: false,
    });

    // Set the modal data
    modalRef.componentInstance.data = {
      name: item?.id ? 'Edit' : 'Add',
      item: item?.id ? item : null,
    };

     // Handle the modal result
     modalRef.result
     .then((result) => {
       // Push the new result to tabledata
      //  this.tabledata.push(result);
      this.getNotes();
     })
     .catch((error) => console.log(error));

  }

}