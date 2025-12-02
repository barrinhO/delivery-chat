export default function UserList({ users, selectUser }) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-amber-400 mb-6">
        Selecione um usuário
      </h1>

      <div className="w-full max-w-md">
        {users.map((u) => (
          <button
            key={u.id}
            className="w-full mb-2 p-3 bg-gray-800 text-white rounded"
            onClick={() => selectUser(u)}
          >
            {u.name} ({u.role})
          </button>
        ))}
      </div>
    </div>
  );
}
