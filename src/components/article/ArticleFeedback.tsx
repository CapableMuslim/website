import { useState, type FormEvent } from 'react';
import { feedbackConfig } from '../../data/feedback';

type Props = {
    articleSlug: string;
    articleTitle: string;
};

type Branch = 'initial' | 'yes' | 'no' | 'success';

export default function ArticleFeedback({ articleSlug, articleTitle }: Props) {
    const [branch, setBranch] = useState<Branch>('initial');
    const [helpful, setHelpful] = useState<'yes' | 'no' | null>(null);
    const [issues, setIssues] = useState<string[]>([]);
    const [feedbackText, setFeedbackText] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newsletter, setNewsletter] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const toggleIssue = (issue: string) => {
        setIssues((prev) =>
            prev.includes(issue) ? prev.filter((i) => i !== issue) : [...prev, issue],
        );
    };

    const selectBranch = (value: 'yes' | 'no') => {
        setHelpful(value);
        setBranch(value);
        setError('');
    };

    const resetToInitial = () => {
        setBranch('initial');
        setHelpful(null);
        setIssues([]);
        setFeedbackText('');
        setName('');
        setEmail('');
        setNewsletter(false);
        setError('');
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (helpful === 'no' && issues.length === 0) {
            setError('Please select at least one option.');
            return;
        }

        const payload = {
            article_slug: articleSlug,
            article_title: articleTitle,
            helpful: helpful ?? '',
            issues: issues.join('; '),
            feedback_text: feedbackText,
            name,
            email,
            newsletter_opt_in: newsletter ? 'yes' : 'no',
            _subject: `Article feedback: ${articleTitle}`,
        };

        if (!feedbackConfig.formAction) {
            setBranch('success');
            return;
        }

        setSubmitting(true);
        try {
            const body = new FormData();
            Object.entries(payload).forEach(([key, value]) => body.append(key, value));
            body.append('_gotcha', '');

            const res = await fetch(feedbackConfig.formAction, {
                method: 'POST',
                body,
                headers: { Accept: 'application/json' },
            });

            if (!res.ok) throw new Error('Submission failed');
            setBranch('success');
        } catch {
            setError('Something went wrong. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    if (branch === 'success') {
        return (
            <section className="article-feedback" aria-live="polite">
                <p className="article-feedback__success">{feedbackConfig.successMessage}</p>
            </section>
        );
    }

    if (branch === 'initial') {
        return (
            <section className="article-feedback" aria-labelledby="article-feedback-heading">
                <h2 id="article-feedback-heading" className="article-feedback__title">
                    {feedbackConfig.initialTitle}
                </h2>
                <div className="article-feedback__choices">
                    <button
                        type="button"
                        className="article-feedback__choice"
                        onClick={() => selectBranch('yes')}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        className="article-feedback__choice"
                        onClick={() => selectBranch('no')}
                    >
                        No
                    </button>
                </div>
                <p className="article-feedback__trust">{feedbackConfig.trustNote}</p>
            </section>
        );
    }

    const isYes = branch === 'yes';

    return (
        <section className="article-feedback" aria-labelledby="article-feedback-form-heading">
            <button
                type="button"
                className="article-feedback__back"
                onClick={resetToInitial}
            >
                ← Back
            </button>

            <h2 id="article-feedback-form-heading" className="article-feedback__title">
                {isYes ? feedbackConfig.yesTitle : feedbackConfig.noTitle}
            </h2>
            <p className="article-feedback__subtext">
                {isYes ? feedbackConfig.yesSubtext : feedbackConfig.noSubtext}
            </p>

            <form className="article-feedback__form" onSubmit={handleSubmit} noValidate>
                <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    className="sr-only"
                    aria-hidden="true"
                />

                {isYes && (
                    <div>
                        <label htmlFor="feedback-positive" className="article-feedback__label">
                            What was most useful? <span className="text-parchment-400">(optional)</span>
                        </label>
                        <textarea
                            id="feedback-positive"
                            className="input-field min-h-[6rem] resize-y"
                            placeholder="What helped you most from this article?"
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            rows={3}
                        />
                    </div>
                )}

                {!isYes && (
                    <>
                        <fieldset className="article-feedback__fieldset">
                            <legend className="article-feedback__label">
                                Please select what went wrong
                            </legend>
                            <ul className="article-feedback__checks">
                                {feedbackConfig.issueOptions.map((issue) => (
                                    <li key={issue}>
                                        <label className="article-feedback__check-label">
                                            <input
                                                type="checkbox"
                                                checked={issues.includes(issue)}
                                                onChange={() => toggleIssue(issue)}
                                                className="article-feedback__checkbox"
                                            />
                                            <span>{issue}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </fieldset>

                        <div>
                            <label htmlFor="feedback-improve" className="article-feedback__label">
                                Please tell us how we can improve{' '}
                                <span className="text-parchment-400">(optional)</span>
                            </label>
                            <textarea
                                id="feedback-improve"
                                className="input-field min-h-[6rem] resize-y"
                                placeholder="What was missing or unclear? What should be improved?"
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                rows={4}
                            />
                        </div>
                    </>
                )}

                <div className="article-feedback__row">
                    <div>
                        <label htmlFor="feedback-name" className="article-feedback__label">
                            Your Name <span className="text-parchment-400">(optional)</span>
                        </label>
                        <input
                            id="feedback-name"
                            type="text"
                            className="input-field"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="feedback-email" className="article-feedback__label">
                            Your Email <span className="text-parchment-400">(optional)</span>
                        </label>
                        <input
                            id="feedback-email"
                            type="email"
                            className="input-field"
                            autoComplete="email"
                            placeholder="For updates on new content"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <label className="article-feedback__check-label article-feedback__newsletter">
                    <input
                        type="checkbox"
                        checked={newsletter}
                        onChange={(e) => setNewsletter(e.target.checked)}
                        className="article-feedback__checkbox"
                    />
                    <span>{feedbackConfig.newsletterLabel}</span>
                </label>

                {error && (
                    <p className="article-feedback__error" role="alert">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="btn-primary article-feedback__submit"
                    disabled={submitting}
                >
                    {submitting ? 'Submitting…' : feedbackConfig.submitLabel}
                </button>
            </form>

            <p className="article-feedback__trust">{feedbackConfig.trustNote}</p>
        </section>
    );
}
