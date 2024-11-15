import CharactersPage from '../Components/CharactersPage';

export default async function Page() {
  // Sunucudan veri çekme
  const res = await fetch('https://rickandmortyapi.com/api/character?page=1');
  const data = await res.json();

  return (
    <div className='bg-gray-900 text-white'>
      <CharactersPage initialCharacters={data.results} />
    </div>
  );
}
