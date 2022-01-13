import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

    @Output() geomSearch = new EventEmitter();

    // Material Panel
    panelOpenState = false;
    enable = true;
    disable = false;
    type_geom = '';

    geoms: Geoms[] = [
      {value: 'Circle', viewValue: 'Point'},
      {value: 'Circle', viewValue: 'Polygon'},
      {value: 'Circle', viewValue: 'Circle'},
    ];

    message = "Aún no ha realizado ninguna consulta por geometría."

    formdata: FormGroup;
    validateForm: Validators;

    checkoutForm = this.formBuilder.group({
      type_geom: '',
    });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
    type_geom: [[Validators.required]],
  });
  }

  enableFilter() {
    this.disable = true;
    this.enable = false;
    this.type_geom = this.checkoutForm.value.type_geom
    if (this.type_geom == 'point' || this.type_geom == 'polygon' || this.type_geom == 'Circle' ){ 
      this.geomSearch.emit(this.type_geom)
    }else{
      this.geomSearch.emit('desactive')
      this.geomSearch.emit('clear')
    }
  }

  desable_draw(){
    this.disable = false;
    this.enable = true;
    this.geomSearch.emit('desactive')
    this.geomSearch.emit('clear')
  }

  searchLands(){
    this.geomSearch.emit('consultar')
  }

  clearLands(){
    this.geomSearch.emit('clear')
  }

}
