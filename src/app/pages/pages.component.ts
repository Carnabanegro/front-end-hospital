import { Component, OnInit } from '@angular/core';
//import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  
  year = new Date().getFullYear();
  constructor(/*private settings : SettingsService*/) { }


  
  ngOnInit(): void {
  }


  

}