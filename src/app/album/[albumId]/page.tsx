import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAlbums, getPhotos } from '../../../lib/data';

export default async function AlbumPage({
  params,
}: {
  params: { albumId: number };
}) {
  const albumId = params.albumId;
  const album = (await getAlbums()).find((a) => a.id == albumId);
  const photos = await getPhotos(Number(albumId));

  if (!album) {
    return notFound();
  }

  return (
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
}
