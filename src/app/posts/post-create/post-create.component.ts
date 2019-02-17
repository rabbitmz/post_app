import { PostService } from './../post.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { CDK_DESCRIBEDBY_HOST_ATTRIBUTE } from '@angular/cdk/a11y';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

    // output means we can listen to this event in the parent component
    // @Output() postCreated = new EventEmitter<Post>();

    constructor(public postService: PostService) { }

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
