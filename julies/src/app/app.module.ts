import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DBRepository } from './db/DB.repository';
import PouchDBRepository from './db/PouchDB.repository';
import { ApplicationpipesModule } from './modules/applicationpipes/applicationpipes.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ApplicationpipesModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: DBRepository, useClass: PouchDBRepository },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
