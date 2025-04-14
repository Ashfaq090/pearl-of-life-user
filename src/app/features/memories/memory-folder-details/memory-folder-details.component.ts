import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ADD_ITEMS_LIST } from 'src/app/constants/app.constant';
import { ManageMemoriesComponent } from '../manage-memories/manage-memories.component';
import { ActivatedRoute } from '@angular/router';
import { MemoriesService } from '../memories.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-memory-folder-details',
  templateUrl: './memory-folder-details.component.html',
  styleUrls: ['./memory-folder-details.component.scss']
})
export class MemoryFolderDetailsComponent implements OnInit {

  public addCardItems: any = [
    ADD_ITEMS_LIST.MEMORIES
  ];
  public folder_id: string = '';
  public folderDetails: any = {};

  constructor(
    private readonly ngbModalService: NgbModal,
    private readonly activatedRoute: ActivatedRoute,
    private readonly memoriesService: MemoriesService,
    private readonly sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.folder_id = (params.get('id') || '').toString();
      if (this.folder_id)
        this.getFolderDetails();
    });
  }

  getFolderDetails() {
    this.memoriesService.getMemoriesFolderDetails(this.folder_id).subscribe({
      next: (response: any) => {
        this.folderDetails = response;
        // this.imageUrl = response?.image_path ? BE_URL + response?.image_path?.slice(1) : '';
      },
      error: (err: HttpErrorResponse) => {
        this.sharedService.showToast({
          classname: 'error',
          text: err?.error?.message,
        });
      }
    });
  }

  addMemories(event: any) {
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
      item: {
        folder_id: this.folder_id
      },
    };

    // Handle the modal result
    modalRef.result
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  }

}
