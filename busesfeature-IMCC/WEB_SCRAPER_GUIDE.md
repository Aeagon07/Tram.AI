# Web Scraper Integration Guide

This guide explains how to add real-time bus tracking and traffic analysis to your Pune Bus Route Finder application.

## 🚀 Implementation Options

### Option 1: Using Public APIs (Recommended)

#### A. Pune Traffic API
```javascript
// Fetch real-time traffic data
async function fetchTrafficData() {
  try {
    const response = await fetch('https://api.punecity.com/traffic/data');
    const trafficData = await response.json();
    
    // Process traffic signals
    trafficData.signals.forEach(signal => {
      const severity = calculateTrafficSeverity(signal.congestion);
      updateSignalColor(signal.id, severity);
    });
  } catch (error) {
    console.error('Traffic data unavailable:', error);
  }
}

function calculateTrafficSeverity(congestion) {
  if (congestion > 80) return 'high';    // Red
  if (congestion > 50) return 'medium';  // Yellow
  return 'low';                           // Green
}
```

#### B. Google Maps Platform
```javascript
// Get route distance and duration with traffic
async function getRouteWithTraffic(origin, destination) {
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}&departure_time=now`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    const route = data.routes[0];
    return {
      distance: route.legs[0].distance.value / 1000, // in km
      duration: route.legs[0].duration.value / 60,     // in minutes
      durationWithTraffic: route.legs[0].duration_in_traffic.value / 60
    };
  } catch (error) {
    console.error('Routes API error:', error);
  }
}
```

### Option 2: Custom Web Scraper

#### Using Puppeteer (Node.js)
```javascript
// scraper.js
const puppeteer = require('puppeteer');

async function scrapeBusLocations() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to PMPML website or tracking service
  await page.goto('https://www.pmpml.org/');
  
  // Wait for dynamic content to load
  await page.waitForSelector('.bus-location-data');
  
  // Extract bus data
  const busData = await page.evaluate(() => {
    const buses = [];
    document.querySelectorAll('.bus-item').forEach(element => {
      buses.push({
        routeId: element.querySelector('.route-id').textContent,
        latitude: parseFloat(element.querySelector('.lat').textContent),
        longitude: parseFloat(element.querySelector('.lng').textContent),
        lastUpdated: element.querySelector('.timestamp').textContent,
        passengers: parseInt(element.querySelector('.passenger-count').textContent)
      });
    });
    return buses;
  });
  
  await browser.close();
  return busData;
}

module.exports = { scrapeBusLocations };
```

#### Using Cheerio (Lightweight)
```javascript
// lightweight-scraper.js
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeTrafficSignals() {
  try {
    const { data } = await axios.get('https://traffic-data.pune.gov.in');
    const $ = cheerio.load(data);
    
    const signals = [];
    $('div.traffic-signal').each((index, element) => {
      signals.push({
        id: $(element).attr('data-signal-id'),
        name: $(element).find('.signal-name').text(),
        status: $(element).find('.signal-status').text(),
        waitTime: parseInt($(element).find('.wait-time').text())
      });
    });
    
    return signals;
  } catch (error) {
    console.error('Scraping failed:', error);
    return [];
  }
}
```

### Option 3: WebSocket Real-Time Updates

```javascript
// real-time-tracker.js
class BusTracker {
  constructor(wsUrl = 'wss://bus-tracking.pune.local/ws') {
    this.ws = new WebSocket(wsUrl);
    this.setupListeners();
  }
  
  setupListeners() {
    this.ws.onopen = () => {
      console.log('Connected to bus tracking service');
      // Subscribe to route updates
      this.ws.send(JSON.stringify({
        action: 'subscribe',
        routes: ['100-D', '101-D', '102-D']
      }));
    };
    
    this.ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      if (update.type === 'bus_location') {
        this.updateBusOnMap(update.data);
      }
    };
    
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }
  
  updateBusOnMap(busData) {
    // Update marker on map with real-time location
    const marker = L.marker(
      [busData.latitude, busData.longitude],
      { icon: liveTrackerIcon(busData.routeId) }
    );
    marker.bindPopup(`
      <strong>Route ${busData.routeId}</strong><br>
      Speed: ${busData.speed} km/h<br>
      Passengers: ${busData.passengers}/${busData.capacity}
    `);
    marker.addTo(liveTrackingLayer);
  }
}

// Initialize tracker
const tracker = new BusTracker();
```

## 📊 Data Processing Examples

### Calculate Estimated Arrival Time
```javascript
function calculateETA(distance, currentSpeed = 25, trafficMultiplier = 1) {
  // distance in km, speed in km/h
  const adjustedSpeed = currentSpeed / trafficMultiplier;
  const hours = distance / adjustedSpeed;
  const minutes = Math.round((hours % 1) * 60);
  const arrivedIn = Math.floor(hours);
  
  return {
    minutes: minutes + (arrivedIn * 60),
    formatted: arrivedIn > 0 ? `${arrivedIn}h ${minutes}m` : `${minutes}m`
  };
}

// Usage
const eta = calculateETA(12, 25, 1.5); // 12km, normal speed 25km/h, 50% traffic
console.log(`ETA: ${eta.formatted}`);
```

### Predict Crowding Level
```javascript
function predictCrowdingLevel(timeOfDay, dayOfWeek, routeId) {
  // Peak hours: 7-9 AM, 5-8 PM
  const hour = new Date().getHours();
  const isPeakHour = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 20);
  
  // Weekday multiplier
  const weekdayMultiplier = dayOfWeek >= 1 && dayOfWeek <= 5 ? 1.3 : 0.8;
  
  let baseLevel = 50; // 0-100 scale
  if (isPeakHour) baseLevel = 80;
  
  // Popular routes during peak
  const popularRoutes = ['100-D', '115P-D', '108-D'];
  if (isPeakHour && popularRoutes.includes(routeId)) {
    baseLevel = 95;
  }
  
  const predicted = Math.min(100, baseLevel * weekdayMultiplier);
  
  return {
    level: predicted,
    description: predicted > 80 ? 'Very Crowded' : predicted > 60 ? 'Crowded' : 'Normal'
  };
}
```

### Fare Calculation with Dynamic Pricing
```javascript
function calculateDynamicFare(distance, timeOfDay, crowdingLevel) {
  // Base PMPML fare
  let baseFare = 20; // 0-5 km
  if (distance > 5) {
    baseFare += (Math.ceil(distance) - 5) * 2;
  }
  
  // Time multiplier (peak hours)
  const hour = new Date().getHours();
  const isPeakHour = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 20);
  const timeMultiplier = isPeakHour ? 1.1 : 1.0;
  
  // Crowding multiplier (dynamic pricing)
  const crowdingMultiplier = 1 + (crowdingLevel / 100) * 0.2; // Up to 20% increase
  
  const finalFare = Math.round(baseFare * timeMultiplier * crowdingMultiplier);
  
  return {
    baseFare: baseFare,
    withPeakMultiplier: Math.round(baseFare * timeMultiplier),
    final: finalFare,
    savings: isPeakHour ? 0 : Math.round(baseFare * 0.1), // Off-peak discount
    description: `₹${finalFare}${isPeakHour ? ' (Peak hours)' : ''}`
  };
}
```

## 🔗 Integration Points

### In the HTML Web App
```html
<!-- Add to the info panel -->
<div id="traffic-metrics" style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #ffffff08;">
  <div class="info-row">
    <span>Crowding Level</span>
    <span id="crowding-value">—</span>
  </div>
  <div class="info-row">
    <span>Est. Speed</span>
    <span id="speed-value">—</span>
  </div>
  <div class="info-row">
    <span>Dynamic Fare</span>
    <span id="fare-value">—</span>
  </div>
</div>

<script>
// Update metrics when route selected
function selectBusRoute(routeId) {
  const bus = busData.find(b => b.routeId === routeId);
  if (bus) {
    const crowding = predictCrowdingLevel(new Date().getHours(), new Date().getDay(), routeId);
    const fareInfo = calculateDynamicFare(bus.kilometer, new Date().getHours(), crowding.level);
    
    document.getElementById('crowding-value').textContent = crowding.description;
    document.getElementById('speed-value').textContent = '~25 km/h';
    document.getElementById('fare-value').textContent = fareInfo.description;
    
    showInfoPanel(`Route ${routeId}`, 'bus', [
      ['Route Description', bus.description],
      ['Distance', `${bus.kilometer} km`],
      ['Crowding', crowding.description],
      ['Est. Fare', fareInfo.description]
    ]);
  }
}
</script>
```

### In the React Native App
```javascript
// Add to BusRouteFinder.js
useEffect(() => {
  // Fetch live traffic data every 30 seconds
  const trafficInterval = setInterval(async () => {
    const trafficData = await fetchTrafficData();
    setTrafficMetrics(trafficData);
  }, 30000);
  
  return () => clearInterval(trafficInterval);
}, []);

// Use in route calculations
const getEnhancedStatistics = (route) => {
  const crowding = predictCrowdingLevel(new Date().getHours(), new Date().getDay(), route.routeId);
  const fare = calculateDynamicFare(route.km, new Date().getHours(), crowding.level);
  
  return {
    ...route,
    crowdingLevel: crowding.level,
    crowdingText: crowding.description,
    estimatedFare: fare.final,
    fareDescription: fare.description
  };
};
```

## 📡 Setting Up a Basic Backend

### Express.js Server for Data Aggregation
```javascript
// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Aggregate traffic data
app.get('/api/traffic-data', async (req, res) => {
  try {
    // Fetch from multiple sources
    const [openWeather, localTraffic] = await Promise.all([
      axios.get('https://api.openweathermap.org/...'),
      axios.get('https://local-traffic-service.local/data')
    ]);
    
    res.json({
      weather: openWeather.data,
      traffic: localTraffic.data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bus locations
app.get('/api/buses/:routeId', async (req, res) => {
  try {
    const buses = await scrapeBusLocations(req.params.routeId);
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## 🎯 Testing the Integration

```javascript
// test-integration.js
async function testIntegration() {
  console.log('🧪 Testing Web Scraper Integration...\n');
  
  // Test 1: Traffic data
  console.log('1. Fetching traffic data...');
  const traffic = await fetchTrafficData();
  console.log(`   ✓ Got data for ${traffic.signals.length} signals\n`);
  
  // Test 2: Real-time locations
  console.log('2. Scraping bus locations...');
  const buses = await scrapeBusLocations();
  console.log(`   ✓ Found ${buses.length} buses on route\n`);
  
  // Test 3: Calculations
  console.log('3. Testing fare calculations...');
  const fare = calculateDynamicFare(15, 18, 75);
  console.log(`   ✓ Calculated fare: ${fare.description}\n`);
  
  // Test 4: ETA prediction
  console.log('4. Calculating ETA...');
  const eta = calculateETA(12, 25, 1.5);
  console.log(`   ✓ Estimated arrival: ${eta.formatted}\n`);
  
  console.log('✅ All tests passed!');
}
```

## 🔒 Important Considerations

### API Rate Limiting
```javascript
const rateLimit = {
  calls: 0,
  limit: 100,
  window: 60000, // 1 minute
};

function checkRateLimit() {
  rateLimit.calls++;
  if (rateLimit.calls > rateLimit.limit) {
    console.warn('Rate limit exceeded!');
    return false;
  }
  
  setTimeout(() => {
    rateLimit.calls = 0;
  }, rateLimit.window);
  
  return true;
}
```

### Data Privacy
- Never store personal information
- Anonymize location data
- Use HTTPS for all requests
- Comply with data protection laws

### Error Handling
```javascript
async function safeDataFetch(url, fallbackData = []) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Fetch failed: ${error.message}`);
    return fallbackData; // Return cached/default data
  }
}
```

---

**Version**: 1.0  
**Last Updated**: February 2026  
This guide provides the foundation for adding real-time tracking and analytics to your bus finder application.
