"use client";
import React, { useState, ChangeEvent, startTransition } from "react";
import { ECGUpload } from "../lib/use-ecg-upload";
import { useActionState } from "react";
import FormInput from "@/app/shared/components/FormInput";

const initialState = {
  imageData: null,
  message: null,
};

export function ECGUploader() {
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
  const handleSubmit = async (e: React.FormEvent) => {
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
    <div style={{ marginTop: "20px" }}>
      <h2>Faça o upload do seu ECG</h2>
      {state.message && (
        <div className="bg-red-500 text-white p-4 text-center">{state.message}</div>
      )}
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3">
        <FormInput name="name" placeholder="Nome do ECG" value={name} onChange={handleNameChange} />

        <FormInput name="file" placeholder="Selecione o arquivo" value={undefined} onChange={handleFileChange} />
        {file && <p>Arquivo selecionado: {file.name}</p>}

        <button type="submit" disabled={isPending} style={{ marginTop: "10px" }}>
          {isPending ? "Uploading..." : "Fazer upload"}
        </button>
      </form>

      {/* Exibição da imagem */}
      {state.imageData && (
        <div>
          <h3>ECG Image:</h3>
          <img
            src={`data:image/png;base64,${state.imageData}`}
            alt="ECG Result"
            style={{ marginTop: "20px", maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
}