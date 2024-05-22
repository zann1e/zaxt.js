import { GetStaticProps } from 'next';
import { getAlbums } from '../lib/data';
import { Album } from '../lib/types';
import Link from 'next/link';

interface AlbumsPageProps {
  albums: Album[];
}

const AlbumsPage: React.FC<AlbumsPageProps> = ({ albums }) => (
  <div>
    <h1>Albums Page</h1>
    <ul className="albums">
      {albums.map((album) => (
        <li key={album.id}>
          <Link href={`/album/${album?.id}`}>{album?.title}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export const getStaticProps: GetStaticProps = async () => {
  const albums = await getAlbums();
  return {
    props: {
      albums,
    },
  };
};

export default AlbumsPage;
