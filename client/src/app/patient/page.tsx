"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PatientPage() {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);
  return (
    <div className="relative min-h-screen">
      {/* Background image with blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-lg"
        style={{
          backgroundImage: "url('image.jpg')", // Caminho para a imagem de fundo
          zIndex: -1,
        }}
      ></div>

      <div className="flex h-screen bg-gray-50 bg-opacity-50"> {/* Para sobrepor uma leve transparência ao fundo */}
        <div className="flex-1 flex flex-col p-8">
          <main className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            {/* Seção de Boas-Vindas */}
            <section>
              <h1 className="text-4xl font-semibold text-gray-800 mb-6">Seja Bem-vindo!</h1>
              <p className="text-lg text-gray-700 mb-6">
                O objetivo deste site é desenvolver um software inovador para facilitar a comunicação entre médicos e pacientes em relação a
                eletrocardiogramas (ECGs). Em um contexto onde as doenças cardíacas continuam a ser uma das principais causas de morte em 2024,
                é crucial implementar métodos automáticos eficientes para a identificação de distúrbios cardiovasculares.
              </p>
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sobre o sistema</h2>
                <p className="text-lg text-gray-700 mb-4">
                  Este sistema foi desenvolvido para facilitar a comunicação entre médicos e pacientes, tornando o processo de armazenamento de exames muito mais eficiente. A plataforma permite que os médicos acessem os exames de seus pacientes de forma rápida e segura, promovendo uma abordagem colaborativa no cuidado à saúde.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Além disso, o sistema permite a integração da inteligência artificial (IA) com os médicos, oferecendo a opção de utilizar um classificador automático de ECG. Este classificador auxilia os médicos na análise dos exames, proporcionando uma ferramenta adicional para apoiar a tomada de decisões. Qualquer modelo de classificação automática de ECG pode ser usado no sistema, todavia o escolhido foi o proposto no artigo a seguir:
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  <a
                    href="https://cinc.org/2024/Program/accepted/477_Preprint.pdf"
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Classificação de Seis Condições Clínicas
                  </a>
                </p>
              </section>
            </section>

            {/* Seção sobre os Autores */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Autores do Projeto</h2>
              <p className="text-lg text-gray-700 mb-4">
                Este projeto foi desenvolvido por um time dedicado de pesquisadores e desenvolvedores. Conheça os autores abaixo:
              </p>
              <div className="flex space-x-8">
                {/* Autor 1 */}
                <div className="flex flex-col items-center">
                  <img
                    src="digs.jpg"
                    alt="Autor 1"
                    className="rounded-full w-32 h-32 mb-4"
                  />
                  <p className="font-semibold text-lg">Diogo Tuler</p>
                  <a
                    href="https://www.linkedin.com/in/diogotulerchaves/"
                    className="flex items-center mt-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/logos/link.png" // Caminho para a imagem do LinkedIn
                      width={30} // Tamanho da imagem
                      height={30}
                      className="mr-2" // Espaçamento entre a imagem e o texto
                    />
                  </a>
                </div>

                {/* Autor 2 */}
                <div className="flex flex-col items-center">
                  <img
                    src="jota.jpg"
                    alt="Autor 2"
                    className="rounded-full w-32 h-32 mb-4"
                  />
                  <p className="font-semibold text-lg">João Marcos T.</p>
                  <a
                    href="https://www.linkedin.com/in/joaomarcostomaz/"
                    className="flex items-center mt-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/logos/link.png" // Caminho para a imagem do LinkedIn
                      width={30} // Tamanho da imagem
                      height={30}
                      className="mr-2" // Espaçamento entre a imagem e o texto
                    />
                  </a>
                </div>

                {/* Autor 3 */}
                <div className="flex flex-col items-center">
                  <img
                    src="rafa_serio.jpeg"
                    alt="Autor 3"
                    className="rounded-full w-32 h-32 mb-4"
                  />
                  <p className="font-semibold text-lg">Rafael Martins</p>
                  <a
                    href="https://www.linkedin.com/in/rafaelmg7/"
                    className="flex items-center mt-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/logos/link.png" // Caminho para a imagem do LinkedIn
                      width={30} // Tamanho da imagem
                      height={30}
                      className="mr-2" // Espaçamento entre a imagem e o texto
                    />
                  </a>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}