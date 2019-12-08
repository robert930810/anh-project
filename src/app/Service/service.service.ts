import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Plantilla } from "../Models/plantilla.model";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  Url = "http://localhost:8000/plantillas";

  getPlantillas(): Observable<Plantilla[]> {
    return this.http.get<Plantilla[]>(this.Url);
  }

  getPlantillaId(id: Number): Observable<Plantilla> {
    return this.http.get<Plantilla>(this.Url + "/" + id);
  }

  createPlantilla(plantilla: Plantilla): Observable<Plantilla> {
    return this.http.post<Plantilla>(this.Url, plantilla);
  }

  updatePlantilla(plantilla: Plantilla): Observable<Plantilla> {
    return this.http.put<Plantilla>(this.Url + "/" + plantilla.id, plantilla);
  }

  deletePlantilla(id: Number): Observable<Plantilla> {
    return this.http.delete<Plantilla>(this.Url + "/" + id);
  }
}
