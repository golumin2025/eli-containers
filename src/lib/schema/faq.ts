interface FaqItem {
  question?: string;
  answer?: string;
  accordion_id?: { question: string; answer: string };
}

export function buildFaqSchema(faqList: FaqItem[]) {
  if (!faqList?.length) return null;

  const entities = faqList
    .map((faq) => {
      const question = faq.question ?? faq.accordion_id?.question;
      const answer   = faq.answer   ?? faq.accordion_id?.answer;
      if (!question || !answer) return null;
      return {
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer.replace(/<[^>]*>/g, "").trim(),
        },
      };
    })
    .filter(Boolean);

  if (!entities.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entities,
  };
}
