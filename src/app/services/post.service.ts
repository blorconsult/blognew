import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Post} from '../models/post.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;


@Injectable()
export class PostService {

    posts: Post[] = [];
    postsSubject = new Subject<Post[]>();

    emitPosts() {
        this.postsSubject.next(this.posts);
      }

    constructor() {
        this.getPosts();
    }
    
    savePosts() {
        firebase.database().ref('/blog').set(this.posts);
    }
    
    getPosts() {
        firebase.database().ref('/blog')
          .on('value', (data: DataSnapshot) => {
              this.posts = data.val() ? data.val() : [];
              this.emitPosts();
            }
        );
    }

    createNewPost(newPost: Post) {
        this.posts.push(newPost);
        this.savePosts();
        this.emitPosts();
      }
    
    getLoveIts (post:Post) {
      console.log (post.postLoveIts);
      return post.postLoveIts;
    }

    getSinglePost(id: number) {
      return new Promise(
        (resolve, reject) => {
          firebase.database().ref('/blog/' + id).once('value').then(
            (data: DataSnapshot) => {
              resolve(data.val());
            }, (error) => {
              reject(error);
            }
          );
        }
      );
    }

    incrementLoveIts (post:Post) {
      console.log(post.postLoveIts);
      post.postLoveIts = post.postLoveIts +1;
      return post.postLoveIts;
    }

    removePost(post: Post) {
        const postIndexToRemove = this.posts.findIndex(
          (postEl) => {
            if(postEl === post) {
              return true;
            }
          }
        );
    
        this.posts.splice(postIndexToRemove, 1);
        this.savePosts();
        this.emitPosts();
    }
}

/* const bookIndexToRemove = this.books.findIndex(
  (bookEl) => {
    if(bookEl === book) {
      return true;
    }
  }
);

this.books.splice(bookIndexToRemove, 1);
this.saveBooks();
this.emitBooks();*/