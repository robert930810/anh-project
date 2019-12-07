import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule
} from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "anh-project";
  mensaje = "new project";

  constructor(private router: Router) {}

  Listar() {
    this.router.navigate(["listar-plantillas"]);
  }

  Nuevo() {
    this.router.navigate(["add-plantilla"]);
  }
}
