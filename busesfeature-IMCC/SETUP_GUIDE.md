# Pune Bus Route Finder - Complete Setup Guide

## Project Overview
A comprehensive bus route finding solution for Pune with web and mobile interfaces.

### Features Included
✅ **Web Application (BUS.HTML)**
- Find buses by origin and destination
- Interactive map with Leaflet.js
- Real-time road network visualization
- Traffic signal markers
- Route search with results panel

✅ **React Native Mobile App (BusRouteFinder.js)**
- iOS and Android support
- Location-based search
- Route details with estimated fare and time
- Interactive map with route markers
- Beautiful dark theme UI

✅ **Bus Data Processing**
- CSV data integration (1000+ routes)
- Location matching algorithm
- Distance and route calculations

---

## 🌐 Web Application Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for Leaflet map tiles)

### Files Required
- `BUS.HTML` - Main web application
- `c91c0878-b4f9-419f-8d7c-97eb6c7a9083.csv` - Bus route data

### How to Run

**Option 1: Direct Browser**
```bash
# Simply open the HTML file in your browser
open BUS.HTML
# Or double-click the file in your file manager
```

**Option 2: Local Server (Recommended)**
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using Ruby
ruby -run -ehttpd . -p8000
```
Then open: `http://localhost:8000/BUS.HTML`

### Web App Features

#### 1. Route Search
```
Origin:      Swargate
Destination: Hinjewadi
```
- Type origin and destination locations
- Click "Search Routes" or press Enter
- View all matching bus routes below the map

#### 2. Route Information
Each result shows:
- **Route Number**: Bus route ID (e.g., 100-D)
- **Distance**: Total km of the route
- **Type**: Direct or Partial coverage
- **Status**: Green badge indicates match quality

#### 3. Interactive Map
- **Pan & Zoom**: Use your mouse to explore
- **Layer Toggle**: Show/hide road types and signals
- **Click Features**: Click on roads or signals for details
- **Dark Theme**: Eye-friendly night mode

#### 4. Real-time Data
- Fetches road data from OpenStreetMap (Overpass API)
- Shows traffic signals automatically
- Displays primary and secondary roads
- Updates stats in real-time

---

## 📱 React Native Mobile App Setup

### Prerequisites
- **Node.js 14+** (JavaScript runtime)
- **npm or yarn** (Package manager)
- **Xcode** (for iOS) or **Android Studio** (for Android)

### Installation Steps

#### 1. Create a New React Native Project
```bash
npx react-native init PuneBusApp
cd PuneBusApp
```

#### 2. Install Required Dependencies
```bash
npm install react-native-maps
npm install react-native-gesture-handler
```

#### 3. Link Dependencies (if needed)
```bash
npx react-native link react-native-maps
npx react-native link react-native-gesture-handler
```

#### 4. Replace App.js
```bash
# Backup the original
mv App.js App.js.backup

# Copy the React Native app code
cp ../BusRouteFinder.js ./App.js
```

#### 5. Run on iOS
```bash
# Install pods first
cd ios && pod install && cd ..

# Start the app
npx react-native run-ios

# Or run on specific simulator
npx react-native run-ios --simulator="iPhone 14"
```

#### 6. Run on Android
```bash
# Start Android emulator first, then:
npx react-native run-android

# Or connect a physical device and run:
npx react-native run-android --deviceId <device-id>
```

### Mobile App Features

#### Interface Components
1. **Header**
   - App title and branding
   - Quick reference info

2. **Search Bar**
   - Origin input field
   - Swap button (⇅) to reverse locations
   - Destination input field
   - Search button with loading state

3. **Map View**
   - Interactive map centered on Pune
   - Selected route markers
   - Dark theme styling

4. **Results Panel**
   - Scrollable list of matching routes
   - Each route shows:
     - Route number
     - Route type (Direct/Partial)
     - Full description
     - Distance, estimated time, calculated fare

5. **Details Panel**
   - Full route information
   - Distance calculation
   - Estimated fare based on PMPML pricing
   - Estimated travel time
   - Action buttons for map and live tracking

---

## 📊 CSV Data Format

The bus data comes from `c91c0878-b4f9-419f-8d7c-97eb6c7a9083.csv`:

```csv
Route ID,Route Description,Route Description Marathi,Kilometer
100-D,Hinjawadi Maan Phase 3 To Ma Na Pa,हिंजवडी माण फेज ३ ते मनपा,26.4
100-U,Ma Na Pa To Hinjawadi Maan Phase 3,मनपा ते हिंजवडी माण फेज ३,26.4
101-D,Kondhwa Bk To Kothrud Depot,कोंढवा बु. ते कोथरुड डेपो,16.2
...
```

**Fields:**
- `Route ID`: Unique identifier (e.g., 100-D, 100-U)
- `Route Description`: English description with origin and destination
- `Route Description Marathi`: Marathi description
- `Kilometer`: Total distance in kilometers

---

## 🔍 Route Matching Algorithm

The app uses intelligent pattern matching:

### Direct Route Match (Score: 10)
```javascript
Origin: Swargate
Destination: Katraj
Match: "Swargate To Katraj" ✓
```

### Partial Route Match (Score: 5)
```javascript
Origin: Swargate
Destination: Hinjawadi
Match: "Swargate To Kothrud" (starts with origin) ✓
```

### Matching Logic
1. Convert all inputs to lowercase
2. Split route description by " To "
3. Check if origin matches first part
4. Check if destination matches second part
5. Return results sorted by match score

---

## 💡 Usage Examples

### Example 1: Direct Search
```
User enters:
  Origin: Swargate
  Destination: Katraj

Results might show:
  Route 103B-D: "Swargate To Katraj" (6.1 km) ✓ Direct
  Route 103C-U: "Swargate To Hinjawadi..." (30.5 km) ◐ Partial
```

### Example 2: Swap Locations
```
Original:
  Origin: Pune Station
  Destination: Hinjawadi

After clicking ⇅:
  Origin: Hinjawadi
  Destination: Pune Station
```

### Example 3: Fare Calculation
```
Distance: 15 km
Fare Calculation:
  Base fare (0-5 km): ₹20
  Additional (10 km × ₹2): ₹20
  Total: ₹40
```

---

## 🚀 Advanced Features

### Future Enhancements
- [ ] **Web Scraper Integration**: Real-time bus location data
- [ ] **Live Tracking**: GPS tracking of buses
- [ ] **Crowd Sourcing**: User reviews and ratings
- [ ] **Multi-language**: Hindi/Marathi support
- [ ] **Offline Mode**: Download map tiles
- [ ] **Push Notifications**: Route alerts
- [ ] **Payment Integration**: Digital ticketing
- [ ] **Driver Earnings**: Analytics dashboard

### WebScraper Implementation
To add real-time bus tracking:

```javascript
// Fetch live bus data
async function fetchLiveBusData() {
  try {
    const response = await fetch('https://api.punebusservice.com/buses');
    const data = await response.json();
    
    // Update map with live locations
    data.forEach(bus => {
      L.marker([bus.latitude, bus.longitude], {
        icon: busIcon()
      }).addTo(layers['bus-routes']);
    });
  } catch (error) {
    console.error('Failed to fetch live data:', error);
  }
}
```

### Calculate Additional Metrics
- **Traffic Impact**: Based on nearby signals and historical data
- **Crowding Level**: User-submitted reports
- **Estimated Wait Time**: Based on schedule data
- **Alternative Routes**: Suggest faster alternatives

---

## 📱 Device Compatibility

### Web App
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

### React Native App
- ✅ iOS 11+
- ✅ Android 5.0+ (API 21+)
- ✅ Tablet support
- ✅ Landscape orientation

---

## 🛠️ Troubleshooting

### Web App Issues

**Issue**: Map not loading
```
Solution:
1. Check internet connection
2. Verify Overpass API is responding
3. Clear browser cache and reload
4. Check browser console for errors
```

**Issue**: Routes not showing
```
Solution:
1. Verify CSV file is in same directory
2. Check file name: c91c0878-b4f9-419f-8d7c-97eb6c7a9083.csv
3. Ensure CSV is properly formatted
4. Check browser's Network tab for CORS issues
```

### Mobile App Issues

**Issue**: Map not displaying
```
Solution:
1. Check Internet permission in app settings
2. Verify location services are enabled
3. Reinstall app: npm install && npm start
4. Clear Metro bundler cache: npm start -- --reset-cache
```

**Issue**: Build fails
```
Solution:
1. Update pods: cd ios && pod install && cd ..
2. Clear build cache: rm -rf node_modules && npm install
3. Update React Native: npm install react-native@latest
4. Check Node.js version: node --version (should be 14+)
```

---

## 📚 API Resources

### OpenStreetMap Overpass API
- **Endpoint**: `https://overpass-api.de/api/interpreter`
- **Limit**: 60-second timeout
- **Usage**: Fetches road networks and traffic signals

### Map Tiles
- **Provider**: CartoDB Dark Matter
- **URL**: `https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png`
- **License**: Open for use

---

## 📝 License & Attribution

This project uses:
- **Leaflet.js**: Open source mapping library
- **OpenStreetMap**: Community-driven map data
- **CartoDB**: Map styling and tiles
- **React Native**: Cross-platform mobile framework

---

## 🤝 Contributing

To enhance the project:

1. **Add More Data**: Update CSV with additional routes
2. **Improve Algorithm**: Enhance route matching logic
3. **Add Features**: Implement live tracking or reviews
4. **Report Bugs**: Document issues and solutions
5. **Localization**: Add more languages

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser/app console for error messages
3. Verify all files are in correct locations
4. Test with sample data first

---

## 🎯 Quick Start Checklist

- [ ] HTML file opens in browser
- [ ] CSV data loads (check console for count)
- [ ] Can type in search fields
- [ ] Search returns routes
- [ ] Map displays road network
- [ ] Can toggle layers on/off
- [ ] React Native project created
- [ ] Dependencies installed
- [ ] App runs on iOS/Android

---

**Version**: 1.0  
**Last Updated**: February 2026  
**Status**: Production Ready
