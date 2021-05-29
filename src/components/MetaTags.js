import React from 'react';
import { Helmet } from 'react-helmet';
import { useMeta } from '../hooks/use-meta';

export function MetaTags({
  description = 'Random scribbling from my everyday work and life.',
  lang = 'en',
  meta = [],
  keywords = ['tech', 'blog'],
  title = 'Notes & Anecdotes',
  imageUrl = 'https://notes.webutvikling.org/images/na.png',
} = {}) {
  const siteMeta = useMeta();
  const metaDescription = description || siteMeta.description;
  const metaTitle = title || siteMeta.title;
  const metaKeywords = keywords?.length ? keywords : siteMeta.keywords;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      titleTemplate={`%s | ${siteMeta.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          name: 'keywords',
          content: metaKeywords.join(', '),
        },
        {
          property: 'og:title',
          content: metaTitle,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:image',
          content: imageUrl,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: siteMeta.author,
        },
        {
          name: 'twitter:title',
          content: metaTitle,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
}
