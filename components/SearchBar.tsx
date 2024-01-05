'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { SearchManufacturer } from '.';

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type='submit' className={`-ml-3 ${otherClasses}`}>
    <Image
      src='/magnifying-glass.svg'
      alt='magnifying glass'
      width={40}
      height={40}
      className='object-contain'
    />
  </button>
);

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer === '' && model === '') {
      return alert('Please fill in the search bar');
    }

    updateSearchParams(manufacturer.toLowerCase(), model.toLowerCase());
  };

  const updateSearchParams = (manufacturer: string, model: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (manufacturer) {
      searchParams.set('manufacturer', manufacturer);
    } else {
      searchParams.delete('manufacturer');
    }

    if (model) {
      searchParams.set('model', model);
    } else {
      searchParams.delete('model');
    }

    const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathName, {scroll: false});
  }

  return (
    <form
      className='searchbar'
      onSubmit={handleSearch}
    >
      <div className='searchbar__item'>
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />

        <SearchButton otherClasses='sm:hidden z-10' />
      </div>

      <div className='searchbar__item'>
        <Image
          src='/model-icon.png'
          alt='car model'
          width={25}
          height={25}
          className='absolute w-[20px] h-[20px] ml-4'
        />

        <input
          type='text'
          name='model'
          value={model}
          placeholder='Tiguan'
          className='searchbar__input'
          onChange={(e) => setModel(e.target.value)}
        />

        <SearchButton otherClasses='sm:hidden' />
      </div>

      <SearchButton otherClasses='max-sm:hidden z-10' />
    </form>
  )
};

export default SearchBar;