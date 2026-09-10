import "./globals.css";
import styles from './layout.module.css';
import Header from './components/header/header';
import getLoggedInUser from '@/server-actions/getLoggedInUser';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUser();

  return (
    <html lang="en">
      <body>
        <Header user={user} />
        <div className={styles.content}>
            {children}
        </div>
      </body>
    </html>
  );
}
