import { editPatientProfile } from "../hooks/edit-patient-profile";
import { getPatientProfile } from "../../../shared/hooks/get-patient-profile";
import { EditProfileForm } from "@/app/shared/components/EditProfileForm";

const initialState = {
  message: "",
};

export default async function EditPatientPage() {
  //   const getPatientProfile = useGetPatientProfile();
  const data = await getPatientProfile();
  if ('message' in data) {
    return <div>{data.message}</div>;
  }

  // const [formData, setFormData] = useState<EditPatientData>({
  //   name: "",
  //   email: "",
  //   age: 0,
  // });
  // const [error, setError] = useState("");
  // const router = useRouter()


  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!data) {
  //       setError("Erro ao buscar dados do paciente");
  //       return;
  //     }

  //     setFormData(data);
  //   };

  //   fetchData();
  // }, [getPatientProfile]);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  // const handleSave = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   editPatientProfile(formData, setError);
  // };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-3 bg-white p-8 rounded-lg shadow-md max-w-md">
        <h2 className="text-2xl font-bold mb-4">Perfil do Paciente</h2>
        <EditProfileForm initialData={data} userRole="patient" onSubmit={editPatientProfile} />
      </div>
    </div>
  );
}
