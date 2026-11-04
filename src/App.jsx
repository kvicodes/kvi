import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import SiteLayout from './layouts/SiteLayout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Greens from './pages/Greens.jsx'
import Tech from './pages/Tech.jsx'
import Infra from './pages/Infra.jsx'
import Projects from './pages/Projects.jsx'
import Products from './pages/Products.jsx'
import Product from './pages/Product.jsx'
import Insights from './pages/Insights.jsx'
import Contact from './pages/Contact.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

// BrowserRouter (clean URLs), with the SPA fallback in nginx.conf. Renamed
// routes are 301s in nginx.conf for crawlers; the <Navigate> routes cover
// in-app and cached links.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/greens" element={<Greens />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/infra" element={<Infra />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<Product />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Legal kind="privacy" />} />
          <Route path="/terms" element={<Legal kind="terms" />} />
          <Route path="/farms" element={<Navigate to="/greens" replace />} />
          <Route path="/businesses" element={<Navigate to="/about#verticals" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
