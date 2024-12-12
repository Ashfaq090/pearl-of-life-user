import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/services/shared.service';
import { KeyHolderService } from './key-holders.service';
import { ManageKeyHoldersComponent } from './manage-key-holders/manage-key-holders.component';
import { ADD_ITEMS_LIST } from 'src/app/constants/app.constant';

@Component({
  selector: 'app-key-holders',
  templateUrl: './key-holders.component.html',
  styleUrls: ['./key-holders.component.scss']
})
export class KeyHoldersComponent implements OnInit {

  public keyholders: any[] = [];

  constructor(
    private readonly notesService: KeyHolderService,
    private readonly ngbModalService: NgbModal,
    private readonly  sharedService: SharedService,
    private readonly router: Router
  ){}

  // public addCardItems: any = [
  //   ADD_ITEMS_LIST.KEY_HOLDERS
  // ]

  ngOnInit(): void{
    this.getKeyHolders()
  }

  getKeyHolders(){
    this.keyholders = [
      {
        first_name: 'Ashfaq',
        last_name: 'Ahmed',
        id: 1
      },
      {
        first_name: 'Ashfaq',
        last_name: 'Ahmed',
        id: 2
      },
      {
        first_name: 'Ashfaq',
        last_name: 'Ahmed',
        id: 3
      },
      {
        first_name: 'Ashfaq',
        last_name: 'Ahmed',
        id: 4
      },
      {
        first_name: 'Ashfaq',
        last_name: 'Ahmed',
        id: 5
      },
      {
        first_name: 'Ashfaq',
        last_name: 'Ahmed',
        id: 6
      },
      {
        first_name: 'Ashfaq',
        last_name: 'Ahmed',
        id: 7
      },
      {
        first_name: 'Ashfaq',
        last_name: 'Ahmed',
        id: 8
      }
    ]
  }

  openNotePopup(item: any){
    // Open the modal
    const modalRef = this.ngbModalService.open(ManageKeyHoldersComponent, {
      size: 'lg',
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
     this.getKeyHolders();
    })
    .catch((error) => console.log(error));
  }

}
