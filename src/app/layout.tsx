import { cookies } from 'next/headers';
import './globals.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

export const metadata = {
  title: 'Handcrafted Haven',
  description: 'A marketplace for unique handcrafted items',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  
  const isLoggedIn = cookieStore.has('session_user_id');

  return (
    <html lang="en">
      <body>
        <NavBar isLoggedIn={isLoggedIn} />
        {children}
        <Footer />
      </body>
    </html>
  );
}