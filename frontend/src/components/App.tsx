import NavBar from './NavBar';
import Copyright from './Copyright';
import { Outlet } from "react-router-dom";


type Props = {
    errorElement?: React.JSX.Element
}

function App({ errorElement }: Props) {

    // Scroll to top
    window.scrollTo(0,0);
    
    // Makes some dynamic UI changes after whole page including images, scripts etc. have been loaded
    window.addEventListener("load", () => {
        const navBar = document.getElementById("NavBarCompact");
        function setNavHeight () {
            document.documentElement.style.setProperty('--navbar-height', `${navBar?.offsetHeight.toString()}px`);
        }   

        if (navBar) {    
            setNavHeight();

            const observer = new MutationObserver(mutations => {
                mutations.forEach(() => {
                    setNavHeight();
                })
            });
            observer.observe(navBar, {
                subtree: false,
                attributes: true,
                attributeFilter: ['style']
            });
            
        } else console.log("Navbar is in long form. Didn't set --navbar-height.");
    });

    return (
        <>  
            <main id="main">
                <NavBar />
                {errorElement ? errorElement : <Outlet />}
            </main>
            <Copyright />
        </>
    )
}

export default App;