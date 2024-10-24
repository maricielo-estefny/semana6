import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { ClienteModel } from '../models/cliente.model';
import { AlertController, ModalController } from '@ionic/angular';
 import { AgregarclientePage } from '../agregarcliente/agregarcliente.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  clientes:ClienteModel[] | undefined;
  constructor(private service:ClienteService,
  private modalCtrl:ModalController,private router:Router,private alertCtrl:AlertController) { }
  ngOnInit() {
    this.service.ObtenerTodos().subscribe(
      response=>{
      this.clientes=response;
    });
  }
  Agregar(){

    this.modalCtrl.create({
      component:AgregarclientePage
    }).then(modal=>{
      modal.present();
      return modal.onDidDismiss();
    })
    .then(({data,role})=>{
      if(role==='creado'){
        this.service.ObtenerTodos().subscribe(
        response=>{
           this.clientes=response;
           console.log(this.clientes);
        });
      }
    });

  }
  // async Editar(cliente: ClienteModel) {
  //   const modal = await this.modalCtrl.create({
  //     component: AgregarclientePage,
  //     componentProps: { cliente }
  //   });
  //   modal.onDidDismiss().then((data) => {
  //     if (data.role === 'actualizado') {
  //       this.ngOnInit(); // Refresh the list
  //     }
  //   });
  //   return await modal.present();
  // }
  editar2(cliente:ClienteModel){ this.modalCtrl.create({
    component:AgregarclientePage, componentProps:{ cliente }
    })
    .then(modal=>{ modal.present();
    return modal.onDidDismiss();
    })
    .then(({data,role})=>{ this.clientes=this.clientes?.filter(std=>{
        if(data.id===std.idcliente){ console.log(data);
        return data;
        }
        return std;
      })
    });
  }
  eliminar(idcliente:number){
    this.alertCtrl.create({
      header:'Eliminar',
      message:'¿Está seguro de eliminar?'+idcliente,
      buttons:[{
          text:'Si',
          handler:()=>{
            this.service.Borrar(idcliente).subscribe(()=>{
              this.clientes=this.clientes!.filter(std=>std.idcliente !== idcliente);
            });
          }
        },
        {
          text:'NO'
        }]
    }).then(alert=>alert.present());
  }

}
