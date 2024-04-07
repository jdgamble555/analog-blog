import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouteMeta } from '@analogjs/router';
import { indexResolver } from './index.resolver';
import { map } from 'rxjs';


export const routeMeta: RouteMeta = {
  resolve: { data: indexResolver }
};

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor, AsyncPipe],
  template: `
  <h1>Rocky Billy's Blog</h1>
    <ul>
      <li *ngFor="let post of posts | async">
        <a [routerLink]="['blog', post.filename]">{{
          post.attributes.title
        }}</a>
      </li>
    </ul>
  `,
})
export default class BlogComponent {
  private route = inject(ActivatedRoute);
  readonly posts = this.route.data.pipe(map((data: any) => data.data));
}