import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../config'

export default function StockSearch() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [searched, setSearched] = useState(false)
    const [filterType, setFilterType] = useState('all')
    const [filterExchange, setFilterExchange] = useState('all')
    const navigate = useNavigate()

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!query.trim()) return

        setLoading(true)
        setSearched(true)

        try {
            const response = await axios.get(`${API_BASE_URL}/api/search`, {
                params: { q: query.trim() }
            })
            setResults(response.data.results || [])
        } catch (error) {
            console.error('Search error:', error)
            setResults([])
        } finally {
            setLoading(false)
        }
    }

    const handleStockClick = (symbol) => {
        navigate(`/stock/${symbol}`)
        setQuery('')
        setResults([])
        setSearched(false)
        setFilterType('all')
        setFilterExchange('all')
    }

    // Filter results based on selected filters
    const filteredResults = useMemo(() => {
        let filtered = [...results]

        // Filter by stock type
        if (filterType !== 'all') {
            filtered = filtered.filter(stock =>
                stock.type && stock.type.toLowerCase().includes(filterType.toLowerCase())
            )
        }

        // Filter by exchange
        if (filterExchange !== 'all') {
            filtered = filtered.filter(stock => {
                const symbol = stock.symbol || ''
                if (filterExchange === 'us') {
                    return !symbol.includes('.') || symbol.includes('.US')
                } else if (filterExchange === 'india') {
                    return symbol.includes('.NS') || symbol.includes('.BO')
                } else {
                    return symbol.includes(`.${filterExchange.toUpperCase()}`)
                }
            })
        }

        return filtered
    }, [results, filterType, filterExchange])

    return (
        <div style={{ marginBottom: '2rem' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
                <h2 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🔍 Global Stock Search
                </h2>
                <p className="muted" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                    Search stocks from around the world including US, India, Europe, Asia and more
                </p>

                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter company name or symbol (e.g., Apple, RELIANCE, TCS)"
                            style={{
                                width: '100%',
                                padding: '1rem 1.25rem',
                                border: '2px solid #e5e7eb',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                background: '#ffffff',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#1a1a1a'
                                e.target.style.boxShadow = '0 0 0 3px rgba(26, 26, 26, 0.1)'
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e5e7eb'
                                e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#9ca3af',
                            fontSize: '1.2rem'
                        }}>
                            🔍
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !query.trim()}
                        style={{
                            padding: '1rem 2rem',
                            background: loading || !query.trim()
                                ? '#f3f4f6'
                                : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                            color: loading || !query.trim() ? '#9ca3af' : '#ffffff',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: loading || !query.trim() ? 'not-allowed' : 'pointer',
                            fontSize: '1rem',
                            fontWeight: 600,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: loading || !query.trim()
                                ? 'none'
                                : '0 4px 12px rgba(0, 0, 0, 0.15)',
                            minWidth: '140px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                        onMouseEnter={(e) => {
                            if (!loading && query.trim()) {
                                e.target.style.transform = 'translateY(-2px)'
                                e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)'
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading && query.trim()) {
                                e.target.style.transform = 'translateY(0)'
                                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
                            }
                        }}
                    >
                        {loading ? (
                            <>
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    border: '2px solid #9ca3af',
                                    borderTop: '2px solid transparent',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }}></div>
                                Searching...
                            </>
                        ) : (
                            <>
                                🔍 Search
                            </>
                        )}
                    </button>
                </form>

                {searched && (
                    <div style={{ marginTop: '1rem' }}>
                        {loading ? (
                            <p className="muted">Searching...</p>
                        ) : results.length > 0 ? (
                            <>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '1rem',
                                    flexWrap: 'wrap',
                                    gap: '0.5rem'
                                }}>
                                    <p style={{ fontSize: '0.9rem', margin: 0 }}>
                                        Showing {filteredResults.length} of {results.length} results
                                    </p>

                                    {/* Filters */}
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 600 }}>Type:</span>
                                            <select
                                                value={filterType}
                                                onChange={(e) => setFilterType(e.target.value)}
                                                style={{
                                                    padding: '0.5rem 0.75rem',
                                                    border: '2px solid #e5e7eb',
                                                    borderRadius: '8px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    background: '#ffffff',
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = '#1a1a1a'
                                                    e.target.style.boxShadow = '0 0 0 3px rgba(26, 26, 26, 0.1)'
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = '#e5e7eb'
                                                    e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.04)'
                                                }}
                                            >
                                                <option value="all">All Types</option>
                                                <option value="common stock">Common Stock</option>
                                                <option value="etf">ETF</option>
                                                <option value="adr">ADR</option>
                                                <option value="preferred">Preferred</option>
                                            </select>
                                        </div>

                                        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 600 }}>Region:</span>
                                            <select
                                                value={filterExchange}
                                                onChange={(e) => setFilterExchange(e.target.value)}
                                                style={{
                                                    padding: '0.5rem 0.75rem',
                                                    border: '2px solid #e5e7eb',
                                                    borderRadius: '8px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    background: '#ffffff',
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = '#1a1a1a'
                                                    e.target.style.boxShadow = '0 0 0 3px rgba(26, 26, 26, 0.1)'
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = '#e5e7eb'
                                                    e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.04)'
                                                }}
                                            >
                                                <option value="all">All Regions</option>
                                                <option value="us">🇺🇸 US Stocks</option>
                                                <option value="india">🇮🇳 India (.NS/.BO)</option>
                                                <option value="l">🇬🇧 London (.L)</option>
                                                <option value="t">🇯🇵 Tokyo (.T)</option>
                                                <option value="hk">🇭🇰 Hong Kong (.HK)</option>
                                            </select>
                                        </div>

                                        {(filterType !== 'all' || filterExchange !== 'all') && (
                                            <button
                                                onClick={() => {
                                                    setFilterType('all')
                                                    setFilterExchange('all')
                                                }}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    background: '#f3f4f6',
                                                    color: '#374151',
                                                    border: '2px solid #e5e7eb',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 600,
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.background = '#e5e7eb'
                                                    e.target.style.transform = 'translateY(-1px)'
                                                    e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.background = '#f3f4f6'
                                                    e.target.style.transform = 'translateY(0)'
                                                    e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.04)'
                                                }}
                                            >
                                                Clear Filters
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div style={{
                                    maxHeight: '500px',
                                    overflowY: 'auto',
                                    border: '2px solid #f3f4f6',
                                    borderRadius: '12px',
                                    background: '#ffffff',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                                }}>
                                    {filteredResults.length > 0 ? (
                                        filteredResults.map((stock, index) => (
                                            <div
                                                key={`${stock.symbol}-${index}`}
                                                onClick={() => handleStockClick(stock.symbol)}
                                                style={{
                                                    padding: '1rem 1.25rem',
                                                    borderBottom: index < filteredResults.length - 1 ? '1px solid #f3f4f6' : 'none',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    background: '#ffffff',
                                                    borderRadius: index === 0 ? '12px 12px 0 0' : index === filteredResults.length - 1 ? '0 0 12px 12px' : '0',
                                                    margin: '0 -0.5rem',
                                                    paddingLeft: '1.75rem',
                                                    paddingRight: '1.75rem'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = '#f8f9fa'
                                                    e.currentTarget.style.transform = 'translateX(4px)'
                                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)'
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = '#ffffff'
                                                    e.currentTarget.style.transform = 'translateX(0)'
                                                    e.currentTarget.style.boxShadow = 'none'
                                                }}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>
                                                            {stock.displaySymbol || stock.symbol}
                                                        </div>
                                                        <div className="muted" style={{ fontSize: '0.85rem' }}>
                                                            {stock.description}
                                                        </div>
                                                    </div>
                                                    <div className="muted" style={{
                                                        fontSize: '0.8rem',
                                                        marginLeft: '1rem',
                                                        padding: '0.375rem 0.75rem',
                                                        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                                                        borderRadius: '20px',
                                                        border: '1px solid #d1d5db',
                                                        fontWeight: 600,
                                                        color: '#374151',
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        {stock.type}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{
                                            padding: '3rem 2rem',
                                            textAlign: 'center',
                                            color: '#6b7280',
                                            background: '#f8f9fa',
                                            borderRadius: '12px',
                                            margin: '0 -0.5rem'
                                        }}>
                                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
                                            <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#374151' }}>
                                                No stocks match the selected filters
                                            </div>
                                            <div style={{ fontSize: '0.9rem' }}>
                                                Try adjusting your filters or search for different terms.
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <p className="muted">
                                No results found for "{query}". Try searching for company names like "Apple", "Reliance", "TCS" or symbols like "AAPL", "RELIANCE.NS"
                            </p>
                        )}
                    </div>
                )}

                <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#fff9e6', border: '1px solid #ffd700' }}>
                    <p style={{ fontSize: '0.85rem', margin: '0 0 0.5rem 0', fontWeight: 600, color: '#d97706' }}>
                        Important: Supported Exchanges
                    </p>
                    <ul style={{ fontSize: '0.8rem', margin: 0, paddingLeft: '1.5rem', color: '#92400e' }}>
                        <li><strong>Full Support:</strong> US stocks work best (AAPL, GOOGL, TSLA, MSFT)</li>
                        <li><strong>Limited:</strong> Indian NSE (.NS) stocks show in search but may have limited data</li>
                        <li><strong>Not Supported:</strong> Some exchanges like .BE, .BO may not have real-time data</li>
                        <li>💡 Tip: Search by company name (e.g., "Tesla", "Apple") to find all symbols</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
