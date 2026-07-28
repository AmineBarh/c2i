import React from 'react';
import Navbar from '../../component/navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <main className="flex-grow pt-16">
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;
