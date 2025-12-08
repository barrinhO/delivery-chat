import { useState } from "react";

export default function Login({ onLogin, goRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-amber-400 mb-6">Login</h1>

      <input
        className="mb-2 p-2 rounded bg-gray-800 text-white w-80"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="mb-2 p-2 rounded bg-gray-800 text-white w-80"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded mb-2 w-80"
        onClick={() => onLogin(email, password)}
      >
        Login
      </button>

      <button className="text-blue-400 underline" onClick={goRegister}>
        Criar conta
      </button>
    </div>
  );
}
