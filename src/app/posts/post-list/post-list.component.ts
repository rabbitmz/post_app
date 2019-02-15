import { Component, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html'
})
export class PostListComponent {

    panelOpenState:boolean = false; 
    
    /** As the posts are inserted by another component we need to say to angular 
     * that this list is comming from outside this component. 
     * for that  we use the @Input  */
   @Input() posts: Post[] = [];
}