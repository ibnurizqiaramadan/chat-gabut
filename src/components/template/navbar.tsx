'use client';

import Image from 'next/image';
import { appStore } from '@/store';

export default function Navbar() {
  const { appState } = appStore((state) => state);
  return (
    <div className="navbar bg-white text-black p-4 content-center flex items-center gap-4">
      <Image src="https://flowbite.com/docs/images/logo.svg" alt="" width={32} height={32} />
      <h1>{appState.openedChat?.name ?? 'Select Chat'}</h1>
    </div>
  );
}
