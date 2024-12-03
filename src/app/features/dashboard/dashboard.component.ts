import { Component } from '@angular/core';
import { ADD_ITEMS_LIST } from 'src/app/constants/app.constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public addCardItems: any = [
    ADD_ITEMS_LIST.MEMORIES,
    ADD_ITEMS_LIST.NOTES,
    ADD_ITEMS_LIST.ASSETS,
    ADD_ITEMS_LIST.PASSWORDS
  ];

  public addComponent(event: any){
    console.log(event)
  }

}
