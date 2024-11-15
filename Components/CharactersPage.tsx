'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

interface CharactersPageProps {
  initialCharacters: Character[];
}

const CharactersPage = ({ initialCharacters }: CharactersPageProps) => {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Sayfa değiştirildiğinde veri çekme işlemi
  const fetchCharacters = async (page: number) => {
    setLoading(true);
    const res = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const data = await res.json();
    setCharacters(data.results);
    setLoading(false);
  };

  // Filtreleme işlemi
  const filteredCharacters = characters.filter((character) => {
    let matches = true;

    // Arama filtresi
    if (
      search &&
      !character.name.toLowerCase().includes(search.toLowerCase())
    ) {
      matches = false;
    }

    // Durum filtresi
    if (statusFilter !== 'all' && character.status !== statusFilter) {
      matches = false;
    }

    // Cinsiyet filtresi
    if (genderFilter !== 'all' && character.gender !== genderFilter) {
      matches = false;
    }

    return matches;
  });

  return (
    <div className='bg-gray-900 text-white'>
      {/* Arama ve Filtreleme */}
      <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
        <input
          type='text'
          placeholder='Search characters...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full sm:w-1/3 p-3 rounded-lg bg-gray-700 text-white'
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className='w-full sm:w-1/3 p-3 rounded-lg bg-gray-700 text-white'
        >
          <option value='all'>All Statuses</option>
          <option value='Alive'>Alive</option>
          <option value='Dead'>Dead</option>
          <option value='unknown'>Unknown</option>
        </select>
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className='w-full sm:w-1/3 p-3 rounded-lg bg-gray-700 text-white'
        >
          <option value='all'>All Genders</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Genderless'>Genderless</option>
          <option value='unknown'>Unknown</option>
        </select>
      </div>

      {/* Karakter Listesi */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {loading ? (
          <p className='text-center text-gray-400'>Loading...</p>
        ) : filteredCharacters.length > 0 ? (
          filteredCharacters.map((character) => (
            <div
              key={character.id}
              className='bg-gray-800 p-6 rounded-xl shadow-lg'
            >
              <Image
                src={character.image}
                alt={character.name}
                width={200}
                height={200}
                className='rounded-lg mb-4 mx-auto'
              />
              <h2 className='text-xl font-bold text-teal-400 text-center'>
                {character.name}
              </h2>
              <p className='text-sm text-gray-400 text-center'>
                {character.status}
              </p>
              <p className='text-sm text-gray-500 text-center'>
                {character.species}
              </p>
              <p className='text-sm text-gray-500 text-center'>
                {character.gender}
              </p>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-400'>No characters found!</p>
        )}
      </div>

      {/* Sayfalama */}
      <div className='flex justify-center my-8'>
        <button
          onClick={() => {
            const nextPage = currentPage - 1;
            setCurrentPage(nextPage);
            fetchCharacters(nextPage);
          }}
          disabled={currentPage === 1}
          className='bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-lg mr-4'
        >
          Previous
        </button>
        <button
          onClick={() => {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchCharacters(nextPage);
          }}
          className='bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-lg'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharactersPage;
