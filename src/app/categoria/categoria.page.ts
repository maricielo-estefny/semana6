import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { CategoriaModel } from '../models/categoria.model';
import { AlertController, ModalController } from '@ionic/angular';
 import { AgregarcategoriaPage } from '../agregarcategoria/agregarcategoria.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  categorias:CategoriaModel[] | undefined;
  constructor(private service:CategoriaService,
  private modalCtrl:ModalController,private router:Router,private alertCtrl:AlertController) { }
  ngOnInit() {
    this.service.ObtenerTodos().subscribe(
      response=>{
      this.categorias=response;
    });
  }
  Agregar(){

    this.modalCtrl.create({
      component:AgregarcategoriaPage
    }).then(modal=>{
      modal.present();
      return modal.onDidDismiss();
    })
    .then(({data,role})=>{
      if(role==='creado'){
        this.service.ObtenerTodos().subscribe(
        response=>{
           this.categorias=response;
           console.log(this.categorias);
        });
      }
    });

  }
  // async Editar(categoria: CategoriaModel) {
  //   const modal = await this.modalCtrl.create({
  //     component: AgregarcategoriaPage,
  //     componentProps: { categoria }
  //   });
  //   modal.onDidDismiss().then((data) => {
  //     if (data.role === 'actualizado') {
  //       this.ngOnInit(); // Refresh the list
  //     }
  //   });
  //   return await modal.present();
  // }
  editar2(categoria:CategoriaModel){ this.modalCtrl.create({
    component:AgregarcategoriaPage, componentProps:{ categoria }
    })
    .then(modal=>{ modal.present();
    return modal.onDidDismiss();
    })
    .then(({data,role})=>{ this.categorias=this.categorias?.filter(std=>{
        if(data.id===std.idcategoria){ console.log(data);
        return data;
        }
        return std;
      })
    });
  }
  eliminar(idcategoria:number){
    this.alertCtrl.create({
      header:'Eliminar',
      message:'¿Está seguro de eliminar?'+idcategoria,
      buttons:[{
          text:'Si',
          handler:()=>{
            this.service.Borrar(idcategoria).subscribe(()=>{
              this.categorias=this.categorias!.filter(std=>std.idcategoria !== idcategoria);
            });
          }
        },
        {
          text:'NO'
        }]
    }).then(alert=>alert.present());
  }

}
