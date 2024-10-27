import { useAuth } from "@/features/authentication/hooks/use-auth";
import { useRouter } from "next/router";

function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Redireciona se o usuário não estiver autenticado
  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Bem vindo!</h1>
        <p className="text-green-500 text-lg">Usuário autenticado!</p>
      </div>
    </div>
  );
}

export default Home;
