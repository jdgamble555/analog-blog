import { ResolveFn } from '@angular/router';

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
      attributes,
      slug: slug ? encodeURI(slug) : encodeURI(getSlug(filename)),
    };
  });
};
