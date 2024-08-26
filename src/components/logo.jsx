import Link from 'next/link';
import Image from 'next/image';
import SVG_IMAGE_BLACK from '/public/FFW_Logo-black.svg';
import SVG_IMAGE_WHITE from '/public/FFW_Logo-white.svg';

export default function Logo({ className }) {
  return (
    <div>
      <Link href="/">
        <Image
          src={className === 'dark-mode' ? SVG_IMAGE_WHITE : SVG_IMAGE_BLACK}
          alt={'logo'}
          width={150}
          height={111}
        />
      </Link>
    </div>
  );
}
