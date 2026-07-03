import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_DATA = [
    {
        q: "1. Do you accept guest articles or external content submissions?",
        a: "No. Inner Fire content is curated, structured, and systematized under a single framework. Allowing external submissions would dilute consistency, clarity, and implementation quality. All content is produced internally or explicitly commissioned."
    },
    {
        q: "2. Can I ask you for personal life advice?",
        a: "No. We do not provide individualized life coaching through public channels. Our systems are designed to be self-explanatory and widely applicable. If you require specific, tailored guidance, apply for our mentorship programs."
    },
    {
        q: "3. I know a lot already. Why would I still use Inner Fire?",
        a: "Knowledge is potential power; execution is real power. You likely know *what* to do, but you aren't doing it consistently. Inner Fire isn't just information—it's an accountability architecture. We bridge the gap between knowing principles and living them."
    },
    {
        q: "4. Is Inner Fire motivational content?",
        a: "Absolutely not. Motivation is a fleeting emotion. We build systems. We are interested in what you do when you are *not* motivated. Our content is technical, prescriptive, and demanding."
    },
    {
        q: "5. Is Inner Fire only about masculinity and mindset?",
        a: "No. While masculine frames of reference are central, our vertical stack covers Health (biology), Wealth (economics), Social (dynamics), and Skill (competence). Mindset is the software, but you need hardware (health) and network connections (social) to operate."
    },
    {
        q: "6. Why is Inner Fire only for men?",
        a: "Men and women face fundamentally different biological and social realities. Trying to create a 'one-size-fits-all' protocol serves no one. We specialize in the male experience—testosterone optimization, hierarchical dynamics, and the burden of performance—to provide the highest fidelity guidance possible."
    },
    {
        q: "7. Is Inner Fire political, religious, or ideological?",
        a: "We are pragmatists. We do not care about your politics or religion unless they interfere with your ability to perform. We operate on biological and psychological realism. If a principle works, we use it. If it doesn't, we discard it."
    },
    {
        q: "8. Do you sell courses, coaching, or mentorship?",
        a: "Yes. While our core philosophy is open-source, we offer accelerated implementation programs, private communities, and direct access mentorship for those who want to compress decades of learning into months."
    },
    {
        q: "9. Can I promote my product, service, or brand on Inner Fire?",
        a: "Generally, no. We protect our community's attention aggressively. Unless we have personally vetted your product and believe it acts as a force multiplier for our users, we do not allow promotion."
    },
    {
        q: "10. What makes Inner Fire different from blogs, newsletters, or YouTube channels?",
        a: "Most content is designed to be *consumed*. Inner Fire is designed to be *used*. We don't want you to binge-read our articles; we want you to implement the protocol and leave. We optimize for 'Time to Action', not 'Time on Site'."
    },
    {
        q: "11. Is Inner Fire beginner-friendly?",
        a: "Yes, but the learning curve is steep. We do not water down the truth. We provide on-ramps for beginners (Base Protocols), but the standard is high. We expect you to rise to the challenge, not for the challenge to lower itself to you."
    },
    {
        q: "12. What happens if I stop using Inner Fire?",
        a: "You revert to your baseline. The world is constantly pulling you toward comfort and mediocrity. Inner Fire acts as a counter-force. Stop applying the force, and entropy takes over."
    },
    {
        q: "13. Do I need to use every feature (trackers, AI, forum, etc.)?",
        a: "No. Take what is useful, discard what is not. Some men need the trackers for accountability; others just need the philosophy. Use the tool; don't let the tool use you."
    },
    {
        q: "14. Can Inner Fire become an obsession or perfection trap?",
        a: "It can, if you misunderstand the goal. The goal is not to have a perfect 'score' on our trackers; the goal is to win in real life. If optimizing your spreadsheet is taking time away from building your business or raising your kids, you are doing it wrong."
    },
    {
        q: "15. Is Inner Fire for already disciplined men or lost men?",
        a: "Both. The lost man needs a map. The disciplined man needs a sharper sword. We provide the map for the former and the whetstone for the latter."
    },
    {
        q: "16. Will Inner Fire tell me exactly what to do every day?",
        a: "We provide protocols (e.g., 'Morning Light', 'Deep Work Block'), but we do not micromanage your life. You must retain agency. We give you the compass and the map; you must walk the path."
    },
    {
        q: "17. Is there a community aspect?",
        a: "Yes. We believe isolation is the enemy of excellence. Our private forums and local chapters allow you to connect with other men who are on the same frequency. Iron sharpens iron."
    },
    {
        q: "18. Who is Inner Fire not for?",
        a: "Victims. If you believe your problems are someone else's fault, or that the world owes you something, you will hate it here. We demand radical responsibility."
    },
    {
        q: "19. Who founded Inner Fire?",
        a: "Inner Fire was founded by a collective of high-performers from military, athletic, and entrepreneurial backgrounds who were tired of the 'hustle porn' and 'feel-good' advice that dominates the internet."
    },
    {
        q: "20. What is the core promise of Inner Fire?",
        a: "That your time will not be wasted. Every interaction with the platform must either clarify, simplify, or move you to action."
    },
    {
        q: "21. What should I do before contacting Inner Fire?",
        a: "Search the platform. Read the FAQ. Use the system. If your question is already answered, it will not receive a reply."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-4">
            {FAQ_DATA.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div
                        key={index}
                        className={`border rounded-xl transition-all duration-300 overflow-hidden ${isOpen ? 'bg-brand-900/70 border-primary-900/40 shadow-[0_0_15px_-5px_rgba(249,115,22,0.1)]' : 'bg-transparent border-brand-800/40 hover:border-brand-800/60'}`}
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex items-center justify-between p-6 text-left group focus:outline-none"
                        >
                            <h3 className={`font-bold text-sm lg:text-base pr-8 transition-colors ${isOpen ? 'text-primary-50' : 'text-primary-400 group-hover:text-primary-200'}`}>
                                {item.q}
                            </h3>
                            <span className={`flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'text-gold-300 rotate-0' : 'text-primary-600 -rotate-90'}`}>
                                {isOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                )}
                            </span>
                        </button>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                >
                                    <div className="border-l-2 border-primary-600 ml-6 pl-6 mb-6">
                                        <p className="text-primary-400 text-sm leading-relaxed max-w-3xl">
                                            {item.a}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
