// pages/404.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect immediately to the homepage
    router.push('/');
  }, [router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>You will be redirected to the homepage shortly.</p>
    </div>
  );
};

export default Custom404;
