import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderbyPipe } from 'src/app/pipes/orderby.pipe';

@NgModule({
  declarations: [OrderbyPipe],
  imports: [CommonModule],
  exports: [OrderbyPipe],
})
export class ApplicationpipesModule {}
