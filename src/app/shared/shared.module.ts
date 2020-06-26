import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination'

import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [

  ],
  exports: [

    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  
  
  ]
})
export class SharedModule { }
