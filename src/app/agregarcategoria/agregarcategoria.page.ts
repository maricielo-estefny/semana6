import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoriaService } from '../services/categoria.service';
import { CategoriaModel } from '../models/categoria.model';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-agregarcategoria',
  templateUrl: './agregarcategoria.page.html',
  styleUrls: ['./agregarcategoria.page.scss'],
})
export class AgregarcategoriaPage implements OnInit {
  @Input() categoria:CategoriaModel | undefined;
  edit=false;
  datos={
    descripcion:'',
  }
  createFormGroup(){
    return new FormGroup({
      descripcion: new FormControl('',[Validators.required]),
    });
  }
  validation_messages = {
    'descripcion': [
       { type: 'required', message: 'Escriba la descripcion.' }
    ],

  }
  registrarForm : FormGroup;
  constructor(private modalCtrl:ModalController,private service:CategoriaService,private servicecategoria:CategoriaService,public formBuilder:FormBuilder){
      this.registrarForm=this.createFormGroup();
  }
  ngOnInit() {
    if (this.categoria){
      this.edit=true;
      this.registrarForm.patchValue({
        descripcion: this.categoria.descripcion
      });
    }
  }
  cerrarModal(){
    this.modalCtrl.dismiss(null,'cerrado');
  }
  onSubmit(){
    if (this.edit) {
      if (this.categoria) {
        const categoria2 = this.registrarForm.value;
        categoria2.idcategoria = this.categoria.idcategoria;
        //console.log('Datos antes de enviar:', categoria2);
        this.service.Actualizar(categoria2, categoria2.idcategoria).subscribe(
          (response) => {
            // Verifica la respuesta del backend
            console.log('Actualización exitosa', response);
            // Cerrar el modal y enviar la categoría actualizada
            this.modalCtrl.dismiss(response, 'editado');
          },
          (error) => {
            // Manejo de errores
            console.error('Error al actualizar la categoría', error);
          }
        );
      } else {
        console.error('Categoria is undefined');
      }
    }
    else
    {
      const categoria=this.registrarForm.value;
      this.service.Agregar(categoria).subscribe(response=>
      {
        this.modalCtrl.dismiss(response,'creado');
        console.log(response);
      });
    }
  }
}
