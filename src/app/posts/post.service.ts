import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostService {

  private posts: Post [] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPostUpdatedEventListener() {
    return this.postUpdated.asObservable();
  }

  getPosts(postPerPage: number, pageNumber: number) {

    const queryParams = `?pagesize=${postPerPage}&page=${pageNumber}`;

    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts'+ queryParams)
    .pipe(map((postData) => {
        return postData.posts.map(pop => {
          return {
            title: pop.title,
            content: pop.content,
            imagePath:  pop.imagePath,
            id: pop._id
          };
        });
    }))
    .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postUpdated.next([...this.posts]);
    });
  }

  addPost(title: string, content: string, image: File) {
   
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);

    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
    .subscribe(responseData => {
      const post: Post = {id: responseData.post.id, title: title, content: content, imagePath: null}
      post.id = responseData.post.id;
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
  }

  deletePost(id: string) {
    this.http.delete('http://localhost:3000/api/posts/' + id).subscribe(() => {
        const updatedPosts = this.posts.filter(post =>  post.id !== id );
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
    });
  }

  getPost(id: string) {
   return this.http.get<{_id: string, title: string, content: string, imagePath: string}>('http://localhost:3000/api/posts/' + id);
  }

  updatePost(id: string, title: string, content: string, image: File | string) {    
    let postData: Post | FormData;
    if(typeof(image) === 'object'){
       postData = new FormData();
       postData.append("id", id);
       postData.append("title", title);      
      postData.append("content", content);
      postData.append("image", image, title);
    }
    else{
       postData = {id: id, title: title, content: content, imagePath: image};
    }

    this.http.put<{message: string}>('http://localhost:3000/api/posts/' + id, postData).subscribe(
      (result) => {
        const updatedPost = [...this.posts];
        const post: Post = {id: id, title: title, content: content, imagePath: null};
        const oldPostIndex = updatedPost.findIndex(p => p.id === post.id);      
        updatedPost[oldPostIndex] = post;
        this.posts = updatedPost;
        this.postUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
    });
  }

}
