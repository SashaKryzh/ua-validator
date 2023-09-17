import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='grow'>{children}</div>
      <Footer />
    </div>
  );
}
