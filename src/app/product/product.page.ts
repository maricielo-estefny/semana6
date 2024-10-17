import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { ProductoModel } from '../models/producto.model';
import { AlertController, ModalController } from '@ionic/angular';
// import { AgregarproductoPage } from '../agregarproducto/agregarproducto.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  productos:ProductoModel[] | undefined;
  constructor(private service:ProductosService,
  private modalCtrl:ModalController,private router:Router) { }
  ngOnInit() {
    this.service.ObtenerTodos().subscribe(
      response=>{
      this.productos=response;
    });
  }
  Agregar(){
    this.router.navigate(['/agregarproducto']);
  }

}
