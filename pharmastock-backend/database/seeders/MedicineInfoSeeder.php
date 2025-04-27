<?php

namespace Database\Seeders;

use App\Models\MedicineInfo;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Exception;

class MedicineInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = database_path('csv/DADOS_ABERTOS_MEDICAMENTOS.csv');

        if (!file_exists($path) || !is_readable($path)) {
            throw new Exception("Arquivo CSV não encontrado ou não é legível: {$path}");
        }

        $header = null;
        $data = [];

        if (($handle = fopen($path, 'r')) !== false) {
            while (($row = fgetcsv($handle, 1000, ';')) !== false) {
                // Converter todos os campos para UTF-8
                $row = array_map(function ($value) {
                    return mb_convert_encoding($value, 'UTF-8', 'Windows-1252');
                }, $row);

                if (!$header) {
                    $header = array_map('strtoupper', $row);
                } else {
                    if (count($row) === count($header)) {
                        $rowData = array_combine($header, $row);
                        MedicineInfo::create([
                            'tipo_produto' => $rowData['TIPO_PRODUTO'] ?? null,
                            'nome_produto' => $rowData['NOME_PRODUTO'] ?? null,
                            'data_finalizacao_processo' => isset($rowData['DATA_FINALIZACAO_PROCESSO']) ? date('Y-m-d', strtotime($rowData['DATA_FINALIZACAO_PROCESSO'])) : null,
                            'categoria_regulatoria' => $rowData['CATEGORIA_REGULATORIA'] ?? null,
                            'numero_registro_produto' => $rowData['NUMERO_REGISTRO_PRODUTO'] ?? null,
                            'data_vencimento_registro' => isset($rowData['DATA_VENCIMENTO_REGISTRO']) ? date('Y-m-d', strtotime($rowData['DATA_VENCIMENTO_REGISTRO'])) : null,
                            'numero_processo' => $rowData['NUMERO_PROCESSO'] ?? null,
                            'classe_terapeutica' => $rowData['CLASSE_TERAPEUTICA'] ?? null,
                            'empresa_detentora_registro' => $rowData['EMPRESA_DETENTORA_REGISTRO'] ?? null,
                            'situacao_registro' => $rowData['SITUACAO_REGISTRO'] ?? null,
                            'principio_ativo' => $rowData['PRINCIPIO_ATIVO'] ?? null,
                        ]);
                    }
                }
            }
            fclose($handle);
        }
    }
}
