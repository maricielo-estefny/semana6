import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {ProductoModel } from '../models/producto.model';
@Injectable({
providedIn: 'root'
})
export class ProductosService {
  private url='http://localhost:8000/api/listadoPro';
  constructor(private http:HttpClient ) { }
  ObtenerTodos(){
  return this.http.get<[ProductoModel]>(this.url);
  }
  Agregar(producto:ProductoModel){
    return this.http.post(this.url,producto);
  }

}



