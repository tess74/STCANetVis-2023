import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AppMain from './AppMain';
import DashMainx from './pages/dashboard/dashMain/DashMain';
import NetworkPlotGra from './pages/NetworkPlor/NetworkPlotGra';
import DataUncentinityPlot from './pages/dataUncentinity/moniorComponents/DataUncentinityPlot';
import PredictionPlot from './pages/realTimePrediction/minorComponents/PredictionPlot';
import ErrorPage from './pages/Errors/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppMain />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:'/',
        element: <DashMainx />
      },
      {
        path: '/predict',
        element: <PredictionPlot statx={'full'} />
      },
      {
        path: '/network',
        element: <div className="FullPageMainApp"><div className="LeftSectionApp"></div> <div className="RightSectionApp"><NetworkPlotGra statx={'full'} /></div></div>
      },
      {
        path: '/data_unce',
        element: <div className="FullPageMainApp"><div className="LeftSectionApp"></div> <div className="RightSectionApp"><DataUncentinityPlot statx={'full'} /></div></div>
      }
    ]
      
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
