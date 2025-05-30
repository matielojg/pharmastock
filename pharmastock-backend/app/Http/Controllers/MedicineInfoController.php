<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MedicineInfo;
use App\Http\Resources\MedicineInfoResource;
use Illuminate\Support\Facades\Cache;

class MedicineInfoController extends Controller
{
    /**
     * Busca medicamentos pelo nome, princípio ativo ou laboratório.
     */
    public function search(Request $request)
    {
        $cacheKey = 'medicines_info_' . md5(json_encode($request->all()));
        $cacheTtl = 600;

        $results = Cache::remember($cacheKey, $cacheTtl, function () use ($request) {

            $query = MedicineInfo::query();

            if ($request->filled('nome')) {
                $query->where('nome_produto', 'LIKE', '%' . $request->nome . '%');
            }

            if ($request->filled('principio')) {
                $query->where('principio_ativo', 'LIKE', '%' . $request->principio . '%');
            }

            if ($request->filled('laboratorio')) {
                $query->where('empresa_detentora_registro', 'LIKE', '%' . $request->laboratorio . '%');
            }

            if ($request->filled('classe')) {
                $query->where('classe_terapeutica', 'LIKE', '%' . $request->classe . '%');
            }

            if ($request->filled('registro')) {
                $query->where('numero_registro_produto', 'LIKE', '%' . $request->registro . '%');
            }

            return $query->paginate(10);
        });
        return MedicineInfoResource::collection($results);
    }
}
