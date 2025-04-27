<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicineInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'tipo_produto',
        'nome_produto',
        'data_finalizacao_processo',
        'categoria_regulatoria',
        'numero_registro_produto',
        'data_vencimento_registro',
        'numero_processo',
        'classe_terapeutica',
        'empresa_detentora_registro',
        'situacao_registro',
        'principio_ativo',
    ];
}
