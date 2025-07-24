import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';

import { Spinner } from './components/ui/spinner'
import store from './redux/store' // Import your Redux store
import './index.css'

const App = lazy(() => import('./App'))

createRoot(document.getElementById("root")!).render(
    <Suspense fallback={
        <div className="min-h-screen w-full flex items-center justify-center">
            <Spinner size="lg" />
        </div>
    }>
        <Provider store={store}>
            <App />
        </Provider>
    </Suspense>
);
