import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TabsInterface } from 'src/app/interfaces/tabs.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private routes: Router) {
    //Change route to be populated dynamically
    this.mainTabs = [
      {name: 'Tables', id: 0, route: 'tables'},
      {name: 'Content Projection', id: 1, route: 'contentPrj'}
    ]
   }

  mainTabs: Array<TabsInterface> = [];
  ngOnInit(): void {
    
  }

}
