import React from 'react';

const Tabs = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 rounded-xl bg-gray-100 p-1">
            {tabs.map((tab, index) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`
            w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all
            ${index < tabs.length - 1 ? 'border-b border-gray-200 sm:border-0' : ''}
            ${activeTab === tab.id
                            ? 'bg-white text-blue-700 shadow'
                            : 'text-gray-500 hover:bg-white/[0.12] hover:text-blue-600'
                        }
          `}
                >
                    {tab.label}
                    {tab.count !== undefined && (
                        <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${activeTab === tab.id ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-600'
                            }`}>
                            {tab.count}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
