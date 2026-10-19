import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import SiteLayout from './layouts/SiteLayout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Businesses from './pages/Businesses.jsx'
import Greens from './pages/Greens.jsx'
import Infra from './pages/Infra.jsx'
import Tech from './pages/Tech.jsx'
import Products from './pages/Products.jsx'
import Product from './pages/Product.jsx'
import Insights from './pages/Insights.jsx'
import Contact from './pages/Contact.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

// BrowserRouter (clean URLs). Server-side SPA fallback via nginx:
// `try_files $uri /index.html` in nginx.conf, which also 301s /farms -> /greens
// for crawlers; the client-side <Navigate> covers in-app and cached links.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/businesses" element={<Businesses />} />
          <Route path="/greens" element={<Greens />} />
          <Route path="/infra" element={<Infra />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<Product />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Legal kind="privacy" />} />
          <Route path="/terms" element={<Legal kind="terms" />} />
          {/* Compatibility: Kaimur Farms is now KVI Greens. */}
          <Route path="/farms" element={<Navigate to="/greens" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
