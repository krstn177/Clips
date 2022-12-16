import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AboutComponent } from './about/about.component';
import { ClipComponent } from './clip/clip.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ClipService } from './services/clip.service';
import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/compat/auth-guard'

const redirectLoggedInToHome = () => redirectLoggedInTo('/');

const routes: Routes = [
  {
  path: '',
  component: HomeComponent
  }, 
  {
  path: 'about',
  component: AboutComponent
  },
  {
    path: 'clip/:id',
    component: ClipComponent,
    resolve: {
      clip: ClipService
    }
  },
  {
    path: '',
    loadChildren: async () => (await import('./video/video.module')).VideoModule

  },
  {
    path: 'login',
    component: LoginComponent,
    data:{
      authGuardPipe: redirectLoggedInToHome
    },
    canActivate: [AngularFireAuthGuard] 
  },
  {
    path: 'register',
    component: RegisterComponent,
    data:{
      authGuardPipe: redirectLoggedInToHome
    },
    canActivate: [AngularFireAuthGuard] 
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
