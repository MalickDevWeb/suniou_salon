const baseURL = process.env.EXPO_PUBLIC_API_URL?.trim() || "http://127.0.0.1:3001/api";

const postJson = async (path, body, token) => {
  const response = await fetch(`${baseURL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`${path} -> ${response.status} ${await response.text()}`);
  }

  return response.json();
};

const getJson = async (path, token) => {
  const response = await fetch(`${baseURL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });

  if (!response.ok) {
    throw new Error(`${path} -> ${response.status} ${await response.text()}`);
  }

  return response.json();
};

const main = async () => {
  console.log(`Smoke test frontend -> ${baseURL}`);

  const ownerSession = await postJson("/auth/login", {
    email: "owner@suniou.app",
    password: "Password123!"
  });

  const owner = await getJson("/auth/me", ownerSession.token);
  const salons = await getJson("/salons");
  const ownerBookings = await getJson("/salons/me/bookings", ownerSession.token);

  const clientSession = await postJson("/auth/login", {
    email: "client@suniou.app",
    password: "Password123!"
  });

  const clientOrders = await getJson("/orders/me", clientSession.token);

  console.log("Owner:", owner.email, owner.role);
  console.log("Salons:", salons.length);
  console.log("Owner bookings:", ownerBookings.length);
  console.log("Client orders:", clientOrders.length);
  console.log("Smoke test OK");
};

main().catch((error) => {
  console.error("Smoke test FAILED");
  console.error(error);
  process.exit(1);
});
