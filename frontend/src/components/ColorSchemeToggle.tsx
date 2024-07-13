import './styles/ColorSchemeToggle.css';
import { GithubIcon, MoonIcon, SunIcon } from './SvgIcons';

const body = document.querySelector('body')

function enableDarkMode () {
    const toggleDark = document.getElementsByClassName('toggle-dark');
    const toggleLight = document.getElementsByClassName('toggle-light');

    body?.classList.add('dark-mode');

    for (let i = 0; i < toggleDark.length; i++) {
        toggleDark[i].classList.add('toggle-hidden');
        toggleLight[i].classList.remove('toggle-hidden');
    }
}

function disableDarkMode () {
    const toggleDark = document.getElementsByClassName('toggle-dark');
    const toggleLight = document.getElementsByClassName('toggle-light');

    body?.classList.remove('dark-mode');

    for (let i = 0; i < toggleDark.length; i++) {
        toggleDark[i].classList.remove('toggle-hidden');
        toggleLight[i].classList.add('toggle-hidden');
    }
}

function ColorSchemeToggle () {
    return (
        <div className="ColorSchemeToggle">
            <SunIcon classNames='cst-sun-icon icon toggle-light' onClick={disableDarkMode} />
            <MoonIcon classNames='cst-moon-icon icon toggle-dark toggle-hidden' onClick={enableDarkMode} />
            <a href="https://github.com/Prantaneel-Pegu" className="cst-github-link">
                <GithubIcon classNames='cst-github-icon icon'/>
            </a>
        </div>
    )
}

export default ColorSchemeToggle;