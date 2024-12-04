import { Component } from '@angular/core';
import { ADD_ITEMS_LIST } from 'src/app/constants/app.constant';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss']
})
export class PasswordsComponent {

  public addCardItems: any = [
    ADD_ITEMS_LIST.PASSWORDS
  ]

  public credentials: any[] = [
    {
      id: '1',
      domain_name: 'Apple ID',
      url: 'www.apple.com',
      username: 'richardjohnston@gmail.com',
      password: 'password',
      last_updated: '2 mins'
    },
    {
      id: '12',
      domain_name: 'Netflix',
      url: 'www.netflix.com',
      username: 'richardwing@gmail.com',
      password: 'password',
      last_updated: '5 mins'
    },
    {
      id: '13',
      domain_name: 'Spotify',
      url: 'www.spotify.com',
      username: 'someTestEmail@gmail.com',
      password: 'password',
      last_updated: '1 hour'
    },
    {
      id: '14',
      domain_name: 'Youtube',
      url: 'www.youtube.com',
      username: 'richardjohnston',
      password: 'password',
      last_updated: '3 days'
    },
    {
      id: '31',
      domain_name: 'Spotify',
      url: 'www.spotify.com',
      username: 'someTestEmail@gmail.com',
      password: 'password',
      last_updated: '1 hour'
    },
    {
      id: '146',
      domain_name: 'Youtube',
      url: 'www.youtube.com',
      username: 'richardjohnston',
      password: 'password',
      last_updated: '3 days'
    },
    {
      id: '551',
      domain_name: 'Spotify',
      url: 'www.spotify.com',
      username: 'someTestEmail@gmail.com',
      password: 'password',
      last_updated: '1 hour'
    },
    {
      id: '143',
      domain_name: 'Youtube',
      url: 'www.youtube.com',
      username: 'richardjohnston',
      password: 'password',
      last_updated: '3 days'
    },
    {
      id: '148',
      domain_name: 'Spotify',
      url: 'www.spotify.com',
      username: 'someTestEmail@gmail.com',
      password: 'password',
      last_updated: '1 hour'
    },
    {
      id: '123',
      domain_name: 'Youtube',
      url: 'www.youtube.com',
      username: 'richardjohnston',
      password: 'password',
      last_updated: '3 days'
    }
  ];
  public credentailDetails: any = undefined;
  public isPasswordVisible: boolean = false;

  openPasswordDialog(event: any): void {
    console.log(event)
  }

  showDetails(details: any): void {
    this.credentailDetails = details;
    this.isPasswordVisible = false;
  }

  copyPassword(password: string){
    navigator.clipboard.writeText(password)
    .then(() => {
      console.log('Copied to Clipboard')
    })
  }

}
