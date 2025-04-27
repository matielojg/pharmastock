<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('medicine_infos', function (Blueprint $table) {
            $table->id();
            $table->string('tipo_produto')->nullable();
            $table->string('nome_produto')->nullable();
            $table->date('data_finalizacao_processo')->nullable();
            $table->string('categoria_regulatoria')->nullable();
            $table->string('numero_registro_produto')->nullable();
            $table->date('data_vencimento_registro')->nullable();
            $table->string('numero_processo')->nullable();
            $table->string('classe_terapeutica')->nullable();
            $table->string('empresa_detentora_registro')->nullable();
            $table->string('situacao_registro')->nullable();
            $table->text('principio_ativo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicine_infos');
    }
};
