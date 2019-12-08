import { Component, OnInit } from "@angular/core";
import { Plantilla } from "src/app/Models/plantilla.model";
import { TipoPlantilla } from "src/app/Models/tipo-plantilla.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  tiposPlantilla: TipoPlantilla[];
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

  constructor(
    private service: ServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  plantilla: Plantilla;
  id: any;
  submitted: boolean = false;

  ngOnInit() {
    this.tiposPlantilla = [
      {
        id: 1,
        nombre: "Tipo 1"
      },
      {
        id: 2,
        nombre: "Tipo 2"
      },
      {
        id: 3,
        nombre: "Tipo 3"
      }
    ];
    this.plantilla = new Plantilla();
    this.id = localStorage.getItem("id");
    this.service.getPlantillaId(this.id).subscribe(
      data => {
        this.plantilla = data;
      },
      error => console.log(error)
    );
  }

  save() {
    this.service.updatePlantilla(this.plantilla).subscribe(
      data => {
        this.plantilla = data;
        this.router.navigate(["listar-plantillas"]);
      },
      error => {
        console.log("error to create");
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
