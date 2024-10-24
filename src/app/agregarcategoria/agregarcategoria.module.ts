import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarcategoriaPageRoutingModule } from './agregarcategoria-routing.module';

import { AgregarcategoriaPage } from './agregarcategoria.page';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarcategoriaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarcategoriaPage]
})
export class AgregarcategoriaPageModule {}
