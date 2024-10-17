import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductosService } from '../services/productos.service';
import { CategoriaService } from '../services/categoria.service';
import { ProductoModel } from '../models/producto.model';
import { CategoriaModel } from '../models/categoria.model';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-agregarproducto',
  templateUrl: './agregarproducto.page.html',
  styleUrls: ['./agregarproducto.page.scss'],
})
export class AgregarproductoPage implements OnInit {

  edit=false;
  @Input() producto:ProductoModel | undefined;
  categorias:CategoriaModel[] | undefined;
  datos={
    descripcion:'',
    idcategoria:'',
    precio:'',
    cantidad:''
  }
  createFormGroup(){
    return new FormGroup({
      descripcion: new FormControl('',[Validators.required]),
      idcategoria: new FormControl(null,[Validators.required]),
      precio: new FormControl('',[Validators.required]),
      cantidad: new FormControl('',[Validators.required])
    });
  }
  validation_messages = {
      'descripcion': [

         { type: 'required', message: 'Escriba Nombre.' }
      ],
      'idcategoria': [
        { type: 'required', message: 'Seleccione categoria' }
      ],
      'precio': [
        { type: 'required', message: 'Escriba precio' }
      ],
      'cantidad': [
        { type: 'required', message: 'Escriba cantidad' },
      ]
  }
  registrarForm : FormGroup;
  constructor(private modalCtrl:ModalController,private serviceproducto:ProductosService,private servicecategoria:CategoriaService,public formBuilder:FormBuilder){
      this.registrarForm=this.createFormGroup();
  }
  ngOnInit() {
      this.servicecategoria.ObtenerTodos().subscribe(
      response=>{
      this.categorias=response;
      });
      }
  cerrarModal(){
      this.modalCtrl.dismiss(null,'cerrado');
  }
  onSubmit(){
    if(this.edit)
    {
      /*
      No implementado*/
    }
    else
    {
      const producto=this.registrarForm.value;
      this.serviceproducto.Agregar(producto).subscribe(response=>
      {
        this.modalCtrl.dismiss(response,'creado');
        console.log(response);
      });
    }
  }
}
