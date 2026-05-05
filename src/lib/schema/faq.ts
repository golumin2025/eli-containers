interface FaqItem {
  accordion_id: {
    question: string;
    answer: string;
  };
}

export function buildFaqSchema(faqList: FaqItem[]) {
  if (!faqList.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((faq) => ({
      "@type": "Question",
      name: faq.accordion_id.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.accordion_id.answer.replace(/<[^>]*>/g, "").trim(),
      },
    })),
  };
}
