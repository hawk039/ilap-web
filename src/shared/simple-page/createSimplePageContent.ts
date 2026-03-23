export type SimplePageContent = {
  title: string;
  description: string;
};

export function createSimplePageContent(
  title: string,
  description: string,
): SimplePageContent {
  return {
    title,
    description,
  };
}
