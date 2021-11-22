import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import prj4 from 'proj4'
import {register} from 'ol/proj/proj4';

prj4.defs("EPSG:9377","+proj=tmerc +lat_0=4.0 +lon_0=-73.0 +k=0.9992 +x_0=5000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
register(prj4);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  map: Map;

  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        center: [4800000,2100000],
        zoom: 10,
        projection: 'EPSG:9377',
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ]
    });
  }
}
