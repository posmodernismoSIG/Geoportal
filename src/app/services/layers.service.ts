import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LayersService {
  
  host = 'https://busuario2.acc.gov.co';

  constructor(private http: HttpClient) {}

  /**
   * Service to consult the land - filter by Bounding Box of Map
   * @param points_box Points of Bounding Box
   * @returns georesponse layer ACC terreno-predio
   */
  getLayerByBoundingBox(points_bbox: string, layer, screen, zoom) {
    return this.http.get(
      `${this.host}/layers/${layer}/?bbox=${points_bbox}&screen=${screen}&zoom=${zoom}`
    );
  }

  /**
   * ## getCountFeaturesByGeometrySelect
   * Service to get counting characteristics by geometry selection
   * @param obj - Object:{type, coordinates}
   * @returns
   */
  getCountFeaturesByGeometrySelect(obj: any) {
    return this.http.get(
      `${this.host}/layers/land/count/filter-geometry/?${obj.type}=${obj.coordinates}`
    );
  }

  /**
   * ## Export Feature by Geometry Select
   *
   * Service for export files
   * @param format - type format to export file
   * @param filter_geometry - Geometry selected
   * @param value - Coordinates
   * @returns
   */
  getExportFeaturesByGeometrySelect( format: string, filter_geometry: string, value: string, srid: string ) {
    let a = document.createElement('a');
    a.setAttribute( 'href', `${this.host}/layers/land/export/${format}/filter-geometry/?${filter_geometry}=${value}&srid=${srid}`);
    a.setAttribute('target', '_blank');
    a.click();
  }


   /**
   * ## Counsulting Geojson in search with properties
   * @param value - string
   * @returns - response
   */
    getDataGeosearch(value: string) {
      return this.http.get(`${this.host}/geosearch/${value}`);
    }
  
}
