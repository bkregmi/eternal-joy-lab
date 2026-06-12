import React from 'react';

/**
 * A compact, horizontal scrolling tab navigation for Pranayama types.
 * 
 * @param {Array} items - Array of objects containing id and title
 * @param {string} activeId - The ID of the currently selected pranayama
 * @param {function} onSelect - Callback when a new type is selected
 */
const PranayamaTabs = ({ items, activeId, onSelect }) => {
  return (
    <div className="w-full bg-white dark:bg-gray-900 sticky top-0 z-10 border-b dark:border-gray-800">
      <div 
        className="flex overflow-x-auto py-3 px-4 gap-2 no-scrollbar"
        style={{ 
          msOverflowStyle: 'none', 
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch' 
        }}
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`
              flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200
              ${activeId === item.id 
                ? 'bg-orange-600 text-white shadow-md scale-105' 
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}
            `}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Hidden style to ensure scrollbars are removed across browsers */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default PranayamaTabs;