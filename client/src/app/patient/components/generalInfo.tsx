// app/doctor/components/GeneralInfo.tsx
import { useNewsData } from "../hooks/useNewsData";
import Image from 'next/image';

export default function GeneralInfo() {
  const { articles, loading, error } = useNewsData();

  if (loading) return <div>Carregando notícias...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Últimas Notícias em Saúde</h2>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <div key={index} className="p-4 border rounded shadow">
            {article.urlToImage && (
              <Image
                src={article.urlToImage}
                alt={article.title}
                width={500} // Defina a largura
                height={300} // Defina a altura
                className="w-full h-48 object-cover mb-2"
              />
            )}
            <h3 className="text-xl font-semibold">{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              Leia mais
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
