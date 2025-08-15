"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { GOOGLE_ACCESS_TOKEN } from "@/lib/tokens";
import { useUserProfileStore } from "@/stores/userProfileStore";
import api from "@/lib/api/api";

function Callback() {
  const router = useRouter();
  const fetchUserProfile = useUserProfileStore(
    (state) => state.fetchUserProfile
  );

  useEffect(() => {
    const handleCallback = async () => {
      console.log("RedirectHandler mounted successfully");

      const queryParams = new URLSearchParams(window.location.search);
      const accessToken = queryParams.get("access_token");
      console.log("QueryParams: ", window.location.search);

      if (!accessToken) {
        console.log("No token found in URL");
        router.push("/login");
        return;
      }

      console.log("AccessToken found: ", accessToken);
      localStorage.setItem(GOOGLE_ACCESS_TOKEN, accessToken);

      // Set Authorization header
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      try {
        await fetchUserProfile();
        router.push("/");
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error verifying token:",
            error.response?.data || error.message
          );
        } else {
          console.error("Unknown error:", error);
        }
        router.push("/login");
      }
    };

    handleCallback();
  }, [router, fetchUserProfile]);

  return <div>Logging In.........</div>;
}

export default Callback;
