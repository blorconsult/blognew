import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthGuardService} from './services/auth-guard.service';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PostListItemComponentComponent } from './post-list-item-component/post-list-item-component.component';
import { PostListComponentComponent } from './post-list-component/post-list-component.component';
import { AppareilService } from './services/appareil.service';
import { PostService} from './services/post.service';
import { NewpostComponent } from './newpost/newpost.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import * as firebase from 'firebase';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
	{ path: 'auth/signin', component: SigninComponent },
  { path: 'postslist', canActivate: [AuthGuardService], component: PostListComponentComponent },
  { path: 'postscreate', canActivate: [AuthGuardService], component: NewpostComponent },
  { path: '', redirectTo: 'postslist', pathMatch: 'full' },
	{ path: '**', redirectTo: 'postslist' }
  ];

@NgModule({
  declarations: [
    AppComponent,
    PostListItemComponentComponent,
    PostListComponentComponent,
    NewpostComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AppareilService,PostService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
