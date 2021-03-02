import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Post} from "./Posts";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  // GET URL TO MONGODB FROM ENVIRONMENT
  private BASE_URL = environment.API_URL;

  // INJECT HTTPCLIENT
  constructor(private http: HttpClient) { }

  // GET ENDPOINT
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}/posts`);
  }

  //POST ENDPOINT
  createPost(title: string, body: string, author: string): Observable<Post> {
    return this.http.post<Post>(`${this.BASE_URL}/posts`,
    {  title, body, author });
  }

  // DELETE ENDPOINT
  // WE WON'T USE THIS OBSERVABLE FOR ANYTHING
  // SO WE DON'T NEED TO TYPE IT
  deletePost(id: string): Observable<any> {
    // SAME URL AS ABOVE APPENDED WITH THE ID
    // FOR THE POST WE WANT TO DELETE
    return this.http.delete(`${this.BASE_URL}/posts/${id}`);
  }
}
