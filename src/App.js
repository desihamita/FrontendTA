import { RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProjectRouter from './components/router/ProjectRouter';
import PublicRouter from './components/router/PublicRouter';
import './AxiosInterceptor'

function App() {
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    if(localStorage.token !== undefined) {
      setAuth(true)
    }
  }, [5000])

  return (
    <>
      { auth ? 
        <RouterProvider router={ProjectRouter} /> :
        <RouterProvider router={PublicRouter} /> 
      }
    </>
  );
}

export default App;
