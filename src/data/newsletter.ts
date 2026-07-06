export const newsletterConfig = {
    /** Beehiiv, Formspree, or compatible endpoint — set PUBLIC_NEWSLETTER_FORM_ACTION in .env */
    formAction: import.meta.env.PUBLIC_NEWSLETTER_FORM_ACTION ?? '',

    sidebarTitle: 'Subscribe to Newsletter',
    sidebarDescription: 'Weekly guidance for building a disciplined and capable life.',
    submitLabel: 'Subscribe',
    footnote: 'Free. Unsubscribe anytime.',
} as const;
