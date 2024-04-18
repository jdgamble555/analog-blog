import { TransferState, inject, makeStateKey } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
import { ResolveFn } from '@angular/router';


export const injectResolver = <T>(name: string) =>
    inject(ActivatedRoute).data.pipe<T>(map(r => r[name]));

export const injectSnapResolver = <T>(name: string) =>
    inject(ActivatedRoute).snapshot.data[name] as T;

export const useAsyncTransferState = async <T>(
    name: string,
    fn: () => T
) => {
    const state = inject(TransferState);
    const key = makeStateKey<T>(name);
    const cache = state.get(key, null);
    if (cache) {
        return cache;
    }
    const data = await fn() as T;
    state.set(key, data);
    return data;
};

function getSlug(filename: string) {
    const parts = filename.match(/^(\\|\/)(.+(\\|\/))*(.+)\.(.+)$/);
    return parts?.length ? parts[4] : '';
}

export const indexResolver: ResolveFn<any> = async () => {

    const data = import.meta.glob('/src/app/pages/blog/*.md', {
        eager: true,
        import: 'default',
        query: { 'analog-content-list': true },
    });

    return Object.keys(data).map((filename) => {
        const attributes = data[filename] as any;
        const slug = attributes['slug'];

        return {
            filename: filename.split('/').pop()?.split('.')[0],
            slug: slug ? encodeURI(slug) : encodeURI(getSlug(filename)),
            title: attributes.title
        };
    });
};