import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';



import { pillarsData } from '../data/pillars';

const NAV_DATA = pillarsData.map(pillar => ({
    id: pillar.slug,
    label: pillar.name,
    href: pillar.slug === 'bookshelf' ? '/bookshelf' : `/pillars/${pillar.slug}`,
    subpillars: pillar.subpillars,
}));



export default function Navigation() {
    const [activeId, setActiveId] = useState<string | null>(null);
    const timeoutRef = useRef<any | null>(null);

    const handleMouseEnter = (id: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        // Don't show dropdown for bookshelf
        if (id === 'bookshelf') {
            setActiveId(null);
        } else {
            setActiveId(id);
        }
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveId(null);
        }, 150);
    };

    const activeCategory = NAV_DATA.find(item => item.id === activeId);

    return (
        <nav className="hidden xl:block" onMouseLeave={handleMouseLeave}>

            <ul className="flex items-center space-x-8">
                {NAV_DATA.map(item => (
                    <li key={item.id} className="relative py-5">
                        <a
                            href={item.href}
                            className={`text-xs font-extrabold transition-colors uppercase tracking-[0.1em] ${
                                item.id === 'bookshelf' 
                                    ? 'text-white hover:text-primary-500' 
                                    : activeId === item.id 
                                        ? 'text-primary-500' 
                                        : 'text-white hover:text-primary-500'
                            }`}
                            onMouseEnter={() => handleMouseEnter(item.id)}
                        >
                            {item.label}
                        </a>

                        {activeId === item.id && item.id !== 'bookshelf' && (
                            <motion.div
                                layoutId="navIndicator"
                                className="absolute bottom-6 left-0 right-0 h-0.5 bg-primary-500 shadow-glow"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            />
                        )}
                    </li>
                ))}
            </ul>


            <AnimatePresence>
                {activeCategory && (
                    <motion.div
                        key="dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 right-0 top-full w-full bg-[#0a0a0a] border-t border-b border-white/10 shadow-2xl z-40"
                        onMouseEnter={() => {
                            if (timeoutRef.current) clearTimeout(timeoutRef.current);
                        }}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="container mx-auto px-6 py-6">

                            <div className="flex justify-center space-x-8 mb-6 pb-4">
                                {activeCategory.subpillars.map((sub, idx) => (
                                    <a
                                        key={idx}
                                        href={`${activeCategory.href}/${sub.toLowerCase().replace(/ /g, '-')}`}
                                        className="text-xs font-bold text-white/60 hover:text-white transition-colors uppercase tracking-widest"
                                    >
                                        {sub}
                                    </a>
                                ))}
                            </div>

                            <div className="flex justify-center mt-6">
                                <a
                                    href={activeCategory.href}
                                    className="inline-flex items-center text-xs font-black text-primary-600 hover:text-white transition-colors uppercase tracking-[0.2em] group"
                                >
                                    Browse All {activeCategory.label.toLowerCase()}
                                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">›››</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
