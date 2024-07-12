import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "./App";
import Gallery from "./Gallery";
import NoRouteMatches from "./NoRouteMatches";
const GalleryImage = lazy(() => import('./GalleryImage'));
const PictureOfTheDay = lazy(() => import('./PictureOfTheDay'));
const CoordinateImagery = lazy(() => import('./CoordinateImagery'));
const MarsPhotos = lazy(() => import('./MarsPhotos'));
const ApiDocs = lazy(() => import('./ApiDocs'));
const AboutPage = lazy(() => import('./AboutPage'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <App errorElement={<NoRouteMatches />} />,
        children: [
            {
                errorElement: <NoRouteMatches />, 
                children: [
                    {
                        index: true,
                        // path: "gallery/",
                        element: <Gallery />
                    }, 
                    {
                        path: 'gallery/:id',
                        element: <Suspense fallback={ <div className="loader"></div> }>
                                    <GalleryImage />
                                 </Suspense>
                    },
                    {
                        path: 'potd/',
                        element: <Suspense fallback={ <div className="loader"></div> }>
                                    <PictureOfTheDay />
                                 </Suspense>
                    },
                    {
                        path: 'coordinate-imagery/',
                        element: <Suspense fallback={ <div className="loader"></div> }>
                                    <CoordinateImagery />
                                 </Suspense>
                    },
                    {
                        path: 'mars-gallery/',
                        element: <Suspense fallback={ <div className="loader"></div> }>
                                    <MarsPhotos />
                                 </Suspense>
                    },
                    {
                        path: 'api-docs/',
                        element: <Suspense fallback={ <div className="loader"></div> }>
                                    <ApiDocs />
                                 </Suspense>
                    },
                    {
                        path: 'about/',
                        element: <Suspense fallback={ <div className="loader"></div> }>
                                    <AboutPage />
                                 </Suspense>
                    }
                ]
            }
        ]
    }
])

function Routes () {
    return <RouterProvider router={router} />
}

export default Routes;