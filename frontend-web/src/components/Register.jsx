import { useState } from "react";

export default function Register({ onRegister, goLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "cliente",
  });

  const handle = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-amber-400 mb-6">Cadastro</h1>

      <input
        className="mb-2 p-2 rounded bg-gray-800 text-white w-80"
        placeholder="Nome"
        value={form.name}
        onChange={(e) => handle("name", e.target.value)}
      />

      <input
        className="mb-2 p-2 rounded bg-gray-800 text-white w-80"
        placeholder="Email"
        value={form.email}
        onChange={(e) => handle("email", e.target.value)}
      />

      <input
        className="mb-2 p-2 rounded bg-gray-800 text-white w-80"
        type="password"
        placeholder="Senha"
        value={form.password}
        onChange={(e) => handle("password", e.target.value)}
      />

      <input
        className="mb-2 p-2 rounded bg-gray-800 text-white w-80"
        placeholder="Role (cliente ou atendente)"
        value={form.role}
        onChange={(e) => handle("role", e.target.value)}
      />

      <button
        className="px-4 py-2 bg-green-500 text-white rounded mb-2 w-80"
        onClick={() => onRegister(form)}
      >
        Cadastrar
      </button>

      <button className="text-blue-400 underline" onClick={goLogin}>
        ← Voltar
      </button>
    </div>
  );
}
