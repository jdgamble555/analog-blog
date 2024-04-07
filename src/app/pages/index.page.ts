import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import { NgFor } from '@angular/common';
import { PostAttributes } from './blog/models';


@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor],
  template: `
  <h1>Rocky Billy's Blog</h1>
    <ul>
      <li *ngFor="let post of posts">
        <a [routerLink]="['blog', post.slug]">{{
          post.attributes.title
        }}</a>
      </li>
    </ul>
  `,
})
export default class BlogComponent {
  readonly posts = injectContentFiles<PostAttributes>();
}