# Stock Analysis Website - Testing Guide

## 🚀 How to Start the Application

### Backend Server (Port 5001)
```bash
cd /Users/namitraj/Desktop/stock_analysis/my-express-app
PORT=5001 node server.js
```

### Frontend Server (Port 5173)
```bash
cd /Users/namitraj/Desktop/stock_analysis/my_app
npm run dev
```

Then open: **http://localhost:5173**

---

## ✅ Features to Test

### 1. **Home Page** (`/`)
**What to test:**
- [ ] 8 stock cards displayed (AAPL, GOOGL, MSFT, TSLA, AMZN, NVDA, META, NFLX)
- [ ] Real-time prices loading for each stock
- [ ] Click on any stock card navigates to stock detail page
- [ ] Latest market news (8 articles) displayed below
- [ ] News articles show headline, summary, source, and date
- [ ] Click on news opens article in new tab

**Expected behavior:**
- Stock prices should load within 2-3 seconds
- Prices should show actual dollar values (e.g., $175.23)
- News should be from the last 7 days

---

### 2. **Stock Detail Page** (`/stock/AAPL`)
**What to test:**
- [ ] Company name and details displayed (country, exchange)
- [ ] Current price with 2 decimal places
- [ ] Price change indicator (▲ for up, ▼ for down) with percentage
- [ ] OHLC data (Open, High, Low, Previous Close)
- [ ] 30-day price chart displayed
- [ ] Chart shows dates on X-axis and prices on Y-axis
- [ ] Technical Indicators section
- [ ] Stock-specific news section (5 articles about that company)

**Expected behavior:**
- Price change should calculate: (current - previous) / previous * 100
- Chart should show last 30 days of trading data
- News should be specific to the selected stock symbol

**Stocks to test:**
- AAPL (Apple)
- GOOGL (Google)
- MSFT (Microsoft)
- TSLA (Tesla)
- AMZN (Amazon)
- NVDA (NVIDIA)
- META (Meta)
- NFLX (Netflix)

---

### 3. **Crypto Analysis Page** (`/crypto`)
**What to test:**
- [ ] 6 cryptocurrencies displayed (BTC, ETH, BNB, SOL, XRP, ADA)
- [ ] Live prices in USD
- [ ] 24-hour price change percentage with ▲/▼ indicator
- [ ] 24-hour High and Low prices
- [ ] Auto-refresh message displayed
- [ ] Prices update every 30 seconds automatically

**Expected behavior:**
- Prices should load within 2-3 seconds
- Bitcoin price should be around $60,000-$70,000 (depending on market)
- After 30 seconds, prices should refresh automatically
- Price changes should show positive (black) or negative (gray) styling

---

### 4. **News Page** (`/news`)
**What to test:**
- [ ] Page title: "Market News & Analysis"
- [ ] Subtitle shows "Latest financial news from the past 7 days"
- [ ] Article count displayed (e.g., "Showing 50 articles")
- [ ] All news articles from Finnhub API displayed
- [ ] Each article shows: headline, summary, source, date, image (if available)
- [ ] Clicking article opens in new tab

**Expected behavior:**
- Should show more articles than Home page (Home shows only 8)
- Loading state should display while fetching
- If no news available, should show message

---

### 5. **Watchlist Page** (`/watchlist`)
**What to test:**
- [ ] Input field to add stock symbols
- [ ] "Add to Watchlist" button
- [ ] Add symbols like: AAPL, TSLA, NVDA
- [ ] Each watchlist item shows as a clickable StockCard
- [ ] Real-time prices load for watchlist items
- [ ] "Remove" button on each card
- [ ] Removing stock updates the list immediately

**Expected behavior:**
- Can add any valid stock symbol
- Symbols automatically converted to uppercase
- Duplicate symbols should be handled
- Empty input should not be added

---

## 🎨 Design Testing

### Black & White Theme
**What to verify:**
- [ ] Background is pure white (#ffffff)
- [ ] Text is pure black (#000000)
- [ ] Muted text is gray (#333333)
- [ ] Buttons have black background, white text
- [ ] Cards have subtle black borders
- [ ] No other colors except black, white, and gray
- [ ] Price increase indicators in black
- [ ] Price decrease indicators in gray

---

## 🔧 API Testing

### Backend Endpoints
Test these manually using curl or browser:

```bash
# Test stock quote
curl http://localhost:5001/api/stock/AAPL

# Test company info
curl http://localhost:5001/api/company/AAPL

# Test candle data
curl "http://localhost:5001/api/candles/AAPL?resolution=D&from=1697000000&to=1729000000"

# Test crypto price
curl http://localhost:5001/api/crypto/BINANCE:BTCUSDT

# Test market news
curl http://localhost:5001/api/market-news

# Test stock-specific news
curl http://localhost:5001/api/stock-news/AAPL

# Test watchlist GET
curl http://localhost:5001/api/watchlist

# Test watchlist POST
curl -X POST http://localhost:5001/api/watchlist \
  -H "Content-Type: application/json" \
  -d '{"symbol":"AAPL"}'

# Test watchlist DELETE
curl -X DELETE http://localhost:5001/api/watchlist/AAPL
```

**Expected responses:**
- All endpoints should return JSON
- No "API key" errors
- No CORS errors
- Response time < 3 seconds

---

## 🐛 Common Issues & Solutions

### Issue: CORS errors
**Solution:** Make sure backend is running on port 5001 and frontend on 5173

### Issue: "Please use an API key" error
**Solution:** Check that `.env` file exists in `my-express-app/` with valid `FINHUB_API_KEY`

### Issue: Port 5000 already in use
**Solution:** We use port 5001 instead (macOS Control Center uses 5000)

### Issue: Stock prices showing as "--"
**Solution:** Check network tab for API errors, verify backend is running

### Issue: News not loading
**Solution:** Finnhub API rate limit might be hit (60 calls/minute)

---

## 📊 Performance Testing

**Load Times:**
- Home page: < 3 seconds
- Stock detail page: < 3 seconds
- Crypto page: < 3 seconds
- News page: < 4 seconds

**Data Freshness:**
- Stock quotes: Real-time (15-minute delayed for free tier)
- Crypto prices: Live from Binance
- News articles: Last 7 days
- Charts: Last 30 days daily candles

---

## ✨ New Features Added

1. **Stock Detail Enhancements:**
   - Added price change percentage with ▲/▼ indicators
   - Added company country and exchange info
   - Added stock-specific news section
   - Added section headers for better organization

2. **Crypto Analysis Enhancements:**
   - Added 2 more cryptocurrencies (XRP, ADA)
   - Added 24-hour high/low prices
   - Added price change percentages
   - Added auto-refresh every 30 seconds
   - Improved card layout with more data

3. **News Page Enhancements:**
   - Added loading state
   - Added article count display
   - Better empty state handling
   - Improved typography

4. **Home Page Enhancements:**
   - Increased from 4 to 8 stocks
   - Added descriptive subtitle
   - Better section organization
   - Emoji indicators for visual appeal

---

## 🎯 Success Criteria

The website is working correctly if:
- ✅ All stock prices load and show real dollar amounts
- ✅ All navigation links work
- ✅ Charts display 30 days of data
- ✅ News articles are from the last 7 days
- ✅ Crypto prices auto-refresh every 30 seconds
- ✅ Watchlist add/remove functionality works
- ✅ Pure black & white design maintained
- ✅ No console errors
- ✅ No CORS errors
- ✅ All API calls return data within 3 seconds

---

**Last Updated:** October 18, 2025
**API Provider:** Finnhub (https://finnhub.io)
**Frontend:** React 19 + Vite
**Backend:** Node.js + Express 5
