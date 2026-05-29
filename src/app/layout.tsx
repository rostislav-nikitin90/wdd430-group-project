import './globals.css';

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
        {children}
      </body>
    </html>
  );
}