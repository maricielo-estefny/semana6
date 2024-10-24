import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { ProductoModel } from '../models/producto.model';
import { AlertController, ModalController } from '@ionic/angular';
 import { AgregarproductoPage } from '../agregarproducto/agregarproducto.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  productos:ProductoModel[] | undefined;
  constructor(private service:ProductosService,
  private modalCtrl:ModalController,private router:Router,private alertCtrl:AlertController) { }
  ngOnInit() {
    this.service.ObtenerTodos().subscribe(
      response=>{
      this.productos=response;
    });
  }
  Agregar(){

    this.modalCtrl.create({
      component:AgregarproductoPage
    }).then(modal=>{
      modal.present();
      return modal.onDidDismiss();
    })
    .then(({data,role})=>{
      if(role==='creado'){
        this.service.ObtenerTodos().subscribe(
        response=>{
           this.productos=response;
           console.log(this.productos);
        });
      }
    });

  }

  // editar(producto:ProductoModel){ this.modalCtrl.create({
  //   component:AgregarproductoPage, componentProps:{ producto }
  //   })
  //   .then(modal=>{ modal.present();
  //   return modal.onDidDismiss();
  //   })
  //   .then(({data,role})=>{ this.productos=this.productos?.filter(std=>{
  //       if(data.id===std.idproducto){
  //          console.log(data);
  //          return data;
  //       }
  //       return std;
  //       })
  //       });

  // }
  // editar(producto: ProductoModel) {
  //   this.modalCtrl.create({
  //     component: AgregarproductoPage,
  //     componentProps: { producto }
  //   })
  //   .then(modal => {
  //     modal.present();
  //     return modal.onDidDismiss();
  //   })
  //   .then(({ data, role }) => {
  //     if (role === 'editado') {
  //       // Puedes volver a obtener todos los productos, o
  //       // hacer una lógica específica si el producto se ha editado.
  //       this.service.ObtenerTodos().subscribe(response => {
  //         this.productos = response;
  //         console.log(this.productos);
  //       });
  //     }
  //   });
  // }

   // Función para editar un producto
  // async Editar(producto: ProductoModel) {
  //   const modal = await this.modalCtrl.create({
  //     component: AgregarproductoPage,
  //     componentProps: {
  //       producto: producto,  // Pasamos el producto que se va a editar al modal
  //       edit: true
  //     }
  //   });

  //   await modal.present();

  //   const { data, role } = await modal.onWillDismiss();
  //   if (role === 'creado') {
  //     this.service.ObtenerTodos().subscribe(
  //       response=>{
  //       this.productos=response;
  //     });
  //     // this.mostrarAlerta('Producto actualizado', 'El producto ha sido actualizado correctamente.');
  //   }
  // }
  // async Editar(producto: ProductoModel) {
  //   const modal = await this.modalCtrl.create({
  //     component: AgregarproductoPage,
  //     componentProps: { producto }
  //   });
  //   modal.onDidDismiss().then((data) => {
  //     if (data.role === 'actualizado') {
  //       this.ngOnInit(); // Refresh the list
  //     }
  //   });
  //   return await modal.present();
  // }
  editar2(producto:ProductoModel){ this.modalCtrl.create({
    component:AgregarproductoPage, componentProps:{ producto }
    })
    .then(modal=>{ modal.present();
    return modal.onDidDismiss();
    })
    .then(({data,role})=>{ this.productos=this.productos?.filter(std=>{
        if(data.id===std.idproducto){ console.log(data);
        return data;
        }
        return std;
      })
    });
  }
  eliminar(idproducto:number){
    this.alertCtrl.create({
      header:'Eliminar',
      message:'¿Está seguro de eliminar?'+idproducto,
      buttons:[{
          text:'Si',
          handler:()=>{
            this.service.Borrar(idproducto).subscribe(()=>{
              this.productos=this.productos!.filter(std=>std.idproducto !== idproducto);
            });
          }
        },
        {
          text:'NO'
        }]
    }).then(alert=>alert.present());
  }



}


