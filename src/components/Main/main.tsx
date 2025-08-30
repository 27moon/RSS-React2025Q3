import { Suspense } from 'react';
import List from '../List/list';
import { Loader } from '../Loader/loader';

export function Main() {
  return (
    <Suspense fallback={<Loader />}>
      <List />
    </Suspense>
  );
}
