function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 mb-4 text-blue-400 hover:text-blue-300 transition"
    >
      <span className="text-xl">←</span> Voltar
    </button>
  );
}
