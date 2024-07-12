import './styles/Copyright.css';
import { GithubIcon, IndeedIcon, LinkedInIcon, TwitterIcon } from './SvgIcons';
import FooterAvatarImg from '../assets/pictures/kookie.jpg';
import FooterRocketImg from '../assets/pictures/rocket.png';

function Copyright () {
    return (
        <footer id="Copyright">     
            <p id="footer-project-name">
                NASA SPACE GALLERY
            </p>

            <div id="footer-desc">
                <p id="footer-desc-p">
                    Hi there👋! This is a project I created for my portfolio. Take a look at my other projects <a href="https://github.com/Prantaneel-Pegu/Portfolio" id="footer-portfolio-link">here</a>.
                </p>
            </div>

            <div id="footer-developer-card">
                <div id="fdc-avatar-container">
                    <img src={FooterAvatarImg} alt="A picture of me" id="fdc-avatar" />
                </div>
                <p id="footer-developer-handle">
                    @Prantaneel Pegu
                </p>
            </div>

            <div id="footer-useful-links">
                <p id="ful-head">
                    Useful Links:
                </p>

                <div id="ful-container">
                    <a href="https://api.nasa.gov/" className="ful-link">
                        <p className="ful-link-text">NASA APIs Page</p>
                    </a>
                    
                    <a href="https://images.nasa.gov/" className="ful-link">
                        <p className="ful-link-text">NASA Multimedia Library</p>
                    </a>

                    <a href="https://developers.google.com/earth-engine" className="ful-link">
                        <p className="ful-link-text">Google Earth Engine</p>
                    </a>
                </div>
            </div>

            <div id="footer-socials">
                <p id="footer-socials-head">Follow me:</p>
                <div id="footer-socials-container">
                    <a href="" className="footer-social-link">
                        {/* <img src={GithubIcon} alt="Github Icon" className="fsl-icon" /> */}
                        <GithubIcon classNames="fsl-icon" />
                    </a>

                    <a href="" className="footer-social-link">
                        <TwitterIcon classNames="fsl-icon" />
                    </a>

                    <a href="" className="footer-social-link">
                        <LinkedInIcon classNames="fsl-icon" />
                    </a>

                    <a href="" className="footer-social-link">
                        <IndeedIcon classNames="fsl-icon" />
                    </a>
                </div>
            </div>

            <div id="footer-container-img1">
                <img src={FooterRocketImg} alt="A picture of a rocket" id="footer-img-1" />
            </div>

            <p id="footer-copyright">
                © Prantaneel Pegu, 2024. All rights reserved.
            </p>
        </footer>
    )
}

export default Copyright;