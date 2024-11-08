// ECGUploader.tsx
"use client";
import React, { useState, ChangeEvent, startTransition } from "react";
import { ECGUpload } from "../lib/use-ecg-upload";
import { useActionState } from "react";
import FormInput from "@/app/shared/components/FormInput";

const initialState = {
  message: "",
};

export default function ECGUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [state, formAction, isPending] = useActionState(ECGUpload, initialState);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // Envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Por favor, selecione um arquivo.");
      return;
    }

    if (!name) {
      alert("Por favor, insira um nome.");
      return;
    }

    // Criando FormData e adicionando o arquivo e o nome
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);

    // Chamando formAction e passando o formData dentro de startTransition
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="mt-6 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Faça o upload do seu ECG</h2>
      
      {/* Mensagem de erro */}
      {state.message && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-md text-center mb-4">
          {state.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Nome do ECG */}
        <FormInput
          name="name"
          placeholder="Nome do ECG"
          value={name}
          onChange={handleNameChange}
          className="border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Seleção do arquivo */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Exibição do nome do arquivo */}
        {file && (
          <p className="text-sm text-gray-600 mt-2">Arquivo selecionado: <span className="font-medium">{file.name}</span></p>
        )}

        {/* Botão de envio */}
        <button
          type="submit"
          disabled={isPending}
          className={`mt-4 w-full px-4 py-2 rounded-md text-white font-semibold ${
            isPending ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 transition"
          }`}
        >
          {isPending ? "Enviando..." : "Fazer upload"}
        </button>
      </form>
    </div>
  );
}
