import React from "react";

const MainLayout = ({ children, leftComponents = [], rightComponents = [] }) => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Sidebar */}
        <aside className="hidden lg:col-span-3 lg:block">
          <div className=" top-18 space-y-4">
            {leftComponents.map((component, index) => (
              <React.Fragment key={index}>{component}</React.Fragment>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-12 lg:col-span-6">{children}</main>

        {/* Right Sidebar */}
        <aside className="hidden lg:col-span-3 lg:block">
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
