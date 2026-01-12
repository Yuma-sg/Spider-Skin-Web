'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/citas', label: 'Reservar Cita' },
    { href: '/cotizacion', label: 'Cotización' },
    { href: '/customizador', label: 'Customizador' },
    { href: '/contacto', label: 'Contacto' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-950/95 backdrop-blur-md border-b border-dark-800 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-display uppercase tracking-widest text-lg text-white">
              Spider <span className="text-primary-500">Skin</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display uppercase tracking-widest text-sm text-gray-300 hover:text-primary-500 transition-colors relative group">
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link href="/citas" className="btn-primary">
              Aparta tu Fecha
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-950 border-t border-dark-800"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-display uppercase tracking-widest text-sm text-gray-300 hover:text-primary-500 transition-colors py-3">
                  {link.label}
                </Link>
              ))}
              <Link href="/citas" className="btn-primary font-display uppercase tracking-widest">Aparta tu Fecha</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
