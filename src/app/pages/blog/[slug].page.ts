import { injectContent, MarkdownComponent } from '@analogjs/content';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostAttributes } from './models';
import { postMetaResolver, postTitleResolver } from './resolvers';
import { RouteMeta } from '@analogjs/router';

export const routeMeta: RouteMeta = {
  title: postTitleResolver,
  meta: postMetaResolver
};

@Component({
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, NgIf, RouterLink],
  template: `
    <article *ngIf="post$ | async as post">
      <h1>{{ post.attributes.title }}</h1>
      <span>
        Published Date:
      </span>
      {{ post.attributes.publishedAt }}
      <analog-markdown [content]="post.content" />
    </article>
    <a routerLink="/">Back Home</a>
  `,
})
export default class BlogPostComponent {
  readonly post$ = injectContent<PostAttributes>();
}