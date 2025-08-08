"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { GOOGLE_ACCESS_TOKEN } from "@/lib/tokens";

function Callback() {
  const router = useRouter();

  useEffect(() => {
    console.log("RedirectHandler mounted successfully");

    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("access_token");
    console.log("QueryParams: ", window.location.search);

    if (accessToken) {
      console.log("AccessToken found: ", accessToken);
      localStorage.setItem(GOOGLE_ACCESS_TOKEN, accessToken);

      //verify the token from the backend
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      axios
        .get("http://localhost:8000/accounts/auth/user/")
        .then((response) => {
          console.log("User data:", response.data);
          router.push("/");
        })
        .catch((error) => {
          console.error(
            "Error verfiying token:",
            error.response ? error.response.data : error.message
          );
          router.push("/login");
        });
    } else {
      console.log("No token found in URL");
      router.push("/login");
    }
  }, [router]);

  return <div>Logging In.........</div>;
}

export default Callback;
