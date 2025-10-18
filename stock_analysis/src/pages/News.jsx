import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NewsFeed from '../components/NewsFeed'
import { API_BASE_URL } from '../config'

export default function News() {
    const [news, setNews] = useState([])

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/market-news`)
            .then(res => setNews(res.data))
            .catch(err => console.error('News error:', err))
    }, [])

    return (
        <div className="page">
            <h1>Market News</h1>
            <NewsFeed news={news} />
        </div>
    )
}
