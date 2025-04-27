<?php

namespace App\Http\Controllers;

use App\Models\Medicine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MedicineController extends Controller
{
    public function index()
    {
        // Listar apenas os remédios do usuário autenticado
        return response()->json(Auth::user()->medicines);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'manufacturer' => 'required|string',
            'amount' => 'required|integer|min:0',
            'external_code' => 'nullable|string',
        ]);

        $medicine = Auth::user()->medicines()->create($validated);

        return response()->json($medicine, 201);
    }

    public function show(Medicine $medicine)
    {
        $this->authorizeMedicine($medicine);

        return response()->json($medicine);
    }

    public function update(Request $request, Medicine $medicine)
    {
        $this->authorizeMedicine($medicine);

        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'manufacturer' => 'sometimes|required|string',
            'amount' => 'sometimes|required|integer|min:0',
            'external_code' => 'nullable|string',
        ]);

        $medicine->update($validated);

        return response()->json($medicine);
    }

    public function destroy(Medicine $medicine)
    {
        $this->authorizeMedicine($medicine);

        $medicine->delete();

        return response()->json(['message' => 'Remédio removido com sucesso']);
    }

    protected function authorizeMedicine(Medicine $medicine)
    {
        if ($medicine->user_id !== Auth::id()) {
            abort(403, 'Não autorizado.');
        }
    }

}
