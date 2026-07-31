import React from 'react';
import { motion } from 'framer-motion';

// Two soft, slowly-drifting gradient glows used as ambient section decoration.
// `variant` adjusts opacity for sections that want a subtler presence.
const FloatingOrbs = ({ variant = 'default' }) => {
  const orbClasses =
    variant === 'subtle'
      ? {
          first: 'bg-primary-200/10 dark:bg-primary-800/10',
          second: 'bg-accent-200/10 dark:bg-accent-800/10',
        }
      : {
          first: 'bg-primary-200/20 dark:bg-primary-800/20',
          second: 'bg-accent-200/20 dark:bg-accent-800/20',
        };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{ x: [0, 50, -20, 0], y: [0, -40, 25, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${orbClasses.first}`}
      />
      <motion.div
        animate={{ x: [0, -40, 30, 0], y: [0, 30, -25, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${orbClasses.second}`}
      />
    </div>
  );
};

export default FloatingOrbs;
