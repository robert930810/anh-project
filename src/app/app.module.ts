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
import { AngularFireModule } from "angularfire2";
import { AngularFireStorageModule } from "angularfire2/storage";
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatInputModule,
  MatListModule,
  MatButtonModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatSelectModule
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
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSelectModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAIW60ddmlmNSk0LlZ5Ish7n-siM500iNw",
      authDomain: "anh-files.firebaseapp.com",
      databaseURL: "https://anh-files.firebaseio.com",
      projectId: "anh-files",
      storageBucket: "anh-files.appspot.com",
      messagingSenderId: "681648512129",
      appId: "1:681648512129:web:130ee51a1ddb6f031cc180"
    }),
    AngularFireStorageModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
