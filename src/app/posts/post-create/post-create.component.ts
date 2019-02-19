import { PostService } from './../post.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { CDK_DESCRIBEDBY_HOST_ATTRIBUTE } from '@angular/cdk/a11y';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {


    // output means we can listen to this event in the parent component
    // @Output() postCreated = new EventEmitter<Post>();

    constructor(public postService: PostService, public route: ActivatedRoute) { }

    ngOnInit(): void {

    }

  onAddPost(form: NgForm) {

   /** const post: Post = {
      title: form.value.title,
      content: form.value.content
    };
    */
    // this.postCreated.emit(post);

    this.postService.addPost(form.value.title, form.value.content);
    form.reset();
  }
}
