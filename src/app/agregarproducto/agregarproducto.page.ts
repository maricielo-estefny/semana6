import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductosService } from '../services/productos.service';
import { CategoriaService } from '../services/categoria.service';
import { ProductoModel } from '../models/producto.model';
import { CategoriaModel } from '../models/categoria.model';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregarproducto',
  templateUrl: './agregarproducto.page.html',
  styleUrls: ['./agregarproducto.page.scss'],
})
export class AgregarproductoPage implements OnInit {
  // isToastOpen: boolean = false;
  // toastMessage: string = '';
  // toastColor: string = '';
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
  constructor(private modalCtrl:ModalController,private service:ProductosService,private servicecategoria:CategoriaService,public formBuilder:FormBuilder){
      this.registrarForm=this.createFormGroup();
  }
  ngOnInit() {
      this.servicecategoria.ObtenerTodos().subscribe(
      response=>{
       this.categorias=response;
      });
      if (this.producto) {
        this.edit = true;
        this.registrarForm.patchValue({
          descripcion: this.producto.descripcion,
          idcategoria: this.producto.idcategoria,
          precio: this.producto.precio,
          cantidad: this.producto.cantidad
        });
      }
  }
  cerrarModal(){
      this.modalCtrl.dismiss(null,'cerrado');
  }
  onSubmit(){
    if(this.edit)
    {
      if (this.producto) {
        const producto2 = this.registrarForm.value;
        producto2.idproducto = this.producto.idproducto;
        //console.log('Datos antes de enviar:', categoria2);
        this.service.Actualizar(producto2, producto2.idproducto).subscribe(
          (response) => {
            // Verifica la respuesta del backend
            console.log('Actualización exitosa', response);
            // Cerrar el modal y enviar la categoría actualizada
            this.modalCtrl.dismiss(response, 'editado');
          },
          (error) => {
            // Manejo de errores
            console.error('Error al actualizar el producto', error);
          }
        );
      } else {
        console.error('Producto is undefined');
      }
    }
    else
    {
      const producto=this.registrarForm.value;
      this.service.Agregar(producto).subscribe(response=>
      {
        this.modalCtrl.dismiss(response,'creado');
        console.log(response);
      });
    }
  }
}
