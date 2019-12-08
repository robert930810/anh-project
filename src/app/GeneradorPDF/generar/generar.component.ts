import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";

import { Router } from "@angular/router";
import { Contratista } from "../../Models/contratista.model";
import { Plantilla } from "../../Models/plantilla.model";
import { ServiceService } from "../../Service/service.service";
import { FormControl } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";

import { AngularEditorConfig } from "@kolkov/angular-editor";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import * as jsPDF from "jspdf";

@Component({
  selector: "app-generar",
  templateUrl: "./generar.component.html",
  styleUrls: ["./generar.component.css"]
})
export class GenerarComponent implements OnInit {
  submitted = false;
  submittedError = false;
  selectedOption: Number;
  panelOpenState = false;
  @ViewChild("content", { static: false }) content: ElementRef;
  contentAux: any;
  plantillas: Plantilla[];
  plantilla: Plantilla;
  nombre: String;
  contenido: String;
  contratistas: Contratista[];
  contratista1: Contratista = new Contratista();
  contratista2: Contratista = new Contratista();
  contratista3: Contratista = new Contratista();
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "auto",
    minHeight: "0",
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
    private router: Router,
    private service: ServiceService,
    private renderer: Renderer2,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    //let content = this.content.nativeElement;
    //console.log(content);
    this.contratistas = [
      {
        id: 1,
        identificacion: 1088310731,
        nombre: "Robert García Moreno",
        contrato: 1234,
        inicioContrato: new Date("October 15, 2018 05:35:32").toString(),
        finContrato: new Date("October 15, 2019 05:35:32").toString(),
        telefono: 3214563212,
        cdp: 4567,
        objeto: "Prestación de Servicios",
        ordenador: "Viceprecidencia Administrativa",
        supervidor: "Juan Rodriguez",
        abogado: "Daniel Cardona"
      },
      {
        id: 2,
        identificacion: 1088320918,
        nombre: "Gustavo Cardona",
        contrato: 4567,
        inicioContrato: new Date("Noviembre 15, 2018 05:35:32").toString(),
        finContrato: new Date("Diciembre 15, 2019 05:35:32").toString(),
        telefono: 3114567892,
        cdp: 1234,
        objeto: "Prestación de Servicios 2",
        ordenador: "Viceprecidencia Academica",
        supervidor: "Juan García",
        abogado: "Daniel Robles"
      },
      {
        id: 3,
        identificacion: 1088123456,
        nombre: "Julian Rodriguez",
        contrato: 8910,
        inicioContrato: new Date("October 15, 2018 05:35:32").toString(),
        finContrato: new Date("October 15, 2019 05:35:32").toString(),
        telefono: 3104265432,
        cdp: 9876,
        objeto: "Prestación de Servicios 3",
        ordenador: "Viceprecidencia Administrativa",
        supervidor: "Jhonatan Ramirez",
        abogado: "Mateo Osorio"
      }
    ];

    this.service.getPlantillas().subscribe(data => {
      this.plantillas = data;
      console.log(this.plantillas);
    });
  }

  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

  getPlantilla() {
    this.service.getPlantillaId(this.selectedOption).subscribe(data => {
      this.plantilla = data;
      this.contenido = data.contenido;
      let contratistaTest = this.contratista;

      let listaComodines = [
        "[identificacion]",
        "[nombre]",
        "[contrato]",
        "[inicioContrato]",
        "[finContrato]",
        "[telefono]",
        "[cdp]",
        "[objeto]",
        "[supervidor]",
        "[abogado]"
      ];

      let tmpContenido: string = "";
      let dataContenido = data.contenido;
      listaComodines.forEach(element => {
        let tmpContratista = element.replace("[", "").replace("]", "");

        tmpContenido = dataContenido.replace(
          element,
          contratistaTest[tmpContratista]
        );
        if (tmpContenido !== dataContenido) {
          this.contenido = tmpContenido;
          dataContenido = this.contenido.toString();
          this.submitted = true;
        }
      });
      console.log(this.contenido);
      console.log(this.plantilla);
      this.nombre = this.plantilla.nombre;
    });
  }

  contratista: Contratista;
  findObject(id: Number) {
    const contratista = this.contratistas.find(
      element => element.identificacion == id
    );

    if (contratista == undefined) {
      console.log("error");
      this.submitted = false;
      this.submittedError = true;
      return 0;
    } else {
      this.submittedError = false;
      this.contratista = contratista;
      this.panelOpenState = true;
      if (this.contenido != undefined) {
        this.getPlantilla();
      }
      return contratista;
    }
  }

  ngAfterViewInit() {
    this.contentAux = this.content.nativeElement;
  } // throws an error }

  generatePdf() {
    let doc = new jsPDF();

    let specialElementHandlers = {
      "#content": function(element, rendered) {
        return true;
      }
    };
    let content = this.contentAux;

    doc.fromHTML(content.innerHTML, 15, 15, {
      width: 190,
      elementHandlers: specialElementHandlers
    });

    console.log(content.innerHTML);

    doc.save("test.pdf");
  }
}
