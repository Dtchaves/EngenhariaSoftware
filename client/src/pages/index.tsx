import { useAuth } from "@/features/authentication/hooks/use-auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Redireciona se o usuário não estiver autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Bem vindo!</h1>
        <p className="text-blue-500 text-lg">Usuário autenticado!</p>
      </div>
    </div>
  );
}

export default Home;
