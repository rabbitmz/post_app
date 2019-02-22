import { PostService } from './../post.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html', 
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  isLoading = false;
  panelOpenState = false;

  /** As the posts are inserted by another component we need to say to angular
     * that this list is comming from outside this component.
     * for that  we use the @Input  */
   posts: Post[] = [];
   private postSubs: Subscription;

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts();
    this.postSubs =  this.postService.getPostUpdatedEventListener()
    .subscribe((posts: Post[]) => { 
      this.isLoading = false;
      this.posts = posts; });
  }

  ngOnDestroy(): void {
    this.postSubs.unsubscribe();
  }

  onDelete(id: string) {
    this.postService.deletePost(id);
  }
}
