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
          This is a <span className="project-tech">React + Typescript + Express</span> project that utilises the various NASA APIs to present data in a neat and organised manner. I have spent countless hours (250+) in this project to make sure that this Gallery provides a clean and beautiful interface for accessing the awesome images hosted by NASA. This website is fully optimised for desktop, laptop and mobile users and has a very intuitive UI.
        </p>

        <p className="project-desc">
          Working in this project has been an eye-opening experience. I have come to realise that many of the things we take for granted on websites (like dark mode, seamless UI etc.) are actually the fruits of many hours of hard work by multiple devs. I am truly grateful that I took the courage to do this project because I have learnt a lot of invaluable things while doing it. This was my first large scale full-stack project and I am happy to say that I'm proud of the work that I have done. I still remember the many hours that I toiled away on this project, refusing to budge from my chair, even ignoring when my pomodoro alarms rang. I became really invested in this project. It quickly went from being a simple portfolio piece to one of my most loved pieces of work. I truly feel that doing this project has made me love web development even more.
        </p>

        <p className="project-desc">
          And back to you, my anonymous visitor. Thank you for taking the time to view my project and to read through this short anecdote of mine. I truly wish that you have had a satisfactory experience using this website. Feel free to let me know if there are any shortcomings you come to find. I would really love to hear about your experience with my website. As always, I'll be available at my Twitter (X) handle. Bye bye and lots of love!
        </p>


      <div id="devcard-and-socials">
        <div id="about-developer-card">
          <div id="adc-avatar-container">
            <img src={DeveloperAvatar} alt="A picture of me." id="adc-avatar" />
          </div>

          <p id="adc-handle">
            @Prantaneel Pegu
          </p>
        </div>

        <div id="about-socials">
          <div id="about-socials-container">
            <a href="#" className="about-social-link">
              <GithubIcon classNames="about-social-icon" />
            </a>

            <a href="#" className="about-social-link">
              <TwitterIcon classNames="about-social-icon" />
            </a>

            <a href="#" className="about-social-link">
              <LinkedInIcon classNames="about-social-icon" />
            </a>

            <a href="#" className="about-social-link">
              <IndeedIcon classNames="about-social-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


export default AboutPage;