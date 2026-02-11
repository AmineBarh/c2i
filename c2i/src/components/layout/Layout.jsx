import React from 'react';
import Navbar from '../../component/navbar';
import Footer from '../../component/Footer'; // Assuming Footer exists or will exist, if not I'll check. Wait, App.js doesn't import Footer.

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
