import "./styles/Copyright.css";
import { GithubIcon, EmailIcon, LinkedInIcon, TwitterIcon } from "./SvgIcons";
import FooterAvatarImg from "../assets/pictures/my-image.png";
import FooterRocketImg from "../assets/pictures/rocket.png";

function Copyright() {
    return (
        <footer id="Copyright">
            <p id="footer-project-name">NASA SPACE GALLERY</p>

            <div id="footer-desc">
                <p id="footer-desc-p">
                    Hi there 👋! This is a project I created for my portfolio.
                    You can check out my other projects on{" "}
                    <a
                        href="https://prantaneelpegu.com"
                        id="footer-portfolio-link"
                        target="_blank"
                    >
                        my website
                    </a>
                    .
                </p>
            </div>

            <div id="footer-developer-card">
                <div id="fdc-avatar-container">
                    <img
                        src={FooterAvatarImg}
                        alt="A picture of me"
                        id="fdc-avatar"
                    />
                </div>
                <p id="footer-developer-handle">
                    <a
                        href="https://x.com/PrantaneelPegu"
                        className="footer-dev-handle-link"
                        target="_blank"
                    >
                        <span>@</span>
                        <span
                            style={{
                                marginLeft: "0.175em",
                                marginTop: "0.1em",
                            }}
                        >
                            Prantaneel Pegu
                        </span>
                    </a>
                </p>
            </div>

            <div id="footer-useful-links">
                <p id="ful-head">Useful Links:</p>

                <div id="ful-container">
                    <a
                        href="https://api.nasa.gov/"
                        className="ful-link"
                        target="_blank"
                    >
                        <p className="ful-link-text">NASA APIs Listing</p>
                    </a>

                    <a
                        href="https://images.nasa.gov/"
                        className="ful-link"
                        target="_blank"
                    >
                        <p className="ful-link-text">NASA Multimedia Library</p>
                    </a>

                    <a
                        href="https://developers.google.com/earth-engine"
                        className="ful-link"
                        target="_blank"
                    >
                        <p className="ful-link-text">Google Earth Engine</p>
                    </a>
                </div>
            </div>

            <div id="footer-socials">
                <p id="footer-socials-head">Contact me:</p>
                <div id="footer-socials-container">
                    <a
                        href="https://github.com/Prantaneel-Pegu"
                        className="footer-social-link"
                        target="_blank"
                    >
                        <GithubIcon classNames="fsl-icon" />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/prantaneel-pegu/"
                        className="footer-social-link"
                        target="_blank"
                    >
                        <LinkedInIcon classNames="fsl-icon" />
                    </a>

                    <a
                        href="https://x.com/PrantaneelPegu"
                        className="footer-social-link"
                        target="_blank"
                    >
                        <TwitterIcon classNames="fsl-icon" />
                    </a>

                    <a
                        href="mailto:contact@prantaneelpegu.com"
                        className="footer-social-link"
                        target="_blank"
                    >
                        <EmailIcon classNames="fsl-icon" />
                    </a>
                </div>
            </div>

            <div id="footer-container-img1">
                <img
                    src={FooterRocketImg}
                    alt="A picture of a rocket"
                    id="footer-img-1"
                />
            </div>

            <p id="footer-copyright">
                © Prantaneel Pegu, {new Date().getFullYear()}. All rights
                reserved.
            </p>
        </footer>
    );
}

export default Copyright;
