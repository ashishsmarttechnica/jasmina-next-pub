import React from "react";

const MainLayout = ({ children, leftComponents = [], rightComponents = [] }) => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-18 space-y-4">
            {leftComponents.map((component, index) => (
              <React.Fragment key={index}>{component}</React.Fragment>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-6 col-span-12">{children}</main>

        {/* Right Sidebar */}
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-18 space-y-4">
            {rightComponents.map((component, index) => (
              <React.Fragment key={index}>{component}</React.Fragment>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MainLayout;
