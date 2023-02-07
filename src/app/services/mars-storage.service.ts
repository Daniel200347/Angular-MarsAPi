import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IMarsPhoto} from "../models/mars-photo/mars-photo.model";

@Injectable({
  providedIn: 'root'
})
export class MarsStorageService {

  constructor(private http: HttpClient) {

  }

  getMarsPhotos(page: number, sol: string, camera: string) {
    return this.http.get<{ photos: IMarsPhoto[] }>("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos", {
      params: {
        page,
        sol,
        camera,
        api_key: 'FEmkIImvioCc8KdusS71sltv01X1zlfcG98tVhhp'
      }
    });
  }
}
