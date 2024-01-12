import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaAgravosComponent } from './lista-agravos/lista-agravos.component';
import { HanseniaseComponent } from './agravos/hanseniase/hanseniase.component';

import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { Dengue2Component } from './agravos/dengue2/dengue2.component';

import { ReactiveFormsModule } from '@angular/forms';
import { TuberculoseComponent } from './agravos/tuberculose/tuberculose.component';
import { SifilisGestanteComponent } from './agravos/sifilis-gestante/sifilis-gestante.component';
import { HivGestanteComponent } from './agravos/hiv-gestante/hiv-gestante.component';
import { FebreAmarelaComponent } from './agravos/febre-amarela/febre-amarela.component';
import { SifilisCongenitaComponent } from './agravos/sifilis-congenita/sifilis-congenita.component';
import { NotificacaoComponent } from './agravos/notificacao/notificacao.component';
import { AidsCriancaComponent } from './agravos/aids-crianca/aids-crianca.component';
import { RaivaHumanaComponent } from './agravos/raiva-humana/raiva-humana.component';
import { ViolenciaInterpessoalComponent } from './agravos/violencia-interpessoal/violencia-interpessoal.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaAgravosComponent,
    HanseniaseComponent,
    Dengue2Component,
    TuberculoseComponent,
    SifilisGestanteComponent,
    HivGestanteComponent,
    FebreAmarelaComponent,
    SifilisCongenitaComponent,
    NotificacaoComponent,
    AidsCriancaComponent,
    RaivaHumanaComponent,
    ViolenciaInterpessoalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
