import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.css']
})
export class LayersComponent implements OnInit, OnChanges  {

  @Input() isLoading = false;
  @Input() ifCardLayer = false;
  @Input() messageResultLayer = '';

  //Send List of Layers ACC select for User
  @Output() selectLayers = new EventEmitter();
  // Material Panel
  panelOpenState = false;
  //List of Layers ACC for select
  layersList = [
    {id: 0, label: 'Predios', isCheck: false, service_basename: 'land', service_label: ''},
    {id: 1, label: 'Construcciones', isCheck: false, service_basename: 'land', service_label: ''},
  ];
  updateLayer = [];


  constructor() { }

  ngOnInit(): void {
  }

   //Emit List of Layers ACC select for User to Component Home-Geoportal
   changeSelection(value) {
    this.layersList[value.target.value].isCheck = value.target.checked;
    this.selectLayers.emit(this.layersList);
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
}
