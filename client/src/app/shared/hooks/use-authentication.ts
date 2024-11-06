import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
// import { useEffect, useState } from "react";
import { cookies } from "next/headers";
interface User {
  id: number;
  name: string;
  role: string;
}

interface AuthenticationResponse {
  authenticated: boolean;
  user: User;
}

export async function useAuthentication(){
  // const [user, setUser] = useState<User | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  try {
    const cookieHeader = await cookies();
    const response = await axios.get<AuthenticationResponse>(`${apiUrl}/api/check`, {
      withCredentials: true,
      headers: {
        Cookie: cookieHeader.toString(),
      },
    });

    if (response.data.authenticated) {
      // setUser(response.data.user);
      return response.data.user;
    } else {
      // setUser(null);
      return null;
    }

    // if (response.data.authenticated) {
    //   // console.log("response.data: ", response.data);
    //   // setUser(response.data.user);
    // } else {
    //   // setUser(null);
    // }
  } catch (err) {
    // setError("Erro ao autenticar usuário");
    // setUser(null);
    return null;
  } 
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     // finally {
  //     //   setLoading(false);
  //     // }
  //   };

  //   fetchUserData();
  // }, []);

  // return user;
};
