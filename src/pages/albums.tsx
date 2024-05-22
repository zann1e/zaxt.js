import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAlbums, getPhotos } from '../lib/data';
import { Album, Photo } from '../lib/types';

interface AlbumsPageProps {
  albums: Album[];
  albumThumbnails: { [key: number]: string };
}

const AlbumsPage: React.FC<AlbumsPageProps> = ({ albums, albumThumbnails }) => (
  <div>
    <h1>Albums Page</h1>
    <ul className="albums">
      {albums.map((album) => (
        <li key={album.id}>
          <Link href={`/album/${album.id}`}>
            <Image
              src={albumThumbnails[album.id]}
              alt={album.title}
              width={150}
              height={150}
            />
            {album.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const getStaticProps: GetStaticProps = async () => {
  const albums = await getAlbums();
  const albumThumbnails: { [key: number]: string } = {};

  for (const album of albums) {
    const photos = await getPhotos(album.id);
    if (photos.length > 0) {
      albumThumbnails[album.id] = photos[0].thumbnailUrl;
    }
  }

  return {
    props: {
      albums,
      albumThumbnails,
    },
  };
};

export default AlbumsPage;
