import React from "react";
import "./Footer.css"

function Footer() {
    return (
        <footer>
            <hr />
            <div className="footerContainer">
                <div>
                    <img
                        src="../SparksBankLogo2_Transparent.png"
                        alt="Sparks Bank Logo"
                        className="logo-footer"
                    />
                    <p>&copy; {new Date().getFullYear()} Sparks Bank</p>
                </div>
                <div>
                    <ul className="socialLogos">
                        <li>
                            <a href="https://www.linkedin.com/in/abhishek-verma-05177625b" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="blue" class="bi bi-linkedin" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/AbhishekX2004" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/xx_abhishek_verma_xx" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512" id="instagram"><linearGradient id="a" x1="255.531" x2="255.531" y1="117.176" y2="406.065" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ea8928"></stop><stop offset="1" stop-color="#cf2b8f"></stop></linearGradient><path fill="url(#a)" d="M326.1 104.1H185c-47.9 0-86.9 39-86.9 86.9v141c0 47.9 39 86.9 86.9 86.9h141c47.9 0 86.9-39 86.9-86.9V191c0-47.9-38.9-86.9-86.8-86.9zm58.9 228c0 32.5-26.4 58.9-58.9 58.9H185c-32.5 0-58.9-26.4-58.9-58.9V191c0-32.5 26.4-58.9 58.9-58.9h141c32.5 0 58.9 26.4 58.9 58.9l.1 141.1z"></path><linearGradient id="b" x1="255.531" x2="255.531" y1="117.176" y2="406.065" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ea8928"></stop><stop offset="1" stop-color="#cf2b8f"></stop></linearGradient><path fill="url(#b)" d="M255.5 180.4c-44.7 0-81.1 36.4-81.1 81.1 0 44.7 36.4 81.1 81.1 81.1s81.1-36.4 81.1-81.1c0-44.7-36.3-81.1-81.1-81.1zm0 134.3c-29.3 0-53.2-23.9-53.2-53.2 0-29.3 23.9-53.2 53.2-53.2s53.2 23.9 53.2 53.2c0 29.4-23.8 53.2-53.2 53.2z"></path><linearGradient id="c" x1="340.043" x2="340.043" y1="117.176" y2="406.065" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ea8928"></stop><stop offset="1" stop-color="#cf2b8f"></stop></linearGradient><path fill="url(#c)" d="M340 156.7c-5.4 0-10.7 2.2-14.5 6-3.8 3.8-6 9.1-6 14.5s2.2 10.7 6 14.5c3.8 3.8 9.1 6 14.5 6s10.7-2.2 14.5-6c3.8-3.8 6-9.1 6-14.5s-2.2-10.7-6-14.5c-3.8-3.8-9.1-6-14.5-6z"></path></svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;