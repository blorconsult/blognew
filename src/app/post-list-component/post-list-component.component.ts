import { Component, OnDestroy, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/post.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-list-component',
  templateUrl: './post-list-component.component.html',
  styleUrls: ['./post-list-component.component.scss']
})
export class PostListComponentComponent implements OnInit, OnDestroy  {

  posts: Post[];
  postsSubscription: Subscription;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.postsSubscription = this.postService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postService.emitPosts();
  }

  
  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

  


}
