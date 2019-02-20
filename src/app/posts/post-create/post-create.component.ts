import { PostService } from './../post.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    private mode= 'create';
    private postId: string;
    editablePost: Post;

    // output means we can listen to this event in the parent component
    // @Output() postCreated = new EventEmitter<Post>();

    constructor(public postService: PostService, public route: ActivatedRoute) { }

    ngOnInit(): void {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if(paramMap.has('id')) {          
          this.mode = 'edit';
          this.postId = paramMap.get('id');
          this.postService.getPost(this.postId).subscribe((postData) => {
            this.editablePost = {id: postData._id, title: postData.title, content: postData.content}
          });
          
        }
        else {
          this.mode = 'create';
          this.postId = null;
        }
      });
    }

  onAddPost(form: NgForm) {

   /** const post: Post = {
      title: form.value.title,
      content: form.value.content
    };
    */
    // this.postCreated.emit(post);

    if(this.mode === 'create'){
      this.postService.addPost(form.value.title, form.value.content);
    }
    else {
      if(this.mode == 'edit') {
        this.postService.updatePost(this.postId, form.value.title, form.value.content);
      }
    }
    
    form.resetForm();
  }
}
