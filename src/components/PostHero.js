import React from 'react';
import { Image, ImageCredit } from './Image';
import { PostTags } from './PostTag';
import { PostHeader } from './PostHeader';
import { Navigation } from './Navigation';
import { Header } from './Header';

const PostHero = ({ eImage, image, imageAlt, title, date, tags }) => {
  const img = image || eImage;
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      {img && <Image fluid={img.childImageSharp.fluid} alt={imageAlt} />}
      <ImageCredit>{imageAlt}</ImageCredit>
      <PostHeader>{title}</PostHeader>
      <small>{date}</small>
      <PostTags tags={tags} inline useLink />
    </>
  );
};

export default PostHero;
