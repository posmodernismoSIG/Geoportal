import { Component, OnInit } from '@angular/core';


interface Geoms {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

    // Material Panel
    panelOpenState = false;

    geoms: Geoms[] = [
      {value: 'geom-0', viewValue: 'Point'},
      {value: 'geom-1', viewValue: 'Polygon'},
      {value: 'geom-2', viewValue: 'Circle'},
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
