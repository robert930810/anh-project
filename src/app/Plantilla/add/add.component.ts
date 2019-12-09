import { Component, OnInit } from "@angular/core";
import { Plantilla } from "src/app/Models/plantilla.model";
import { Comodin } from "../../Models/comodin.model";
import { TipoPlantilla } from "src/app/Models/tipo-plantilla.model";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"]
})
export class AddComponent implements OnInit {
  tiposPlantilla: TipoPlantilla[];
  plantilla: Plantilla = new Plantilla();
  comodines: Comodin[];
  submitted = false;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "auto",
    minHeight: "500px",
    maxHeight: "auto",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" }
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote"
      },
      {
        name: "redText",
        class: "redText"
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1"
      }
    ],
    uploadUrl: "v1/image",
    sanitize: true,
    toolbarPosition: "top",
    toolbarHiddenButtons: [["bold", "italic"], ["fontSize"]]
  };

  constructor(private router: Router, private service: ServiceService) {}

  ngOnInit() {
    this.service.getTipoPlantillas().subscribe(data => {
      this.tiposPlantilla = data['data'];
    });
  }

  changed(element){
    this.comodines = [];
    this.service.getComodines(element).subscribe(data => {
      this.comodines = data['data'];
    });
  }

  save() {
    this.service.createPlantilla(this.plantilla).subscribe(
      data => {
        alert("Se agregó correctamente la plantilla");
        console.log(data);
        this.plantilla = new Plantilla();
        this.router.navigate(["listar-plantillas"]);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  Listar() {
    this.router.navigate(["listar-plantillas"]);
  }

  Nuevo() {
    this.router.navigate(["add-plantilla"]);
  }
}
