import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnChanges {

  @Input() navList: any;
  @Input() activeItem: string;
  public activeNav: any;
  
  constructor(
    // private readonly _dataService: DataService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    // console.log('ngOnChanges triggered');
    // console.log(changes);
    // console.log(this.navList)
  }

}
