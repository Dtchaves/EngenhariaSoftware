import { useEffect, useState } from "react";
import axios from "axios";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string; // A imagem original da notícia
}

export const useNewsData = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const apiKey = process.env.REACT_APP_NEWS_API_KEY;
        console.log("API Key:", process.env.REACT_APP_NEWS_API_KEY);

        if (!apiKey) {
          throw new Error("Chave API não encontrada. Verifique o arquivo .env.");
        }

        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
          params: {
            country: 'us',
            apiKey: apiKey,
          },
        });

        // Filtrar ou transformar as URLs das imagens, se necessário
        const filteredArticles = response.data.articles.map((article: Article) => ({
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage || 'default-image-url.jpg', // Adicione uma imagem padrão se necessário
        }));

        setArticles(filteredArticles);
      } catch (err: any) {
        console.error("Erro ao buscar notícias:", err.response ? err.response.data : err.message);
        setError("Erro ao buscar notícias");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  return { articles, loading, error };
};
