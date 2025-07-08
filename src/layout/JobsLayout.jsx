import React from "react";

const JobsLayout = ({ children, leftComponents = [] }) => {
  return (
    <div className="container mx-auto px-2 sm:px-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Sidebar */}
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-16 space-y-4">
            {leftComponents.map((component, index) => (
              <React.Fragment key={index}>{component}</React.Fragment>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-12 w-full lg:col-span-9">{children}</main>
      </div>
    </div>
  );
};

export default JobsLayout;
