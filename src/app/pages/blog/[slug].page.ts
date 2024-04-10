import { ContentFile, injectContent, MarkdownComponent } from '@analogjs/content';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PostAttributes } from './models';
import { ActivatedRoute, ResolveFn, Router } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { firstValueFrom, map, skip, switchMap, tap } from 'rxjs';

type ContentResolver = ContentFile<PostAttributes | Record<string, never>>;

export const contentResolver: ResolveFn<ContentResolver> = async (route) => {
    const data = await firstValueFrom(
        injectContent<PostAttributes>({
            customFilename: route.params['slug']
        })
    );
    console.log(data);
    return data;
}

export const routeMeta: RouteMeta = {
    resolve: { data: contentResolver }
};


@Component({
    standalone: true,
    imports: [MarkdownComponent, AsyncPipe, NgIf],
    template: `
    <ng-container *ngIf="post$ as post">
      <analog-markdown [content]="post.content" />
    </ng-container>
  `,
})
export default class BlogPostComponent {
    private route = inject(ActivatedRoute);
    readonly post$ = this.route.snapshot.data['data'];
}