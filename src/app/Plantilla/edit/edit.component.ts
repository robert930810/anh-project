import { Component, OnInit } from "@angular/core";
import { Plantilla } from "src/app/Models/plantilla.model";
import { Comodin } from "../../Models/comodin.model";
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
  comodines: Comodin[];
  ObtenerComodines = false;
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
    this.service.getTipoPlantillas().subscribe(data => {
      this.tiposPlantilla = data['data'];
    });
    this.plantilla = new Plantilla();
    this.id = localStorage.getItem("id");
    this.service.getPlantillaId(this.id).subscribe(
      data => {
        this.plantilla = data['data'][0];
      },
      error => console.log(error)
    );
  }

  save() {
    this.service.updatePlantilla(this.plantilla).subscribe(
      data => {
        this.plantilla = data['data'];
        this.router.navigate(["listar-plantillas"]);
      },
      error => {
        console.log("error to create " + error);
      }
    );
  }

  changed(element) {
    this.comodines = [];
    this.service.getComodines(element).subscribe(data => {
      this.comodines = data["data"];
    });
    this.ObtenerComodines = true;
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
