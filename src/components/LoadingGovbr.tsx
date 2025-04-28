import dynamic from 'next/dynamic';

const Loading = dynamic(() => import('react-dsgov').then(m => m.Loading), { ssr: false });

export default function LoadingWrapper() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-white">
      <Loading size="medium" />
    </div>
  );
}
