import ChatHistoryScreen from "@/features/chat/ChatHistoryScreen";

type ChatPageProps = {
  searchParams: Promise<{
    lawType?: string;
    sessionId?: string;
  }>;
};

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const params = await searchParams;

  return (
    <ChatHistoryScreen
      lawType={params.lawType ?? ""}
      sessionId={params.sessionId ?? ""}
    />
  );
}
