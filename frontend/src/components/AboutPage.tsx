import "./styles/AboutPage.css";
import DeveloperAvatar from "../assets/pictures/my-image.png";
import { GithubIcon, EmailIcon, LinkedInIcon, TwitterIcon } from "./SvgIcons";

function AboutPage() {
    return (
        <div id="AboutPage">
            <h1 id="about-page-head">Hi There👋!</h1>
            <br />
            <p id="welcome-text">Welcome to the NASA Space Gallery.</p>

            <p className="project-desc">
                This is a{" "}
                <span className="project-tech">
                    React.js + Typescript + Express.js
                </span>{" "}
                project that utilises the various NASA and Google Earth Engine
                APIs to present geographical and astronomical data in a clean
                and organised format. I have spent countless hours in this
                project to make sure that this Gallery provides a neat and
                intuitive UI for accessing the awesome imagery hosted by NASA
                and Google.
            </p>

            <p className="project-desc">
                I created this project mainly to showcase my full-stack
                development skills and my experience in working with external
                APIs. The front-end is composed of a barebones HTML file which
                is populated through React hydration. I have used react-router
                to manage the client-side navigation. The backend is powered by
                an Express.js server running on Node.js. The backend provides a
                custom API through which the front-end fetches the data.
            </p>

            <p className="project-desc">
                This project uses the following APIs:
            </p>

            <ul className="about-api-list">
                <li className="about-api-item">
                    NASA APOD (Astronomy Picture of the Day) API
                </li>
                <li className="about-api-item">
                    NASA Image and Video Library API
                </li>
                <li className="about-api-item">NASA Mars Rover Photos API</li>
                <li className="about-api-item">Google Maps Static API</li>
            </ul>

            <p className="project-desc">
                Working in this project has been an a great learning experience.
                It has given me a deep appreciation for the effort that goes
                into building features we often take for granted on websites. I
                am truly happy for taking the initiative to start this project,
                as it has taught me invaluable lessons. This was my first
                full-stack project, and I am proud of the work I’ve done. While
                the website may be a little rough around the edges, especially
                the design part, functionality-wise it is quite robust.
            </p>

            <p className="project-desc">
                Thank you, my anonymous visitor, for taking the time to view my
                project. I wish that you have had a satisfactory experience
                using this website. Please do let me know if there are any
                shortcomings you come to find. I would really love to hear about
                your experience using my website. As always, I'll be available
                at my{" "}
                <a
                    href="https://www.linkedin.com/in/prantaneel-pegu/"
                    id="footer-portfolio-link"
                    target="_blank"
                >
                    LinkedIn
                </a>
                . Bye!
            </p>

            <div id="devcard-and-socials">
                <div id="about-developer-card">
                    <div id="adc-avatar-container">
                        <img
                            src={DeveloperAvatar}
                            alt="A picture of me."
                            id="adc-avatar"
                        />
                    </div>

                    <p id="adc-handle">
                        <a
                            href="https://x.com/PrantaneelPegu"
                            className="adc-handle-link"
                            target="_blank"
                        >
                            @Prantaneel Pegu
                        </a>
                    </p>
                </div>

                <div id="about-socials">
                    <div id="about-socials-container">
                        <a
                            href="https://github.com/Prantaneel-Pegu"
                            className="about-social-link"
                            target="_blank"
                        >
                            <GithubIcon classNames="about-social-icon" />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/prantaneel-pegu/"
                            className="about-social-link"
                            target="_blank"
                        >
                            <LinkedInIcon classNames="about-social-icon" />
                        </a>

                        <a
                            href="https://x.com/PrantaneelPegu"
                            className="about-social-link"
                            target="_blank"
                        >
                            <TwitterIcon classNames="about-social-icon" />
                        </a>

                        <a
                            href="mailto:contact@prantaneelpegu.com"
                            className="about-social-link"
                            target="_blank"
                        >
                            <EmailIcon classNames="about-social-icon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
