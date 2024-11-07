import { useState } from "react";

interface SendExamResultProps {
  patientId: string;
  examId: string;
  doctorEmail: string;
}

const SendExamResult: React.FC<SendExamResultProps> = ({ patientId, examId, doctorEmail }) => {
  const [message, setMessage] = useState<string>("");

  const handleSendResult = async () => {
    try {
      const response = await fetch(`/api/patients/${patientId}/exams/${examId}/send-result`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          doctorEmail,
        }),
      });

      if (response.ok) {
        alert("Resultado enviado com sucesso!");
        setMessage("");
      } else {
        console.error("Erro ao enviar o resultado");
      }
    } catch (error) {
      console.error("Erro ao enviar o resultado:", error);
    }
  };

  return (
    <div className="mt-4">
      <h2>Enviar Resultado do Exame</h2>
      <textarea
        className="border w-full p-2"
        placeholder="Escreva uma mensagem para o paciente"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendResult} className="btn mt-2">
        Enviar Resultado
      </button>
    </div>
  );
};

export default SendExamResult;
