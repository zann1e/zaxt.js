import Link from 'next/link';
import Image from 'next/image';
import { getAlbums, getPhotos } from '../../lib/data';

export default async function AlbumsPage() {
  const albums = await getAlbums();
  const albumThumbnails: { [key: number]: string } = {};

  for (const album of albums) {
    const photos = await getPhotos(album.id);
    if (photos.length > 0) {
      albumThumbnails[album.id] = photos[0].thumbnailUrl;
    }
  }

  return (
    <>
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
    </>
  );
}
