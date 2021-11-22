import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.css']
})
export class LayersComponent implements OnInit {

  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
