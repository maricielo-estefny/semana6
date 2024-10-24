import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClienteService } from '../services/cliente.service';
import { ClienteModel } from '../models/cliente.model';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-agregarcliente',
  templateUrl: './agregarcliente.page.html',
  styleUrls: ['./agregarcliente.page.scss'],
})
export class AgregarclientePage implements OnInit {

  @Input() cliente:ClienteModel | undefined;
  edit=false;
  datos={
    dni:'',
    nombre:'',
    apellido:'',
  }
  createFormGroup(){
    return new FormGroup({
      dni: new FormControl('',[Validators.required]),
      nombre: new FormControl('',[Validators.required]),
      apellido: new FormControl('',[Validators.required])
    });
  }
  validation_messages = {
    'dni': [

       { type: 'required', message: 'Escriba su DNI.' }
    ],
    'nombre': [
      { type: 'required', message: 'Escriba su nombre' }
    ],
    'apellido': [
      { type: 'required', message: 'Escriba su apellido' },
    ]
  }
  registrarForm : FormGroup;
  constructor(private modalCtrl:ModalController,private service:ClienteService,private servicecliente:ClienteService,public formBuilder:FormBuilder){
      this.registrarForm=this.createFormGroup();
  }
  ngOnInit(): void {
    if (this.cliente) {
      this.edit = true;
      this.registrarForm.patchValue({
        dni: this.cliente.dni,
        nombre: this.cliente.nombre,
        apellido: this.cliente.apellido
      });
    }
  }
  cerrarModal(){
    this.modalCtrl.dismiss(null,'cerrado');
  }
  onSubmit(){
    if(this.edit)
    {
      if (this.cliente) {
        const cliente2 = this.registrarForm.value;
        cliente2.idcliente = this.cliente.idcliente;
        //console.log('Datos antes de enviar:', categoria2);
        this.service.Actualizar(cliente2, cliente2.idcliente).subscribe(
          (response) => {
            // Verifica la respuesta del backend
            console.log('Actualización exitosa', response);
            // Cerrar el modal y enviar la categoría actualizada
            this.modalCtrl.dismiss(response, 'editado');
          },
          (error) => {
            // Manejo de errores
            console.error('Error al actualizar el cliente', error);
          }
        );
      } else {
        console.error('Cliente is undefined');
      }
    }
    else
    {
      const cliente=this.registrarForm.value;
      this.service.Agregar(cliente).subscribe(response=>
      {
        this.modalCtrl.dismiss(response,'creado');
        console.log(response);
      });
    }
  }

}
