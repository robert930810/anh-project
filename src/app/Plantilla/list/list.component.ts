import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Plantilla } from "../../Models/plantilla.model";
import { ServiceService } from "../../Service/service.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  plantillas: Plantilla[];
  constructor(private router: Router, private service: ServiceService) {}

  ngOnInit() {
    this.service.getPlantillas().subscribe(data => {
      this.plantillas = data;
    });
  }

  Edit(plantilla: Plantilla) {
    localStorage.setItem("id", plantilla.id.toString());
    this.router.navigate(["edit-plantilla"]);
  }

  Delete(plantilla: Plantilla) {
    this.service.deletePlantilla(plantilla.id).subscribe(
      data => {
        alert("Se eliminó correctamente la plantilla");
        this.ngOnInit();
      },
      error => {
        alert("error en eliminar plantilla");
      }
    );
  }

  Listar() {
    this.router.navigate(["listar-plantillas"]);
  }

  Nuevo() {
    this.router.navigate(["add-plantilla"]);
  }
}
