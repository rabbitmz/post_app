import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
    .pipe(map((postData) => {
        return postData.posts.map(pop => {
          return {
            title: pop.title,
            content: pop.content,
            id: pop.id
          };
        });
    }))
    .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postUpdated.next([...this.posts]);
    });
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
    .subscribe(responseData => {
      console.log(responseData.message);
      post.id = responseData.postId;
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });
  }

  deletePost(id: string) {
    this.http.delete('http://localhost:3000/api/posts/' + id).subscribe(() => {
        const updatedPosts = this.posts.filter(post =>  post.id !== id );
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
    });
  }

}
