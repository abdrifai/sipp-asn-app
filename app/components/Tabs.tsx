"use client";
import { useState } from "react";

const Tabs = ({ children }: any) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (e: any, newActiveTab: any) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className="mx-auto w-full">
      <div className="flex border-b border-white bg-gray-200 rounded-t-lg">
        {children.map((child: any) => (
          <button
            key={child.props.label}
            className={`${
              activeTab === child.props.label
                ? "border-t-2 border-gray-300 border-l-2 border-r-2 bg-white rounded-t-lg"
                : ""
            } flex-1 text-gray-700 font-medium py-2`}
            onClick={(e) => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="py-0">
        {children.map((child: any) => {
          if (child.props.label === activeTab) {
            return (
              <div
                key={child.props.label}
                className="border-b-2 border-r-2 border-l-2 p-3 border-gray-300"
              >
                {child.props.children}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

const Tab = ({ label, children }: any) => {
  return (
    <div key={label} className="hidden">
      {children}
    </div>
  );
};

export { Tabs, Tab };
