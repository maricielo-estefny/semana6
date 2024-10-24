import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteModel } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = 'http://localhost:8000/api/cliente';
  constructor(private http: HttpClient) {}
  ObtenerTodos() {
    return this.http.get<[ClienteModel]>(this.url);
  }
  Agregar(cliente:ClienteModel){
    return this.http.post(this.url,cliente);
  }
  Actualizar(cliente:ClienteModel,idcliente:number){
    return this.http.put(this.url+'/'+ idcliente,cliente);
  }
  Borrar(idcliente:number){
    return this.http.delete(this.url+'/'+ idcliente);
  }
}
