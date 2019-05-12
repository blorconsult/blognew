import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Post} from '../models/post.model';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {

  postForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, 
              private postsService: PostService,
              private router: Router) { }
    
  ngOnInit() {
    this.initForm();
  }

  initForm() {
  this.postForm = this.formBuilder.group({
  postTitle: ['', Validators.required],
  postContent: ['', Validators.required]
  
  });
}

  onSaveBlog() {

    const postTitle = this.postForm.get('postTitle').value;
    const postContent = this.postForm.get('postContent').value;

    const postLoveIts = 1;
    const newPost = new Post(postTitle, postContent);
    
    newPost.postLoveIts = postLoveIts;
    
    this.postsService.createNewPost(newPost);
    this.router.navigate(['/posts']);
}

}
