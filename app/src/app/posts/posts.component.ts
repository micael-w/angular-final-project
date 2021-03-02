import { PostsService } from './../posts.service';
import { Post } from './../Posts';
import { Component, OnInit } from '@angular/core';
import { mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  // FOR LOADING ANIMATION
  public loading = true;
  // SUCCESS AND ERROR MESSAGES
  public successMsg: string;
  public errorMsg: string;
  // VARIABLE TO HOLD ALL POSTS
  public posts: Post[];

  // POPULATE PAGE WITH POSTS FROM DB
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts()
    // SUBSCRIBE TO THIS WHICH WILL
    // RETURN OUR ARRAY WITH POSTS
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.loading = false;

      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      });
  }

  deletePost(id: string) {
    this.postsService.deletePost(id)
      .pipe(
        // WE NEED mergeMap BECAUSE WE DON'T
        // WANT TO SUBSCRIBE TO THE RETURN
        // FROM THE deletePost OBSERVABLE
        // WE WANT TO SUBSCRIBE TO getPosts
        // TO RELOAD THE REMAINING POSTS
        mergeMap(() => this.postsService.getPosts()))
        .subscribe((posts: Post[]) => {
          this.posts = posts;
          this.successMsg = "Post deleted"
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        })
  }

}
