import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import {Post} from '../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list-item-component',
  templateUrl: './post-list-item-component.component.html',
  styleUrls: ['./post-list-item-component.component.css']
})
export class PostListItemComponentComponent implements OnInit {

  @Input() postTitle: string;
  @Input() postContent: string;
  @Input() postLoveIts: number;
  @Input() postCreatedAt: string;
  @Input() post: Post;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
  }

  onIncrement (index : number) {
    this.postLoveIts = this.postLoveIts +1;
    this.post = new Post('', '');
    
    this.postService.getSinglePost(+index).then(
      (post: Post) => {
        this.post = post;
      }
    );

    this.postService.incrementLoveIts (this.post);
    console.log(this.postLoveIts);
    return this.postLoveIts;

  }

  onDecrement () {
    this.postLoveIts = this.postLoveIts -1;
    console.log(this.postLoveIts);
    return this.postLoveIts;

  }

  onDelete (post: Post) {
    this.postService.removePost(post);
  }

  onDeletePost(post: Post) {
    this.postService.removePost(post);
  }

  getBackgroundColor (post: Post) {
    if (this.postLoveIts > 0) {
      return 'green';
    }
    else {
      return 'red';
    }

  }


}
