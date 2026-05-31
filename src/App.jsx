import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CursorDot from './components/CursorDot'
import PageTransition from './components/PageTransition'
import ScrollReset from './components/ScrollReset'
import Home from './pages/Home'
import Services from './pages/Services'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'

function AppInner() {
  const location = useLocation()
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-orange focus:text-dark-bg focus:font-body focus:font-semibold focus:text-sm focus:uppercase focus:tracking-widest focus:rounded-sm"
      >
        Skip to content
      </a>
      <CursorDot />
      <Navbar />
      <ScrollReset />
      <main id="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"         element={<PageTransition><Home /></PageTransition>} />
            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/archive"  element={<PageTransition><Work /></PageTransition>} />
            <Route path="/about"    element={<PageTransition><About /></PageTransition>} />
            <Route path="/contact"  element={<PageTransition><Contact /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
