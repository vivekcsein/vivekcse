import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="root relative">
        <div className="root-container">
          <div className="wrapper">{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
