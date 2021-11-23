import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.css']
})
export class LayersComponent implements OnInit {

  panelOpenState = false;

  //List of Layers ACC for select
  checkboxesLayersList = [
    {
      id: 'C000',
      label: 'Predios',
      isChecked: false
    },
    {
      id: 'C001',
      label: 'Construcciones',
      isChecked: false
    }
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
