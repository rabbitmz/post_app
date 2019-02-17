import { Component } from '@angular/core';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  storedPosts: Post[] = [];

  /*as the app component is the parent of the post create component,
  we can only listen to the postCreateComponent#postCreated event inside the app component class
  as a result, we add a the following method
  */

  onPostAdded(post) {
    this.storedPosts.push(post);
  }
}
