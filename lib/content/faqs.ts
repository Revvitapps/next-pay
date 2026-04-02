export type FaqItem = {
  question: string;
  answer: string;
};

export const fullFaqItems: FaqItem[] = [
  {
    question: 'What does NextPay actually help a business with?',
    answer:
      'NextPay helps businesses figure out the right payment setup before they commit. That can include payment processing, POS systems, pricing structure, devices, online payments, reporting, and adjacent services that support how the business runs.'
  },
  {
    question: 'Do I need payment processing, a POS system, or both?',
    answer:
      'Some businesses only need a better payment setup. Others need a full POS with checkout, inventory, staff permissions, receipts, ticketing, or reporting. The right answer depends on how and where you sell.'
  },
  {
    question: 'Why should I take the quiz instead of just asking for pricing?',
    answer:
      'Pricing only makes sense after the setup is narrowed first. The quiz uses your industry, workflow, sales channels, and volume to point you toward the right next step instead of starting with a generic quote that may not fit the business.'
  },
  {
    question: 'Can NextPay support in-store, online, and mobile payments?',
    answer:
      'Yes. Depending on the business, the right setup may include countertop payments, mobile acceptance, online checkout, invoices, payment links, recurring billing, or a mix of channels.'
  },
  {
    question: 'How do I choose the right device or hardware setup?',
    answer:
      'The right hardware depends on how the business operates. A front-counter business may need a fixed terminal or full station. A field or tableside business may need mobile acceptance. Some businesses need both.'
  },
  {
    question: 'What is the difference between a POS and a terminal?',
    answer:
      'A terminal is mainly for taking payments. A POS can add software and operational tools like inventory, staff controls, receipts, order flow, customer records, and reporting. Not every business needs the same level of system.'
  },
  {
    question: 'How do I know if my current pricing structure is wrong?',
    answer:
      'If your fees are hard to understand, your effective rate feels high, or the setup no longer matches how your business sells, it is worth reviewing. A lower advertised rate does not help if the structure itself is a poor fit.'
  },
  {
    question: 'Can NextPay help lower processing costs?',
    answer:
      'In many cases, yes, but the first step is understanding the current structure. Savings can depend on card mix, ticket size, business type, sales channels, underwriting profile, and whether the current setup is aligned with the operation.'
  },
  {
    question: 'What do you review in a merchant statement?',
    answer:
      'A statement review helps look at pricing structure, effective rate, volume patterns, transaction mix, and signs that the current setup may not fit the business well. It is a practical way to understand what may need a closer look.'
  },
  {
    question: 'How long does setup usually take?',
    answer:
      'It depends on the business type, hardware needs, underwriting requirements, and whether the setup includes online payments or POS deployment. Simpler setups can move faster, while more complex or higher-risk businesses may need more coordination.'
  },
  {
    question: 'Will my current equipment or software still work?',
    answer:
      'Sometimes yes, sometimes no. Compatibility depends on the hardware, gateway, processor, software stack, and what the business needs going forward. The goal is to determine the right fit before buying or replacing anything.'
  },
  {
    question: 'Can NextPay help high-risk businesses or businesses others turn away?',
    answer:
      'Yes. Some businesses need a more underwriting-aware path, along with better gateway fit, chargeback readiness, and operational controls. Those cases usually need a narrower recommendation instead of a one-size-fits-all offer.'
  },
  {
    question: 'Can a POS help with inventory, staff controls, receipts, and tips?',
    answer:
      'Yes, depending on the system. Businesses often move to a fuller POS because they need stronger checkout flow, tip handling, item management, staff permissions, reporting, or multi-location visibility.'
  },
  {
    question: 'How do I know where to start?',
    answer:
      'If you are still sorting out what you need, start with the quiz. If you already process payments and want a deeper review of your current setup, upload a statement. Those are the two clearest paths forward.'
  }
];

export const homeFaqItems: FaqItem[] = [
  fullFaqItems[0],
  fullFaqItems[1],
  fullFaqItems[2],
  fullFaqItems[3],
  fullFaqItems[13]
];
