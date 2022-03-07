import React from "react";
import './header.css';


function Header(props) {
    return (
        <header id="custom_header" class="p-1 bg-dark text-white">
            <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="www.google.com" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                <h1>Trial By Combat</h1>
                </a>
                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li><a href="www.google.com" class="nav-link px-2 text-white">Challenge Board</a></li>
                <li><a href="www.google.com" class="nav-link px-2 text-white">About</a></li>
                </ul>
            </div>
            </div>
        </header>
    );
}

export default Header;
