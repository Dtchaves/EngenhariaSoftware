export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Bem vindo!</h1>
        <p className="text-blue-500 text-lg">Usuário autenticado!</p>
      </div>
    </div>
  );
}
