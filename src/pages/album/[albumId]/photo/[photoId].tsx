import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { getAlbums, getPhoto } from '../../../../lib/data';
import { Photo, Album } from '../../../../lib/types';

interface PhotoPageProps {
  photo: Photo;
  album: Album;
}

const PhotoPage: React.FC<PhotoPageProps> = ({ photo, album }) => (
  <div>
    <Head>
      <title>{photo.title}</title>
      <meta
        name="description"
        content={`View the photo titled "${photo.title}" from the album ${album.title}.`}
      />
    </Head>
    <h1>{photo.title}</h1>
    <p>
      Back to{' '}
      <strong>
        <Link href={`/album/${album.id}`}>{album.title}</Link>
      </strong>
    </p>
    <Image
      src={photo.url}
      alt={photo.title}
      width={600}
      height={400}
      className="photo"
    />
  </div>
);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const photoId = params?.photoId as string;
  const albumId = params?.albumId as string;
  const photo = await getPhoto(Number(photoId));
  const album = (await getAlbums()).find((a) => a.id.toString() === albumId);

  if (!photo || !album) {
    return {
      notFound: true,
    };
  }

  if (photo.albumId != Number(albumId)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      photo,
      album,
    },
  };
};

export default PhotoPage;
