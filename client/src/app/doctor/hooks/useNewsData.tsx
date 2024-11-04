// app/doctor/hooks/useNewsData.ts
import { useEffect, useState } from "react";
import axios from "axios";
//import { apiUrl } from "@/app/shared/constants"; // Certifique-se de que a URL está correta
import dotenv from 'dotenv';

dotenv.config();

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
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
          params: {
            country: 'us', // ou outro país de sua escolha
            apiKey: process.env.NEWS_API_KEY, // Certifique-se de que sua chave API está no .env
          },
        });

        // Filtrar ou transformar as URLs das imagens, se necessário
        const filteredArticles = response.data.articles.map((article: Article) => ({
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage ? article.urlToImage : 'default-image-url.jpg', // Adicione uma imagem padrão se necessário
        }));

        setArticles(filteredArticles);
      } catch (err) {
        console.error("Erro ao buscar notícias:", err);
        setError("Erro ao buscar notícias");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  return { articles, loading, error };
};
