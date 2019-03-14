import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuario-login',
    pathMatch: 'full'
  },
  { path: 'usuario-login', loadChildren: './pages/usuario-login/usuario-login.module#UsuarioLoginPageModule' },
  { path: 'sistemas', loadChildren: './pages/sistemas/sistemas.module#SistemasPageModule' },
  { path: 'sistema-fichas', loadChildren: './pages/sistema-fichas/sistema-fichas.module#SistemaFichasPageModule' },
  { path: 'ficha', loadChildren: './pages/ficha/ficha.module#FichaPageModule' },
  { path: 'ficha-detalhar', loadChildren: './pages/ficha-detalhar/ficha-detalhar.module#FichaDetalharPageModule' },
  // {
  //   path: 'home',
  //   loadChildren: './home/home.module#HomePageModule'
  // },
  // {
  //   path: 'list',
  //   loadChildren: './list/list.module#ListPageModule'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
