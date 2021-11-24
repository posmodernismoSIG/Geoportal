import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Stroke, Style, Fill, Circle as CircleStyle  } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
// Proj4
import prj4 from 'proj4'
import {register} from 'ol/proj/proj4';
prj4.defs("EPSG:9377","+proj=tmerc +lat_0=4.0 +lon_0=-73.0 +k=0.9992 +x_0=5000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
register(prj4);
// import toEPSG4326 from 'ol/proj/epsg4326';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  //Layers Select of component Layers
  selectLayersACC: any;
  // Instance Map
  map: Map;
  // Test Geojson
  geojson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -74.31221008300781,
                4.664714323348144
              ],
              [
                -74.13780212402344,
                4.664714323348144
              ],
              [
                -74.13780212402344,
                4.762914661561256
              ],
              [
                -74.31221008300781,
                4.762914661561256
              ],
              [
                -74.31221008300781,
                4.664714323348144
              ]
            ]
          ]
        }
      }
    ]
  }

  //Save value emit Object Layers  of component Layers
  selectLayers(value: any) {
    console.log(value)
    this.selectLayersACC = value;
    this.getTerrenoPredio("kdjf")
    var bbox = this.map.getView().calculateExtent(this.map.getSize())
    console.log(bbox)
    // console.log(toEPSG4326(bbox))
    
  }

  ngOnInit(): void {
    this.initilizeMap();
    this.addVectorDataLayer(this.geojson);
    
  }

  initilizeMap() {
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

  
  addVectorDataLayer(geojson) {
    const image = new CircleStyle({
      radius: 5,
      fill: new Fill({
        color: 'rgb(4, 11, 70)',
      }),
      stroke: new Stroke({ color: '#FF9C32', width: 2 }),
    });

    const styles = {
      Point: new Style({
        image,
      }),
      LineString: new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1,
        }),
      }),
      MultiLineString: new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1,
        }),
      }),
      MultiPoint: new Style({
        image,
      }),
      MultiPolygon: new Style({
        stroke: new Stroke({
          color: 'yellow',
          width: 1,
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 0, 0.1)',
        }),
      }),
      Polygon: new Style({
        stroke: new Stroke({
          color: 'blue',
          lineDash: [4],
          width: 3,
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.1)',
        }),
      }),
      GeometryCollection: new Style({
        stroke: new Stroke({
          color: 'magenta',
          width: 2,
        }),
        fill: new Fill({
          color: 'magenta',
        }),
        image: new CircleStyle({
          radius: 10,
          fill: null,
          stroke: new Stroke({
            color: 'magenta',
          }),
        }),
      }),
      Circle: new Style({
        stroke: new Stroke({
          color: 'red',
          width: 2,
        }),
        fill: new Fill({
          color: 'rgba(255,0,0,0.2)',
        }),
      }),
    };
    
    const styleFunction = (feature) => {
      return styles[feature.getGeometry().getType()];
    };
    const vectorSource = new VectorSource({
      features: [],
    });
    vectorSource.clear();
    vectorSource.addFeatures(new GeoJSON({
      defaultDataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:9377'
    }).readFeatures(geojson));
    
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: styleFunction,
    });
    if (this.map.getLayers().getLength() === 2) {
      this.map.getLayers().getArray().pop();
    }
    this.map.addLayer(vectorLayer);
    this.map.getView().fit(vectorSource.getExtent());
  }


  private getTerrenoPredio(points: string) {
    console.log("jej")
    // if (this.selectLayersACC[0]['isChecked'] && this.map.getZoom() > 14) {
    //   this.connectionService.getTerrenoByBoundingBox(points)
    //     .subscribe((response: any) => {
    //       this.layerTerrenoPredio.clearLayers();
    //       this.layerTerrenoPredio = L.geoJSON(response,
    //         {
    //           style: (feature) => ({
    //             weight: 1.8,
    //             opacity: 0.5,
    //             color: '#9c7a08',
    //             fillOpacity: 0,
    //           }),
    //           onEachFeature: (feature, layer) => (
    //             layer.bindPopup(feature.properties.numero_predial)
    //           ),
    //         }

    //       ).addTo(this.map);
    //     });
    // } else {
    //   this.layerTerrenoPredio.clearLayers();
    // }

  }


}
