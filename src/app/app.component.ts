import { Component, OnInit, AfterViewChecked , AfterViewInit} from '@angular/core';
import { LayersService } from './services/layers.service';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Stroke, Style, Fill, Circle as CircleStyle, Text } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import * as interaction from 'ol/interaction';
import * as proj from 'ol/proj';

// Proj4
import prj4 from 'proj4';
import { register } from 'ol/proj/proj4';
prj4.defs(
  'EPSG:9377',
  '+proj=tmerc +lat_0=4.0 +lon_0=-73.0 +k=0.9992 +x_0=5000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
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
  layerSearchACC: any;
  // Instance Map
  map: Map;
  // Output to component layers
  currentMessageResultLayer: String;
  isLoadingLayerACC: Boolean;
  ifCardLayerACC: Boolean;
  // Output properties land select
  propertiersLand: any;
  // Sources for Draw Map
  source = new VectorSource({ wrapX: false });
  draw = new VectorLayer({
    source: this.source,
  });
  currentLayers = {};
  vectorPredio = new VectorSource({
    features: [],
  });
  vectorConst = new VectorSource({
    features: [],
  });

  constructor(private layersService: LayersService) {
  }


  // Display selected layers in component layers
  selectLayers(value: any) {
    this.selectLayersACC = value;
    this.updateLayer();
  }

  layerSearch(value: any){
   this.addLayerData(value, 'search', '', this.vectorPredio)
  }

  updateLayer(){
      this.isLoadingLayerACC = true;
      this.ifCardLayerACC = true;
      this.currentMessageResultLayer = '';
      var bbox = this.map.getView().calculateExtent(this.map.getSize());
      var point_ne = proj.transform([bbox[0], bbox[1]], 'EPSG:9377', 'EPSG:4326');
      var point_xy = proj.transform([bbox[2], bbox[3]], 'EPSG:9377', 'EPSG:4326');
      var bbox_points = point_ne.concat(point_xy);
  
      if (this.selectLayersACC[0].isCheck || this.selectLayersACC[1].isCheck) {
        if (this.selectLayersACC[1].isCheck) {
          this.getLayer(
            bbox_points,
            this.selectLayersACC[1].service_basename,
            this.selectLayersACC[1].service_label,
            this.selectLayersACC[1].label,
            this.vectorConst
          );
        }
        if (this.selectLayersACC[0].isCheck) {
          this.getLayer(
            bbox_points,
            this.selectLayersACC[0].service_basename,
            this.selectLayersACC[0].service_label,
            this.selectLayersACC[0].label,
            this.vectorPredio
          );
        }
      } else {
        this.vectorPredio.clear();
        this.vectorConst.clear();
        this.isLoadingLayerACC = false;
        this.ifCardLayerACC = false;
      }
  }

  ngOnInit(): void {
    this.initilizeMap();
    // Allows to select lands
    let select = new interaction.Select();
    this.map.addInteraction(select);
    select.on('select', function (e) {
      var features = e.target.getFeatures();
      var properties = features["array_"][0]["values_"];
      properties["matricula_inmobiliaria"] = features["array_"][0]["id_"];
      this.propertiersLand = properties;
      console.log(this.propertiersLand)
    });
    //// Allows to draw in Map
    let draw = new interaction.Draw({
      source: this.source,
      type: 'Circle',
    });    
  }


  initilizeMap() {
    this.map = new Map({
      view: new View({
        center: [4800000, 2100000],
        zoom: 10,
        projection: 'EPSG:9377',
      }),
      layers: [new TileLayer({ source: new OSM() }), this.draw],
    });

    this.map.on('moveend', function () {
      console.log("je");
    });

  }

  private getLayer(points: string, service_layer, label, layer, vectorSource) {
    this.isLoadingLayerACC = true;
    this.ifCardLayerACC = true;
    this.layersService
      .getLayerByBoundingBox(
        points,
        service_layer,
        this.map.getSize(),
        this.map.getView().getZoom()
      )
      .subscribe((response: any) => {
        if (response['success']) {
          this.addLayerData(
            response['data'],
            service_layer,
            label,
            vectorSource
          );
          this.isLoadingLayerACC = false;
          this.ifCardLayerACC = false;
        } else {
          this.isLoadingLayerACC = false;
          this.currentMessageResultLayer =
            this.currentMessageResultLayer.concat(
              'Ocurrio un error (',
              response['message'],
              ') con la capa ',
              layer,
              ' / '
            );
        }
      });
  }

  addLayerData(geojson, layer, label, vectorSource) {
    const styles = {
      land: new Style({
        stroke: new Stroke({
          color: 'yellow',
          width: 1,
        }),
        text: new Text({
          font: '20px Calibri',
          placement: 'point',
          fill: new Fill({
            color: 'black',
          }),
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 0, 0.1)',
        }),
      }),
      search: new Style({
        stroke: new Stroke({
          color: 'rgba(255, 05, 25)',
          width: 1,
        }),
        text: new Text({
          font: '20px Calibri',
          placement: 'point',
          fill: new Fill({
            color: 'black',
          }),
        }),
        fill: new Fill({
          color: 'rgba(100, 5, 50, 0.8)',
        }),
      }),
      building: new Style({
        stroke: new Stroke({
          color: 'rgba(25, 25, 25)',
          width: 1,
        }),
        text: new Text({
          font: '20px Calibri',
          placement: 'point',
          fill: new Fill({
            color: 'black',
          }),
        }),
        fill: new Fill({
          color: 'rgba(100, 25, 250, 0.8)',
        }),
      }),
    };

    const styleFunction = (feature) => {
      // styles.land.getText().setText(feature.get(label));
      return styles[layer];
    };

  
    vectorSource.clear();
    vectorSource.addFeatures(
      new GeoJSON({
        defaultDataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:9377',
      }).readFeatures(geojson)
    );

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: styleFunction,
    });
    if (this.map.getLayers().getLength() === 2) {
      this.map.getLayers().getArray().pop();
    }
    this.map.addLayer(vectorLayer);
    if (layer == 'search'){
      this.map.getView().fit(vectorSource.getExtent());
    }
  }


}
