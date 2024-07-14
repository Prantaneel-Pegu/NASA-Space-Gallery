import './styles/AboutPage.css';
import DeveloperAvatar from '../assets/pictures/kookie.jpg';
import { GithubIcon, IndeedIcon, LinkedInIcon, TwitterIcon } from './SvgIcons';

function AboutPage() {
  return (
    <div id="AboutPage">
        <h1 id="about-page-head">Hi There👋!</h1>
        <br />
        <p id="welcome-text">Welcome to the NASA Space Gallery.</p>

        <p className="project-desc">
          This is a <span className="project-tech">React + Typescript + Express</span> project that utilises the various NASA and Google Earth Engine APIs to present geographical and astronomical data in a clean and organised manner. I have spent countless hours (250+) in this project to make sure that this Gallery provides a neat and beautiful interface for accessing the awesome imagery hosted by NASA and Google. This website is fully optimised for desktop, laptop and mobile users and has a very intuitive UI.
        </p>

        <p className="project-desc">
          I created this project mainly to showcase my full-stack development skills and my experience in working and synchronizing with enterprise grade APIs. The front-end is composed of a barebones HTML file which is populated through React hydration. I have used react-router to manage the client-side navigation so as to provide a snappy and seamless UI experience. The backend is powered by an Express.js server running on Node.js. All API secrets are handled in the backend itself and no secrets data is ever leaked to the client. 
        </p>

        <p className="project-desc">
          This project uses namely the following APIs:
        </p>

        <ul className="about-api-list">
          <li className="about-api-item">NASA APOD (Astronomy Picture of the Day) API</li>
          <li className="about-api-item">NASA Image and Video Library API</li>
          <li className="about-api-item">NASA Mars Rover Photos API</li>
          <li className="about-api-item">Google Maps Static API</li>
        </ul>

        <p className="project-desc">
          Working in this project has been an eye-opening experience. I have come to realise that many of the things we take for granted on websites (dark mode, seamless UI etc.) are actually the fruits of many hours of hard work by multiple devs. I am truly grateful that I took the courage to do this project because I have learnt a lot of invaluable things on this journey. This was my first large scale full-stack project and I am happy to say that I'm proud of the work that I have done. I still remember the many hours that I toiled away on this project, refusing to budge from my chair, even ignoring when my pomodoro alarms rang. I became really invested in this project. It quickly went from being a simple portfolio piece to one of my most loved pieces of work. I truly feel that doing this project has made me love web development even more.
        </p>

        <p className="project-desc">
          And back to you, my anonymous visitor. Thank you for taking the time to view my project and to read through this short anecdote of mine. I truly wish that you have had a satisfactory experience using this website. Feel free to let me know if there are any shortcomings you come to find. I would really love to hear about your experience with my website. As always, I'll be available at my Twitter (X) handle. Bye bye!
        </p>


      <div id="devcard-and-socials">
        <div id="about-developer-card">
          <div id="adc-avatar-container">
            <img src={DeveloperAvatar} alt="A picture of me." id="adc-avatar" />
          </div>

          <p id="adc-handle">
            <a href="https://x.com/PrantaneelPegu" className="adc-handle-link">
              @Prantaneel Pegu
            </a>
          </p>
        </div>

        <div id="about-socials">
          <div id="about-socials-container">
            <a href="https://github.com/Prantaneel-Pegu" className="about-social-link">
              <GithubIcon classNames="about-social-icon" />
            </a>

            <a href="https://x.com/PrantaneelPegu" className="about-social-link">
              <TwitterIcon classNames="about-social-icon" />
            </a>

            <a href="https://www.linkedin.com/in/prantaneel-pegu/" className="about-social-link">
              <LinkedInIcon classNames="about-social-icon" />
            </a>

            <a href="https://profile.indeed.com/p/prantaneelp-jv4nj7f" className="about-social-link">
              <IndeedIcon classNames="about-social-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


export default AboutPage;