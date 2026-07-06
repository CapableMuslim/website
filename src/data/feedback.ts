export const feedbackConfig = {
    /** Formspree or compatible endpoint — set PUBLIC_FEEDBACK_FORM_ACTION in .env */
    formAction: import.meta.env.PUBLIC_FEEDBACK_FORM_ACTION ?? '',

    initialTitle: 'Was this article helpful?',

    yesTitle: 'Please tell us what helped you',
    yesSubtext: 'Your feedback helps improve future content on The Capable Muslim.',

    noTitle: 'Help us improve this article',
    noSubtext:
        'Your feedback helps improve clarity, structure, and usefulness of future content.',

    trustNote: 'We do not provide medical or religious rulings.',

    issueOptions: [
        'My questions were not answered',
        'Content was hard to understand',
        'Information was unclear or poorly structured',
        'I noticed an issue or inaccuracy',
        'Other',
    ] as const,

    newsletterLabel:
        'Subscribe to The Capable Muslim newsletter for new articles and updates',

    submitLabel: 'Submit Feedback',
    successMessage: 'Thank you for your feedback.',
} as const;

export type FeedbackIssue = (typeof feedbackConfig.issueOptions)[number];
