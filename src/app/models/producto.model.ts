import { CategoriaModel } from '../models/categoria.model';
export interface ProductoModel {
id_producto?: number;
id_categoria: number;
descripcion: string;
precio:number;
cantidad:number;
categoria: CategoriaModel;
}
