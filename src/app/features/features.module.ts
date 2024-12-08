import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from '../shared/side-nav/side-nav.component';
import { HeaderComponent } from '../shared/header/header.component';
import { NotesComponent } from './notes/notes.component';
import { MemoriesComponent } from './memories/memories.component';
import { KeyHoldersComponent } from './key-holders/key-holders.component';
import { AssetsComponent } from './assets/assets.component';
import { PasswordsComponent } from './passwords/passwords.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ObituaryInfoComponent } from './obituary-info/obituary-info.component';
import { AddItemsCardComponent } from '../shared/add-items-card/add-items-card.component';
import { NotesCardComponent } from '../shared/notes-card/notes-card.component';
import { ManageNotesComponent } from './notes/manage-notes/manage-notes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../shared/confirmation-modal/confirmation-modal.component';
import { ManagePasswordComponent } from './passwords/manage-password/manage-password.component';


@NgModule({
  declarations: [
    FeaturesComponent,
    DashboardComponent,
    NotesComponent,
    MemoriesComponent,
    KeyHoldersComponent,
    AssetsComponent,
    PasswordsComponent,
    PersonalInfoComponent,
    ObituaryInfoComponent,
    ManageNotesComponent,
    ManagePasswordComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SideNavComponent,
    HeaderComponent,
    AddItemsCardComponent,
    NotesCardComponent,
    ReactiveFormsModule,
    NgbDatepickerModule,
    ConfirmationModalComponent
  ]
})
export class FeaturesModule { }
