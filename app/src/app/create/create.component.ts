import { Post } from './../Posts';
import { PostsService } from './../posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public successMsg: string;
  public errorMsg: string;
  public title: string;
  public body: string;
  public author: string;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
  }

  createPost() {
    // RESET SUCCESS/ERROR MESSAGES
    this.successMsg = "";
    this.errorMsg = "";
    this.postsService.createPost(this.title, this.body, this.author)
      .subscribe((createdPost: Post) => {

        // RESET VALUES
        this.title = "";
        this.body = "";
        this.author = "";
        this.successMsg = "Post created";
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      })
  }

}
