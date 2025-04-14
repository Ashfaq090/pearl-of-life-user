import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ADD_ITEMS_LIST } from 'src/app/constants/app.constant';
import { ManageNotesComponent } from '../notes/manage-notes/manage-notes.component';
import { ManagePasswordComponent } from '../passwords/manage-password/manage-password.component';
import { ManageMemoriesComponent } from '../memories/manage-memories/manage-memories.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(
    private readonly ngbModalService: NgbModal,
  ) { }

  public addCardItems: any = [
    ADD_ITEMS_LIST.MEMORIES,
    ADD_ITEMS_LIST.NOTES,
    ADD_ITEMS_LIST.ASSETS
  ];

  public addComponent(event: any) {
    console.log(event)
    switch (event.component) {
      case ADD_ITEMS_LIST.NOTES.label:
        this.addNote();
        break;
      case ADD_ITEMS_LIST.PASSWORDS.label:
        this.addPassword();
        break;
      case ADD_ITEMS_LIST.MEMORIES.label:
        this.addMemories();
        break;
      default:
        return;
    }
  }

  addPassword() {
    // Open the modal
    const modalRef = this.ngbModalService.open(ManagePasswordComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
      centered: false,
    });

    // Set the modal data
    modalRef.componentInstance.data = {
      name: 'Add',
      item: null,
    };

    // Handle the modal result
    modalRef.result
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  }

  addNote() {
    // Open the modal
    const modalRef = this.ngbModalService.open(ManageNotesComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
      centered: false,
    });

    // Set the modal data
    modalRef.componentInstance.data = {
      name: 'Add',
      item: null,
    };

    // Handle the modal result
    modalRef.result
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  }

  addMemories() {
    // Open the modal
    const modalRef = this.ngbModalService.open(ManageMemoriesComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
      centered: false,
    });

    // Set the modal data
    modalRef.componentInstance.data = {
      name: 'Add',
      item: null,
    };

    // Handle the modal result
    modalRef.result
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  }

}
