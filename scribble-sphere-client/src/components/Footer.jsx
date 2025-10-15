import React from "react";

function Footer(){
    return (
        <footer className="absolute text-center bottom-0 w-full h-8">
            <p className="text-yellow-500">
                Copyright {new Date().getFullYear()}
            </p>
        </footer>
    );
}
export default Footer;