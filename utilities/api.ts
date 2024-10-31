export async function api(url: string, options?: RequestInit) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}${url}`,
      {
        ...options,
        headers: {
          "Content-Type": "application/json",
        },
        method: options?.method || "POST",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors[0].message);
    }

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
}
