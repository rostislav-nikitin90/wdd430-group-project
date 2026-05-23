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
  console.log("RootLayout rendered"); // Replace this console message with actual layout code
  return (
    <html lang="en">
      <body>
        {children} 
      </body>
    </html>
  ); // Replace with actual layout code (e.g., global NavBar, Footer, etc.)
}
