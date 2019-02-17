import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class PostService {

  private posts: Post [] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPostUpdatedEventListener() {
    return this.postUpdated.asObservable();
  }

  getPosts() {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData) => {
        this.posts = postData.posts;
        this.postUpdated.next([...this.posts]);
    });
  }

  addPost(title: string, content: string) {
       const post: Post = {id: null, title: title, content: content};

    this.posts.push(post);

    this.postUpdated.next([...this.posts]);

  }

}