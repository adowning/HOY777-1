import type { CreateClientConfig } from "./gen/client.gen";
export const API_BASE_URL =
  "http://localhost:3000";
import superjson from "superjson";

async function fetchUsers() {
  const response = await fetch("/api/users");

  // Instead of `await response.json()`
  const data = superjson.parse(await response.text());

  console.log(data); // Your data with BigInts and other types preserved
  return data;
}

export const createClientConfig: CreateClientConfig = (config: any) => ({
  ...config,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  auth: () =>
    useAuthStore().accessToken || localStorage.getItem("accessToken") || "",
  baseUrl: API_BASE_URL,
});
