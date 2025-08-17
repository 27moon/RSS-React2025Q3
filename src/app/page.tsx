import { notFound } from 'next/navigation';
import { getAllCharacters } from '../services/apiServer';

import { MainPage } from '../components/Main/page-main';

export function generateStaticParams() {
  return [{ slug: [] }];
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  if (params.slug && params.slug.length > 0) {
    notFound();
  }
  const data = await getAllCharacters();

  return <MainPage results={data.results} totalPages={data.info.pages} />;
}
