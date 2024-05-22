import Link from 'next/link';
import Image from 'next/image';
import SVGIMAGE from '/public/FFW_Logo-black.svg';

export default function Logo() {
  return (
    <div>
      <Link href="/">
        <Image src={SVGIMAGE} alt={'logo'} width={150} height={111} />
      </Link>
    </div>
  );
}
