const API = import.meta.env.VITE_BACKEND_URL;

export async function api(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const data = await response.json();


  console.log("backend is running from port",API,data.demo_otp)
  if (!response.ok) throw new Error(data.detail || "Request failed");
  return data;
}
