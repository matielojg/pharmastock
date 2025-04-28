'use client';

import { useEffect, useState } from 'react';
import { useApi } from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingWrapper from '@/components/LoadingGovbr';

export default function MedicinesPage() {
  const { get, token } = useApi();
  const [medicines, setMedicines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMedicines() {
      if (!token) return;

      const res = await get("/medicines");
      setMedicines(res);
      setIsLoading(false);
    }
    loadMedicines();
  }, [token]);

  if (isLoading) {
    return <LoadingWrapper />;
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Medicamentos</h1>
        <ul>
          {Array.isArray(medicines) ? (
            medicines.map((med: any) => (
              <li key={med.id} className="border-b py-2">
                {med.name} ({med.manufacturer})
              </li>
            ))
          ) : (
            <p className="text-red-500">Erro ao carregar medicamentos</p>
          )}
        </ul>
      </main>
    </ProtectedRoute>
  );
}
