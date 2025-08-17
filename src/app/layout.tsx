import type { Metadata } from 'next';
import ContextProvider from '../context/contextProvider';
import '../App.css';
import '../index.css';

export const metadata: Metadata = {
  title: 'Rick and Morty',
  description: 'find characters',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <div id="root">{children}</div>
        </ContextProvider>
      </body>
    </html>
  );
}
