import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SiteLayout from './layouts/SiteLayout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Businesses from './pages/Businesses.jsx'
import Infra from './pages/Infra.jsx'
import Farms from './pages/Farms.jsx'
import Tech from './pages/Tech.jsx'
import Insights from './pages/Insights.jsx'
import Contact from './pages/Contact.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

// BrowserRouter (clean URLs). Server-side SPA fallback:
//   - Docker / nginx: `try_files $uri /index.html` in nginx.conf
//   - GitHub Pages:   public/404.html -> ?redirect= -> index.html shim
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/businesses" element={<Businesses />} />
          <Route path="/infra" element={<Infra />} />
          <Route path="/farms" element={<Farms />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Legal kind="privacy" />} />
          <Route path="/terms" element={<Legal kind="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
