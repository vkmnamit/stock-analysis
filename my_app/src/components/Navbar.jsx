import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const location = useLocation()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navButtonStyle = (path, isMobile = false) => ({
        padding: isMobile ? '0.875rem 1.25rem' : '0.75rem 1.5rem',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: isMobile ? '1.1rem' : '1rem',
        fontWeight: 600,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '2px solid transparent',
        background: location.pathname === path || location.pathname.startsWith(path + '/')
            ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
            : 'transparent',
        color: location.pathname === path || location.pathname.startsWith(path + '/')
            ? '#ffffff'
            : '#1a1a1a',
        display: 'block',
        width: isMobile ? '100%' : 'auto',
        textAlign: isMobile ? 'left' : 'center',
        boxShadow: location.pathname === path || location.pathname.startsWith(path + '/')
            ? '0 4px 12px rgba(0, 0, 0, 0.15)'
            : 'none',
        transform: 'translateY(0)',
        position: 'relative',
        overflow: 'hidden'
    })

    const handleMouseEnter = (e) => {
        if (e.target.style.background === 'transparent') {
            e.target.style.background = '#f8f9fa'
            e.target.style.color = '#1a1a1a'
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
        }
    }

    const handleMouseLeave = (e, path) => {
        const isActive = location.pathname === path || location.pathname.startsWith(path + '/')
        if (!isActive) {
            e.target.style.background = 'transparent'
            e.target.style.color = '#1a1a1a'
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = 'none'
        }
    }

    const handleLinkClick = () => {
        setMobileMenuOpen(false)
    }

    return (
        <nav style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
                    padding: '0.75rem 0'
                }}>
                    <div style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '0 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        {/* Logo */}
                        <Link
                            to="/"
                            onClick={handleLinkClick}
                            style={{
                                fontWeight: 800,
                                fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
                                textDecoration: 'none',
                                color: '#1a1a1a',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                                letterSpacing: '-0.02em'
                            }}
                        >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                fontWeight: 700,
                                color: '#ffffff'
                            }}>
                                SA
                            </div>
                            <span style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                StockPro
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div style={{
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'center',
                            flex: 1,
                            justifyContent: 'center'
                        }}>
                            <Link
                                to="/"
                                style={navButtonStyle('/')}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={(e) => handleMouseLeave(e, '/')}
                            >
                                Home
                            </Link>
                            <Link
                                to="/stock/AAPL"
                                style={navButtonStyle('/stock')}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={(e) => handleMouseLeave(e, '/stock')}
                            >
                                Stocks
                            </Link>
                            <Link
                                to="/crypto"
                                style={navButtonStyle('/crypto')}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={(e) => handleMouseLeave(e, '/crypto')}
                            >
                                Crypto
                            </Link>
                            <Link
                                to="/watchlist"
                                style={navButtonStyle('/watchlist')}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={(e) => handleMouseLeave(e, '/watchlist')}
                            >
                                Watchlist
                            </Link>
                            <Link
                                to="/news"
                                style={navButtonStyle('/news')}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={(e) => handleMouseLeave(e, '/news')}
                            >
                                News
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            style={{
                                display: 'none',
                                background: mobileMenuOpen ? '#1a1a1a' : 'transparent',
                                border: `2px solid ${mobileMenuOpen ? '#1a1a1a' : '#1a1a1a'}`,
                                color: mobileMenuOpen ? '#ffffff' : '#1a1a1a',
                                borderRadius: '10px',
                                padding: '0.625rem',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                lineHeight: 1,
                                minWidth: '48px',
                                height: '48px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: mobileMenuOpen ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none'
                            }}
                            aria-label="Toggle menu"
                            onMouseEnter={(e) => {
                                if (!mobileMenuOpen) {
                                    e.target.style.background = '#f8f9fa'
                                    e.target.style.transform = 'scale(1.05)'
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!mobileMenuOpen) {
                                    e.target.style.background = 'transparent'
                                    e.target.style.transform = 'scale(1)'
                                }
                            }}
                        >
                            <div style={{
                                width: '20px',
                                height: '16px',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                                <span style={{
                                    width: '100%',
                                    height: '2px',
                                    background: 'currentColor',
                                    transition: 'all 0.3s ease',
                                    transform: mobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'
                                }}></span>
                                <span style={{
                                    width: mobileMenuOpen ? '0' : '100%',
                                    height: '2px',
                                    background: 'currentColor',
                                    transition: 'all 0.3s ease',
                                    opacity: mobileMenuOpen ? '0' : '1'
                                }}></span>
                                <span style={{
                                    width: '100%',
                                    height: '2px',
                                    background: 'currentColor',
                                    transition: 'all 0.3s ease',
                                    transform: mobileMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'
                                }}></span>
                            </div>
                        </button>
                    </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div
                    style={{
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(10px)',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        animation: 'slideDown 0.3s ease-out'
                }}
            >
                <Link
                    to="/"
                    onClick={handleLinkClick}
                    style={navButtonStyle('/', true)}
                >
                        Home
                    </Link >
            <Link
                to="/stock/AAPL"
                onClick={handleLinkClick}
                style={navButtonStyle('/stock', true)}
            >
                        Stocks
                    </Link >
            <Link
                to="/crypto"
                onClick={handleLinkClick}
                style={navButtonStyle('/crypto', true)}
            >
                        Crypto
                    </Link >
            <Link
                to="/watchlist"
                onClick={handleLinkClick}
                style={navButtonStyle('/watchlist', true)}
            >
                        Watchlist
                    </Link >
            <Link
                to="/news"
                onClick={handleLinkClick}
                style={navButtonStyle('/news', true)}
            >
                        News
                    </Link >
                </div >
            )
    }
        </nav >
    )
}
