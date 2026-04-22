export type ChatHistoryItem = {
  id: string;
  category: string;
  title: string;
  preview: string;
  timestamp: string;
  isBookmarked: boolean;
  hasAiInsight?: boolean;
};

export type ChatViewModel = {
  content: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    chats: ChatHistoryItem[];
    emptyState: {
      title: string;
      description: string;
      actionLabel: string;
    };
  };
};
