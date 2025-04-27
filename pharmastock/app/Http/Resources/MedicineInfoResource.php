<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MedicineInfoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome_produto' => $this->nome_produto,
            'principio_ativo' => $this->principio_ativo,
            'tipo_produto' => $this->tipo_produto,
            'categoria_regulatoria' => $this->categoria_regulatoria,
            'numero_registro_produto' => $this->numero_registro_produto,
            'data_vencimento_registro' => $this->data_vencimento_registro,
            'numero_processo' => $this->numero_processo,
            'classe_terapeutica' => $this->classe_terapeutica,
            'empresa_detentora_registro' => $this->empresa_detentora_registro,
            'situacao_registro' => $this->situacao_registro,
        ];
    }
}
