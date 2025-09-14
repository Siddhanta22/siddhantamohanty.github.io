import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote as QuoteIcon, Sparkles } from 'lucide-react';

const Quote = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const quotes = [
    {
      text: "Code is like humor. When you have to explain it, it's bad.",
      author: "Cory House",
      type: "funny"
    },
    {
      text: "The best error message is the one that never shows up.",
      author: "Thomas Fuchs",
      type: "motivational"
    },
    {
      text: "First, solve the problem. Then, write the code.",
      author: "John Johnson",
      type: "wisdom"
    },
    {
      text: "Programming isn't about what you know; it's about what you can figure out.",
      author: "Chris Pine",
      type: "motivational"
    },
    {
      text: "The only way to learn a new programming language is by writing programs in it.",
      author: "Dennis Ritchie",
      type: "wisdom"
    }
  ];

  // Select a random quote
  const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const getQuoteStyle = (type) => {
    switch (type) {
      case 'funny':
        return {
          bgGradient: "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
          borderColor: "border-yellow-200 dark:border-yellow-800",
          textColor: "text-yellow-800 dark:text-yellow-200",
          iconColor: "text-yellow-600 dark:text-yellow-400"
        };
      case 'motivational':
        return {
          bgGradient: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
          borderColor: "border-blue-200 dark:border-blue-800",
          textColor: "text-blue-800 dark:text-blue-200",
          iconColor: "text-blue-600 dark:text-blue-400"
        };
      case 'wisdom':
        return {
          bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
          borderColor: "border-purple-200 dark:border-purple-800",
          textColor: "text-purple-800 dark:text-purple-200",
          iconColor: "text-purple-600 dark:text-purple-400"
        };
      default:
        return {
          bgGradient: "from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20",
          borderColor: "border-gray-200 dark:border-gray-800",
          textColor: "text-gray-800 dark:text-gray-200",
          iconColor: "text-gray-600 dark:text-gray-400"
        };
    }
  };

  const quoteStyle = getQuoteStyle(selectedQuote.type);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-accent-50 dark:from-dark-800 dark:to-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`bg-gradient-to-br ${quoteStyle.bgGradient} rounded-3xl shadow-2xl border ${quoteStyle.borderColor} p-8 md:p-12 relative overflow-hidden`}
          >
            {/* Floating sparkles */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-4 right-4"
            >
              <Sparkles className={`w-6 h-6 ${quoteStyle.iconColor} opacity-60`} />
            </motion.div>
            
            <motion.div
              animate={{ 
                rotate: -360,
                scale: [1, 0.9, 1]
              }}
              transition={{ 
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute bottom-4 left-4"
            >
              <Sparkles className={`w-4 h-4 ${quoteStyle.iconColor} opacity-40`} />
            </motion.div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-6"
              >
                <QuoteIcon className={`w-12 h-12 ${quoteStyle.iconColor} mx-auto`} />
              </motion.div>

              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className={`text-2xl md:text-3xl font-medium ${quoteStyle.textColor} leading-relaxed mb-8 italic`}
              >
                "{selectedQuote.text}"
              </motion.blockquote>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center justify-center space-x-2"
              >
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-50"></div>
                <cite className={`text-lg font-semibold ${quoteStyle.textColor} not-italic`}>
                  — {selectedQuote.author}
                </cite>
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-50"></div>
              </motion.div>
            </div>

            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent"></div>
            </div>
          </motion.div>

          {/* Fun subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-lg text-gray-600 dark:text-gray-400"
          >
            Because every great developer needs a little inspiration (and humor) along the way ✨
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Quote;
