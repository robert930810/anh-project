import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Plantilla } from "../Models/plantilla.model";
import { TipoPlantilla } from '../Models/tipo-plantilla.model'
import { Observable, of, from } from "rxjs";
import { catchError } from "rxjs/operators";
import { Comodin } from '../Models/comodin.model';

@Injectable({
  providedIn: "root"
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  // Url = "http://localhost:8000/plantillas";
  Url = "https://localhost:44382/api/plantilla"

  getPlantillas(): Observable<Plantilla[]> {
    return this.http.get<Plantilla[]>(this.Url + "/obtener");
  }

  getTipoPlantillas(): Observable<TipoPlantilla[]> {
    return this.http.get<TipoPlantilla[]>(this.Url + "/obtenertipos");
  }

  getComodines(id: Number): Observable<Comodin[]> {
    return this.http.get<Comodin[]>(this.Url + "/obtenercomodines/" + id);
  }

  getPlantillaId(id: Number): Observable<Plantilla> {
    return this.http.get<Plantilla>(this.Url + "/obtenerporid/" + id);
  }

  createPlantilla(plantilla: Plantilla): Observable<Plantilla> {
    return this.http.post<Plantilla>(this.Url + '/crear', plantilla);
  }

  updatePlantilla(plantilla: Plantilla): Observable<Plantilla> {
    return this.http.post<Plantilla>(this.Url + "/editar", plantilla);
  }

  deletePlantilla(id: Number): Observable<Plantilla> {
    return this.http.get<Plantilla>(this.Url + "/borrar/" + id);
  }
}
