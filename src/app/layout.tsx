import type { Metadata } from 'next';
import '../index.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: "Lyrabloom | Peinture de Tableaux & Décoration d'Intérieur au Niger",
  description: "Lyrabloom est un studio créatif au Niger spécialisé dans la peinture décorative de tableaux. Sublimez vos intérieurs avec des œuvres originales, inspirées de la terre et de l'art.",
  openGraph: {
    title: "Lyrabloom | Peinture de Tableaux & Décoration d'Intérieur",
    description: "Sublimez vos intérieurs avec des toiles abstraites contemporaines, créées au Niger.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <div id="root">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
