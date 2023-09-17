import { default as NextHead } from 'next/head';
import { env } from '@/env/client.mjs';

type HeadProps = {
  title?: string;
  description?: string;
  imageUrl?: string;
};

/**
 * Smart head component for the page to update meta tags.
 * @param title title of the page
 * @param description description of the page
 * @param imageUrl page cover image
 */
export default function Head({
  title = 'Ukrainian validator – Перевір ставлення людини до війни в Україні',
  description,
  imageUrl = `${env.NEXT_PUBLIC_STATIC_IMAGE_BUCKET_URL}/og.jpeg`,
}: HeadProps) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='icon' href='/favicon.ico' />

      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://uavalidator.com/' />
      <meta property='og:image' content={imageUrl} />
      <meta property='og:locale' content='uk_UA' />
      <meta property='og:site_name' content='Ukrainian validator' />
      <meta property='og:determiner' content='the' />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={imageUrl} />
      <meta name='twitter:site' content='https://uavalidator.com/#' />
    </NextHead>
  );
}
