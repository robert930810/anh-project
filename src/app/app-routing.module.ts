import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddComponent } from "./Plantilla/add/add.component";
import { ListComponent } from "./Plantilla/list/list.component";
import { EditComponent } from "./Plantilla/edit/edit.component";
import { GenerarComponent } from "./GeneradorPDF/generar/generar.component";

const routes: Routes = [
  { path: "listar-plantillas", component: ListComponent },
  { path: "add-plantilla", component: AddComponent },
  { path: "edit-plantilla", component: EditComponent },
  { path: "generar-pdf", component: GenerarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
