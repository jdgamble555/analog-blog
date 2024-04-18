import { Component} from '@angular/core';
import {
  RouterLink,
  RouterOutlet
} from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouteMeta } from '@analogjs/router';
import { PostAttributes } from '../models';
import { indexResolver, injectSnapResolver } from '../utils';

  
export const routeMeta: RouteMeta = {
  resolve: { data: indexResolver }
};

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor, NgIf, AsyncPipe],
  template: `
  <h1>Rocky Billy's Blog</h1>
    <ul>
      <li *ngFor="let post of posts">
        <a [routerLink]="['blog', post.slug]">{{
          post.title
        }}</a>
      </li>
    </ul>
  `,
})
export default class BlogComponent {
  readonly posts = injectSnapResolver<PostAttributes[]>('data');
}