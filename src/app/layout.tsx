import './globals.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

export const metadata = {
  title: 'Handcrafted Haven',
  description: 'A marketplace for unique handcrafted items',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}