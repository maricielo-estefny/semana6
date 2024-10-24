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


  // categorias:CategoriaModel[] | undefined;
  categorias:CategoriaModel[]=[];
  categoriasFiltradas: CategoriaModel[] = []; // Almacenar las categorías filtradas
  searchTerm: string = '';
  constructor(private service:CategoriaService,
  private modalCtrl:ModalController,private router:Router,private alertCtrl:AlertController) { }



  ngOnInit() {
    // this.service.ObtenerTodos().subscribe(
    //   response=>{
    //   this.categorias=response;
    //   this.categoriasFiltradas = [...this.categorias];
    // });
    this.service.ObtenerTodos().subscribe((response) => {
      this.categorias = response;
      this.categoriasFiltradas = [...this.categorias];
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
  // Método para buscar una categoría por descripción
  buscarCategoria() {
    if (this.searchTerm.trim() === '') {
      console.log('HOLA')
      // Si el campo de búsqueda está vacío, mostrar todas las categorías
      this.categoriasFiltradas = [...this.categorias];
    } else {
      console.log('HOLA2')
      // Filtrar las categorías por la descripción ingresada
      console.log('datos antigios', this.categoriasFiltradas)
      this.categoriasFiltradas = this.categorias.filter((categoria) =>
        categoria.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      console.log('datos filtrados', this.categoriasFiltradas)
    }
  }
}
