import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddComponent } from "./Plantilla/add/add.component";
import { EditComponent } from "./Plantilla/edit/edit.component";
import { ListComponent } from "./Plantilla/list/list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceService } from "../app/Service/service.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { GenerarComponent } from "./GeneradorPDF/generar/generar.component";
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatInputModule,
  MatListModule,
  MatButtonModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatSelectModule,
  MatChipsModule
} from "@angular/material";
@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    ListComponent,
    GenerarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSelectModule,
    MatChipsModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
