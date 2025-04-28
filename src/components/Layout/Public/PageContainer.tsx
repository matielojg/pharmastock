'use client';

import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="min-h-screen p-4 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-10 gap-2">
        <div className="col-span-8 col-start-2 bg-[tomato]">
          {children}
        </div>
      </div>
    </div>
  );
}
