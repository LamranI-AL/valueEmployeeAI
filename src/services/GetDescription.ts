import { connectTodb } from "@/db/connectTodb";
import { description } from "@/interfaces/Interface";
const baseUrl: string = "http://localhost:3000";
export const createDescription = async (description: description) => {
  await connectTodb();
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    body: JSON.stringify(description),
  });
  const data = await response.json();
  return data;
};
//get
export const getDescriptions = async () => {
  await connectTodb();
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};
