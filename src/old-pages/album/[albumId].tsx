import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAlbums, getPhotos } from '../../lib/data';
import { Album, Photo } from '../../lib/types';

interface AlbumPageProps {
  album: Album;
  photos: Photo[];
}

const AlbumPage: React.FC<AlbumPageProps> = ({ album, photos }) => (
  <div>
    <h1>{album.title}</h1>
    <ul className="photos">
      {photos.map((photo) => (
        <li key={photo.id}>
          <Link href={`/album/${album.id}/photo/${photo.id}`}>
            <Image
              src={photo.thumbnailUrl}
              alt={photo.title}
              width={150}
              height={150}
            />
            {photo.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const albums = await getAlbums();
  const paths = albums.map((album) => ({
    params: { albumId: album.id.toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const albumId = params?.albumId as string;
  const album = (await getAlbums()).find((a) => a.id.toString() === albumId);
  const photos = await getPhotos(Number(albumId));

  if (!album) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      album,
      photos,
    },
  };
};

export default AlbumPage;
