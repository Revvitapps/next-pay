export const quizMessaging = {
  curiosity: [
    'Not Sure What Your Business Needs? Let’s Find Out',
    'The Right Solution Starts With One Simple Quiz',
    'Find Out What Your Business Actually Needs',
    'Stop Guessing. Start With the Right Solution',
    'Your Business Is Unique. Your Solution Should Be Too'
  ],
  action: [
    'Find Your Perfect Business Setup in Minutes',
    'Take the Quiz. Get the Right Solution.',
    'Discover the Right Tools for Your Business Today',
    'Get a Custom Business Solution in Just a Few Clicks',
    'Start Your Custom Business Plan Now'
  ],
  trust: [
    'Finally. A Solution Built for Your Type of Business',
    'No Guesswork. No Judgement. Just the Right Setup',
    'We Help Businesses Others Turn Away',
    'A Smarter Way to Get Approved and Set Up Right',
    'Built to Support Businesses Like Yours'
  ]
} as const;

export function getQuizPromptSet() {
  return {
    curiosity: quizMessaging.curiosity[0],
    action: quizMessaging.action[1],
    trust: quizMessaging.curiosity[4]
  };
}

export function getHighRiskQuizPromptSet() {
  return {
    curiosity: quizMessaging.trust[2],
    action: quizMessaging.trust[3],
    trust: quizMessaging.trust[1]
  };
}
