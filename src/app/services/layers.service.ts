import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LayersService {

  constructor(private http: HttpClient) { }

  /**
  * Service to consult the land - filter by Bounding Box of Map 
  * @param points_box Points of Bounding Box
  * @returns georesponse layer ACC terreno-predio
  */
   getLayerByBoundingBox(points_bbox: string, layer, screen, zoom) {
    return this.http.get(`https://busuario2.acc.gov.co/layers/${layer}/?bbox=${points_bbox}&screen=${screen}&zoom=${zoom}`);
  }


}
