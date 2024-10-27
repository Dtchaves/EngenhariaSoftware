import { Authentication } from "@/features/authentication/authentication";
import { useAuth } from "@/features/authentication/hooks/use-auth";

function LoginPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        {isAuthenticated ? (
          <p className="text-green-500 text-lg">Usuário autenticado!</p>
        ) : (
          <Authentication isAuthenticated={isAuthenticated} />
        )}
      </div>
    </div>
  );
}

export default LoginPage;
