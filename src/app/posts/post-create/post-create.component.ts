import { PostService } from './../post.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    private mode= 'create';
    private postId: string;
    editablePost: Post;
    isLoading = false; 
    form: FormGroup;
    imagePreview: string;

    // output means we can listen to this event in the parent component
    // @Output() postCreated = new EventEmitter<Post>();

    constructor(public postService: PostService, public route: ActivatedRoute) { }

    ngOnInit(): void {

      this.form = new FormGroup({
        title: new FormControl(
          null,
          {
            validators: [Validators.required, Validators.minLength(3)] 
          }
        ),
        content: new FormControl(
          null, 
          {
            validators: [Validators.required]
          }
        ),
        image: new FormControl(
          null, 
          {
            validators : [Validators.required],
            asyncValidators: [mimeType]
          }
        )
      });

      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if(paramMap.has('id')) {          
          this.mode = 'edit';
          this.postId = paramMap.get('id');
          this.isLoading = true;

          this.postService.getPost(this.postId).subscribe((postData) => {
            this.isLoading = false;
            this.editablePost = {id: postData._id, title: postData.title, content: postData.content, imagePath: postData.imagePath}
            this.form.setValue({
              title: this.editablePost.title,
              content: this.editablePost.content,
              image: this.editablePost.imagePath
            });
          });
          
        }
        else {
          this.mode = 'create';
          this.postId = null;
        }
      });
    }

  onAddPost() {

   /** const post: Post = {
      title: form.value.title,
      content: form.value.content
    };
    */
    // this.postCreated.emit(post);
    this.isLoading = true;
    if(this.mode === 'create'){
      this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    }
    else {
      if(this.mode == 'edit') {
        this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
      }
    }
    
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
