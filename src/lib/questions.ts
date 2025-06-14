
export const questionnaireSections = [
  {
    title: "Business Overview",
    questions: [
      {
        id: "businessDescription",
        label: "What kind of business do you run, and how big is your team or company?",
        placeholder: "Example: We are a mid-sized e-commerce startup in the fashion industry with 50 employees, offering sustainable apparel. Our annual revenue is around $5M.",
      },
      {
        id: "currentAiTools",
        label: "Are you currently using any AI tools or services in your business?",
        placeholder: "Example: Yes, we use Zendesk's AI for customer support tickets (~$100/mo) and a custom Python script for inventory forecasting.",
      },
      {
        id: "aiApplicationArea",
        label: "Where in your business are you currently using AI, or thinking about using it?",
        placeholder: "Example: Currently in customer service. We are considering using AI for personalized marketing campaigns and supply chain optimization.",
      },
    ],
  },
  {
    title: "AI Usage & Value",
    questions: [
      {
        id: "aiSpend",
        label: "Around how much do you spend on AI tools, software, or related staff every month or year?",
        placeholder: "Example: We spend about $500/month on AI software subscriptions and one data scientist's salary which is $120k/year.",
      },
      {
        id: "aiToolEffectiveness",
        label: "Are there any AI tools or solutions you’re using that are clearly helping your business grow? Are there any that don’t seem to be working as well as you hoped?",
        placeholder: "Example: The customer service AI has reduced response times by 40%. An early marketing AI tool we tried was not effective and produced generic content.",
      },
    ],
  },
  {
    title: "Tech & Team",
    questions: [
      {
        id: "techInfrastructure",
        label: "Where does your technology live — is it on the cloud, on your own servers, or a mix of both?",
        placeholder: "Example: Our entire infrastructure is on AWS. We use S3, EC2, and RDS.",
      },
      {
        id: "aiTeam",
        label: "Do you have any team members who work directly with AI or machine learning?",
        placeholder: "Example: Yes, we have one machine learning engineer focused on our recommendation engine.",
      },
    ],
  },
  {
    title: "Data & Compliance",
    questions: [
      {
        id: "sensitiveData",
        label: "Do you work with any sensitive information, like customer details, payment data, or health records?",
        placeholder: "Example: We handle customer PII (personally identifiable information) and payment data, which is processed through Stripe.",
      },
      {
        id: "dataCompliance",
        label: "Are there any legal or industry rules you need to follow when it comes to handling data?",
        placeholder: "Example: We are GDPR compliant as we serve European customers.",
      },
    ],
  },
];
