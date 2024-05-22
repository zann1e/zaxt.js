import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAlbums, getPhoto } from '../../../../../lib/data';

export default async function PhotoPage({
  params,
}: {
  params: { albumId: number; photoId: number };
}) {
  const photoId = params.photoId;
  const albumId = params.albumId;
  const photo = await getPhoto(Number(photoId));
  const album = (await getAlbums()).find((a) => a.id == albumId);

  if (!photo || !album) {
    return notFound();
  }

  if (photo.albumId != Number(albumId)) {
    return notFound();
  }

  return (
    <>
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
    </>
  );
}
