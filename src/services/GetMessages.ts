import { connectTodb } from "@/db/connectTodb";
import { AiMessage, AIMessages, user } from "@/interfaces/Interface";

export const baseUrl: string = "http://localhost:3000";

export const createMessages = async (messages: AIMessages) => {
  try {
    await connectTodb();
    const response = await fetch(`${baseUrl}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });

    if (!response.ok) {
      throw new Error(`Failed to create message: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
};

export const getMessages = async () => {
  try {
    await connectTodb();
    const response = await fetch(`${baseUrl}/api/messages`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const getMessageByUser = async (user: user) => {
  try {
    await connectTodb();
    const messages: AIMessages[] = await getMessages();

    const filteredMessages = messages.filter(
      (message) => message.createdUser === user.name
    );

    return filteredMessages;
  } catch (error) {
    console.error("Error fetching messages by user:", error);
    throw error;
  }
};
