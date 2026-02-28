/**
 * Pune Bus Route Finder - React Native Mobile App
 * Supports iOS and Android platforms
 * 
 * To use this:
 * 1. Create a React Native project: npx react-native init PuneBusApp
 * 2. Install dependencies: npm install react-native-maps react-native-gesture-handler
 * 3. Replace App.js with this file
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

// Pune coordinates
const PUNE_INITIAL_REGION = {
  latitude: 18.5204,
  longitude: 73.8567,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const BUS_DATA = [
  { routeId: '100-D', description: 'Hinjawadi Maan Phase 3 To Ma Na Pa', km: 26.4 },
  { routeId: '101-D', description: 'Kondhwa Bk To Kothrud Depot', km: 16.2 },
  { routeId: '102-D', description: 'Lohgaon To Kothrud Depot', km: 23.6 },
  { routeId: '103-D', description: 'Kothrud Depot To Katraj', km: 14.3 },
  { routeId: '104-D', description: 'DSK Vishwa To Deccan Gymkhana', km: 15.4 },
  { routeId: '105-D', description: 'Balewaldi Depot To Deccan Gymkhana', km: 16.8 },
  { routeId: '108-D', description: 'Pune Station To Sutardara', km: 12.3 },
  { routeId: '115P-D', description: 'Hinjawadi Maan Phase 3 To Pune Station', km: 29 },
];

const BusRouteFinder = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const mapRef = useRef(null);

  // Extract locations from route description
  const extractLocations = (description) => {
    const parts = description.split(' To ');
    if (parts.length === 2) {
      return {
        from: parts[0].trim().toLowerCase(),
        to: parts[1].trim().toLowerCase(),
      };
    }
    return null;
  };

  // Find matching routes
  const findMatchingRoutes = () => {
    if (!origin.trim() || !destination.trim()) {
      Alert.alert('Error', 'Please enter both origin and destination');
      return;
    }

    setLoading(true);
    const originLower = origin.toLowerCase();
    const destLower = destination.toLowerCase();

    const results = [];
    BUS_DATA.forEach((bus) => {
      const locations = extractLocations(bus.description);
      if (!locations) return;

      // Check for direct routes
      if (
        (locations.from.includes(originLower) || originLower.includes(locations.from.split(' ')[0])) &&
        (locations.to.includes(destLower) || destLower.includes(locations.to.split(' ')[0]))
      ) {
        results.push({
          type: 'direct',
          bus: bus,
          matchScore: 10,
        });
      }
      // Check for partial coverage
      else if (locations.from.includes(originLower) || locations.to.includes(destLower)) {
        results.push({
          type: 'partial',
          bus: bus,
          matchScore: 5,
        });
      }
    });

    results.sort((a, b) => b.matchScore - a.matchScore);
    setSearchResults(results);
    setShowResults(true);
    setLoading(false);

    if (results.length === 0) {
      Alert.alert(
        'No Routes Found',
        `No bus routes found from ${origin} to ${destination}. Try different locations.`
      );
    }
  };

  // Swap origin and destination
  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  // Select a route to view details
  const selectRoute = (route) => {
    setSelectedRoute(route);
    // Animate map to show the route
    if (mapRef.current) {
      mapRef.current.animateToRegion(PUNE_INITIAL_REGION, 1000);
    }
  };

  // Calculate travel time (estimation based on distance and average speed)
  const calculateTravelTime = (distanceKm) => {
    const avgSpeed = 25; // km/h (accounting for traffic in Pune)
    const hours = distanceKm / avgSpeed;
    const minutes = Math.round((hours % 1) * 60);
    const wholeHours = Math.floor(hours);

    if (wholeHours > 0) {
      return `${wholeHours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Calculate estimated fare
  const calculateFare = (distanceKm) => {
    // Pune PMPML fare structure: ~₹20 for 0-5km, +₹2 per additional km
    if (distanceKm <= 5) return '₹20';
    const extraKm = Math.ceil(distanceKm - 5);
    const fare = 20 + extraKm * 2;
    return `₹${fare}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d1a" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pune Bus Routes</Text>
        <Text style={styles.headerSubtitle}>Find your journey</Text>
      </View>

      {/* Search Section */}
      <View style={styles.searchContainer}>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Enter origin..."
            placeholderTextColor="#666"
            value={origin}
            onChangeText={setOrigin}
          />
          <TouchableOpacity style={styles.swapBtn} onPress={swapLocations}>
            <Text style={styles.swapBtnText}>⇅</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Enter destination..."
            placeholderTextColor="#666"
            value={destination}
            onChangeText={setDestination}
          />
        </View>

        <TouchableOpacity
          style={styles.searchBtn}
          onPress={findMatchingRoutes}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#0d0d1a" size="small" />
          ) : (
            <Text style={styles.searchBtnText}>Search Routes</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={PUNE_INITIAL_REGION}
        customMapStyle={mapDarkStyle}
      >
        {selectedRoute && (
          <Marker
            coordinate={{ latitude: 18.5204, longitude: 73.8567 }}
            title={selectedRoute.bus.routeId}
            description={selectedRoute.bus.description}
          />
        )}
      </MapView>

      {/* Results Panel */}
      {showResults && (
        <View style={styles.resultsPanel}>
          <View style={styles.resultsPanelHeader}>
            <Text style={styles.resultsPanelTitle}>
              {searchResults.length} Route{searchResults.length !== 1 ? 's' : ''} Found
            </Text>
            <TouchableOpacity onPress={() => setShowResults(false)}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          {searchResults.length === 0 ? (
            <Text style={styles.noResults}>No routes found</Text>
          ) : (
            <ScrollView style={styles.resultsScroll} showsVerticalScrollIndicator={false}>
              {searchResults.map((result, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.routeCard,
                    selectedRoute?.bus.routeId === result.bus.routeId && styles.routeCardSelected,
                  ]}
                  onPress={() => selectRoute(result)}
                >
                  <View style={styles.routeHeader}>
                    <Text style={styles.routeNumber}>Route {result.bus.routeId}</Text>
                    <Text style={styles.routeType}>
                      {result.type === 'direct' ? '✓ Direct' : '◐ Partial'}
                    </Text>
                  </View>

                  <Text style={styles.routeDescription}>{result.bus.description}</Text>

                  <View style={styles.routeStats}>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Distance</Text>
                      <Text style={styles.statValue}>{result.bus.km} km</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Est. Time</Text>
                      <Text style={styles.statValue}>
                        {calculateTravelTime(result.bus.km)}
                      </Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Est. Fare</Text>
                      <Text style={styles.statValue}>{calculateFare(result.bus.km)}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      )}

      {/* Selected Route Details */}
      {selectedRoute && !showResults && (
        <View style={styles.detailsPanel}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setSelectedRoute(null)}
          >
            <Text style={styles.backBtnText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.detailsContent}>
            <Text style={styles.detailsRouteNumber}>Route {selectedRoute.bus.routeId}</Text>
            <Text style={styles.detailsDescription}>{selectedRoute.bus.description}</Text>

            {/* Details Grid */}
            <View style={styles.detailsGrid}>
              <View style={styles.detailsItem}>
                <Text style={styles.detailsItemLabel}>Distance</Text>
                <Text style={styles.detailsItemValue}>{selectedRoute.bus.km} km</Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={styles.detailsItemLabel}>Est. Duration</Text>
                <Text style={styles.detailsItemValue}>
                  {calculateTravelTime(selectedRoute.bus.km)}
                </Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={styles.detailsItemLabel}>Est. Fare</Text>
                <Text style={styles.detailsItemValue}>
                  {calculateFare(selectedRoute.bus.km)}
                </Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={styles.detailsItemLabel}>Avg. Speed</Text>
                <Text style={styles.detailsItemValue}>~25 km/h</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>📍 Show on Map</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>⏱️ Live Tracking</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#0d0d1a',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff18',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    letterSpacing: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0d0d1a',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff18',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff08',
    borderWidth: 1,
    borderColor: '#ffffff14',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 13,
  },
  swapBtn: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#ffffff08',
    borderWidth: 1,
    borderColor: '#ffffff14',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swapBtnText: {
    fontSize: 16,
    color: '#00c8ff',
  },
  searchBtn: {
    backgroundColor: '#00c8ff',
    paddingVertical: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  map: {
    flex: 1,
  },
  resultsPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#0d0d1aee',
    borderTopWidth: 1,
    borderTopColor: '#ffffff22',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  resultsPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff08',
  },
  resultsPanelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  closeBtn: {
    fontSize: 20,
    color: '#666',
  },
  resultsScroll: {
    flex: 1,
    paddingHorizontal: 12,
  },
  routeCard: {
    backgroundColor: '#ffffff08',
    borderWidth: 1,
    borderColor: '#ffffff14',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  routeCardSelected: {
    borderColor: '#00c8ff',
    backgroundColor: '#00c8ff11',
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: '#00c8ff',
  },
  routeType: {
    fontSize: 11,
    color: '#888',
    backgroundColor: '#ffffff08',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  routeDescription: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 8,
    lineHeight: 16,
  },
  routeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ffffff08',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ddd',
  },
  noResults: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 14,
  },
  detailsPanel: {
    position: 'absolute',
    top: SCREEN_HEIGHT / 3,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0d0d1aee',
    borderTopWidth: 1,
    borderTopColor: '#ffffff22',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  backBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtnText: {
    color: '#00c8ff',
    fontSize: 14,
    fontWeight: '600',
  },
  detailsContent: {
    paddingHorizontal: 16,
  },
  detailsRouteNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00c8ff',
    marginBottom: 4,
  },
  detailsDescription: {
    fontSize: 13,
    color: '#aaa',
    marginBottom: 16,
    lineHeight: 18,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 10,
  },
  detailsItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff08',
    borderWidth: 1,
    borderColor: '#ffffff14',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  detailsItemLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  detailsItemValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00c8ff',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#00c8ff',
    paddingVertical: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#0d0d1a',
    fontWeight: '600',
    fontSize: 13,
  },
});

// Dark map style for Mapview
const mapDarkStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#242f3e' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#242f3e' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
];

export default BusRouteFinder;
