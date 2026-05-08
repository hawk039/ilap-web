import ChatHistoryScreen from "@/features/chat/ChatHistoryScreen";

type ChatPageProps = {
  searchParams: Promise<{
    conversationId?: string;
  }>;
};

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const params = await searchParams;

  return (
    <ChatHistoryScreen
      conversationId={params.conversationId ?? ""}
    />
  );
}
