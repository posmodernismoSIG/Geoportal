import { Component, OnInit, SimpleChanges, Output, Input, EventEmitter, OnChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayersService } from '../../services/layers.service';

interface FeatureItem {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: any;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit, OnChanges  {

  @Output() layerSearch = new EventEmitter();
  @Input() propertiersLand: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private layerService: LayersService
  ) {}

  checkoutForm = this.formBuilder.group({
    value_search: '',
  });

  formdata: FormGroup;
  validateForm: Validators;
  lands: FeatureItem[];
  result_geosearch: any;

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      value_search: [null, [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.propertiersLand)
    // changes.prop contains the old and the new value...
  }

  /**
   * Fetch lands by filter and emit response layer
   */
  searchLand() {
    this.layerService
      .getDataGeosearch(this.checkoutForm.value.value_search)
      .subscribe((response: any) => {
        if (response["success"]){
          this.result_geosearch = "Consulta exitosa. Se detecto una búsqueda de tipo: " + response["data-type"] + ". "
          this.layerSearch.emit(response["data"])
        } else {
          this.result_geosearch = "No se encontraron resultados. Se detecto una búsqueda de tipo: " + response["data-type"] + ". "
        }
      });
  }
}
