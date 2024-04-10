import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  ResolveFn,
  RouterLink,
  RouterOutlet
} from '@angular/router';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouteMeta } from '@analogjs/router';
import { map } from 'rxjs';
import { ContentFile, injectContentFiles } from '@analogjs/content';
import { PostAttributes } from './blog/models';

type ContentsResolver = ContentFile<PostAttributes>[];

export const contentsResolver: ResolveFn<ContentsResolver> = () => {
  const files = injectContentFiles<PostAttributes>((contentFile) =>
    contentFile.filename.includes('/src/content/')
  );
  //console.log(files);
  return files;
}
  

export const routeMeta: RouteMeta = {
  resolve: { data: contentsResolver }
};

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor, AsyncPipe],
  template: `
  <h1>Rocky Billy's Blog</h1>
    <ul>
      <li *ngFor="let post of posts | async">
        <a [routerLink]="['blog', post.slug]">{{
          post.attributes.title
        }}</a>
      </li>
    </ul>
  `,
})
export default class BlogComponent {
  private route = inject(ActivatedRoute);
  readonly posts = this.route.data.pipe<ContentsResolver>(
    map((data) => data['data'])
  );
}