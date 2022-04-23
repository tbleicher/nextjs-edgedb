import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Layout } from '../components/Layout/Layout';

function RedirectAfterLogin() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return <div>redirecting ...</div>;
}

export default function LoginPage() {
  return (
    <Layout requireLogin={true}>
      <RedirectAfterLogin />
    </Layout>
  );
}
