// app/medico/components/ExamTable.tsx
import Link from "next/link";

interface Exam {
  id: string;
  date: string;
  description: string;
}

interface ExamTableProps {
  patientId: string;
  exams: Exam[];
}

const ExamTable: React.FC<ExamTableProps> = ({ patientId, exams }) => {
  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Data</th>
          <th className="py-2 px-4 border-b">Descrição</th>
        </tr>
      </thead>
      <tbody>
        {exams.map((exam) => (
          <tr key={exam.id} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{exam.date}</td>
            <td className="py-2 px-4 border-b">
              <Link href={`/medico/patients/${patientId}/${exam.id}`}>
                {exam.description}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExamTable;
