import { AuthService } from './../../auth/signup/auth.service';
import { PostService } from './../post.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  private authStatusListener: Subscription;
  public isAuthenticated;

  isLoading = false;
  panelOpenState = false;
  totalPosts = 0;
  postPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];
  currentPageNumber = 1;

  /** As the posts are inserted by another component we need to say to angular
     * that this list is comming from outside this component.
     * for that  we use the @Input  */
   posts: Post[] = [];
   private postSubs: Subscription;

  constructor(public postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts(this.postPerPage, this.currentPageNumber);
    this.postSubs =  this.postService.getPostUpdatedEventListener()
    .subscribe((postData: {posts: Post[], postCount: number }) => {
      this.isLoading = false;
      this.posts = postData.posts;
      this.totalPosts = postData.postCount;
    });
    this.authStatusListener = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      console.log(isAuthenticated);
    });
    this.isAuthenticated = this.authService.getIsAuth();
  }

  ngOnDestroy(): void {
    this.postSubs.unsubscribe();
  }

  onDelete(id: string) {
    this.isLoading = true;
    this.postService.deletePost(id).subscribe(() => {
      this.postService.getPosts(this.postPerPage, this.currentPageNumber);
    });
  }

  onPageChanged(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPageNumber = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postService.getPosts(this.postPerPage, this.currentPageNumber);
  }
}

