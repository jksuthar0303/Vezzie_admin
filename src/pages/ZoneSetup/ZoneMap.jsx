import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

// Import Leaflet styles
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

// Fix Leaflet Default Icon issue for React builds
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Expose Leaflet globally for vanilla plugins (leaflet-draw) to read
window.L = L;
require('leaflet-draw');

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to programmatically pan/zoom the map
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom, { animate: true, duration: 1 });
    }
  }, [center, zoom, map]);
  return null;
}

ChangeView.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
};

// Custom draw control using native Leaflet APIs to bypass react-leaflet-draw context bugs
function DrawControl({
  polygon,
  onCreated,
  onEdited,
  onDeleted,
  selectedColor,
}) {
  const map = useMap();
  const drawnItemsRef = useRef(null);
  const drawControlRef = useRef(null);

  // Keep latest callbacks and colors in ref to avoid re-triggering the main setup effect
  const handlersRef = useRef({ onCreated, onEdited, onDeleted });
  const colorRef = useRef(selectedColor);

  useEffect(() => {
    handlersRef.current = { onCreated, onEdited, onDeleted };
  }, [onCreated, onEdited, onDeleted]);

  useEffect(() => {
    colorRef.current = selectedColor;
  }, [selectedColor]);

  // Setup leaflet draw once
  useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    drawnItemsRef.current = drawnItems;

    // Real-time vertex edit listener binding
    const bindEditEvents = (layer) => {
      layer.on('edit', () => {
        if (typeof layer.getLatLngs === 'function') {
          const latlngs = layer.getLatLngs()[0];
          if (Array.isArray(latlngs)) {
            const coordinates = latlngs.map((latlng) => ({
              lat: latlng.lat,
              lng: latlng.lng,
            }));
            handlersRef.current.onEdited(coordinates);
          }
        }
      });
    };

    drawnItems.on('layeradd', (e) => {
      bindEditEvents(e.layer);
    });

    const drawControl = new L.Control.Draw({
      position: 'topleft',
      draw: {
        polygon: {
          allowIntersection: false,
          drawError: {
            color: '#EF4444',
            message: '<strong>Cannot intersect!</strong> Adjust your path.',
          },
          shapeOptions: {
            color: colorRef.current || '#7C3AED',
            fillColor: colorRef.current || '#7C3AED',
            fillOpacity: 0.4,
            weight: 3,
          },
        },
        circle: false,
        rectangle: false,
        polyline: false,
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });
    map.addControl(drawControl);
    drawControlRef.current = drawControl;

    // Listeners calling the ref closures
    const handleDrawCreated = (e) => {
      const layer = e.layer;
      drawnItems.addLayer(layer);
      
      const latlngs = layer.getLatLngs()[0];
      const coordinates = latlngs.map((latlng) => ({
        lat: latlng.lat,
        lng: latlng.lng,
      }));
      handlersRef.current.onCreated(coordinates);
    };

    const handleDrawEdited = (e) => {
      const layers = e.layers;
      layers.eachLayer((layer) => {
        const latlngs = layer.getLatLngs()[0];
        const coordinates = latlngs.map((latlng) => ({
          lat: latlng.lat,
          lng: latlng.lng,
        }));
        handlersRef.current.onEdited(coordinates);
      });
    };

    const handleDrawDeleted = () => {
      handlersRef.current.onDeleted();
    };

    map.on(L.Draw.Event.CREATED, handleDrawCreated);
    map.on(L.Draw.Event.EDITED, handleDrawEdited);
    map.on(L.Draw.Event.DELETED, handleDrawDeleted);

    return () => {
      map.removeControl(drawControl);
      map.removeLayer(drawnItems);
      drawnItems.off();
      map.off(L.Draw.Event.CREATED, handleDrawCreated);
      map.off(L.Draw.Event.EDITED, handleDrawEdited);
      map.off(L.Draw.Event.DELETED, handleDrawDeleted);
    };
  }, [map]); // Runs only once when map loads

  // Reactively draw the polygon when it changes externally
  useEffect(() => {
    const drawnItems = drawnItemsRef.current;
    if (!drawnItems) return;

    drawnItems.clearLayers();

    if (polygon && polygon.length > 0) {
      const latlngs = polygon.map((p) => [p.lat, p.lng]);
      const currentPoly = L.polygon(latlngs, {
        color: selectedColor || '#7C3AED',
        fillColor: selectedColor || '#7C3AED',
        fillOpacity: 0.4,
        weight: 3,
      });
      drawnItems.addLayer(currentPoly);
    }
  }, [polygon, selectedColor]);

  // Reactively update drawing tools config on color change
  useEffect(() => {
    const drawControl = drawControlRef.current;
    if (!drawControl) return;

    drawControl.setDrawingOptions({
      polygon: {
        shapeOptions: {
          color: selectedColor || '#7C3AED',
          fillColor: selectedColor || '#7C3AED',
        },
      },
    });
  }, [selectedColor]);

  return null;
}

DrawControl.propTypes = {
  polygon: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    })
  ).isRequired,
  onCreated: PropTypes.func.isRequired,
  onEdited: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  selectedColor: PropTypes.string.isRequired,
};

export default function ZoneMap({
  polygon,
  setPolygon,
  zones,
  selectedZone,
  selectedColor,
  activeMode,
  setActiveMode,
}) {
  const [mapCenter, setMapCenter] = useState([28.0167, 73.3117]); // Default to Bikaner, India
  const [mapZoom, setMapZoom] = useState(14); // Closer view of Bikaner city

  // Auto-focus and pan map to the editing zone's boundary coordinates
  useEffect(() => {
    if (selectedZone && Array.isArray(selectedZone.coordinates) && selectedZone.coordinates.length > 0) {
      const firstPoint = selectedZone.coordinates[0];
      if (firstPoint && typeof firstPoint.lat === 'number' && typeof firstPoint.lng === 'number') {
        setMapCenter([firstPoint.lat, firstPoint.lng]);
        setMapZoom(14);
      }
    }
  }, [selectedZone]);

  // Handle polygon drawing created
  const onCreated = (coordinates) => {
    setPolygon(coordinates);
    setActiveMode('select');
  };

  // Handle polygon edits
  const onEdited = (coordinates) => {
    setPolygon(coordinates);
    setActiveMode('select');
  };

  // Handle polygon deletions
  const onDeleted = () => {
    setPolygon([]);
    setActiveMode('select');
  };


  // Locate user using browser Geolocation
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
          setMapZoom(14);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Could not determine location. Please ensure site permissions are granted.');
        }
      );
    } else {
      alert('Your browser does not support Geolocation.');
    }
  };

  // Toggle fullscreen mode on map card
  const handleFullscreen = () => {
    const mapCardElement = document.querySelector('.map-wrapper');
    if (!mapCardElement) return;

    if (!document.fullscreenElement) {
      mapCardElement.requestFullscreen().catch((err) => {
        alert(`Error enabling fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };


  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* ChangeView tracks center & zoom changes */}
      <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom>
        <ChangeView center={mapCenter} zoom={mapZoom} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Existing delivery zones rendered statically */}
        {zones.map((zone) => {
          const isSelected = selectedZone && selectedZone.id === zone.id;
          if (isSelected) return null; // Handled by active DrawControl rendering

          return (
            <Polygon
              key={zone.id}
              positions={zone.coordinates}
              pathOptions={{
                color: zone.color,
                fillColor: zone.color,
                fillOpacity: 0.35,
                weight: 2,
              }}
            />
          );
        })}

        {/* Custom Native Leaflet Draw Integrator */}
        <DrawControl
          polygon={polygon}
          onCreated={onCreated}
          onEdited={onEdited}
          onDeleted={onDeleted}
          selectedColor={selectedColor}
        />
      </MapContainer>

      {/* Floating map action triggers */}
      <div style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          type="button"
          className="icon-btn"
          onClick={handleLocateMe}
          title="Current Location"
          style={{ boxShadow: 'var(--shadow-medium)' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
          </svg>
        </button>

        <button
          type="button"
          className="icon-btn"
          onClick={handleFullscreen}
          title="Toggle Fullscreen"
          style={{ boxShadow: 'var(--shadow-medium)' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        </button>
      </div>

      {/* Floating coordinates overlay for drawing transparency */}
      {polygon && polygon.length > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '120px',
            zIndex: 1000,
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '11px',
            boxShadow: 'var(--shadow-soft)',
            pointerEvents: 'none',
            color: 'var(--text-dark)',
            fontWeight: 500,
          }}
        >
          Captured points: {polygon.length}
        </div>
      )}
    </div>
  );
}

ZoneMap.propTypes = {
  polygon: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    })
  ).isRequired,
  setPolygon: PropTypes.func.isRequired,
  zones: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      coordinates: PropTypes.array.isRequired,
    })
  ).isRequired,
  selectedZone: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    city: PropTypes.string,
    status: PropTypes.string,
    color: PropTypes.string,
    coordinates: PropTypes.array,
  }),
  selectedColor: PropTypes.string.isRequired,
  activeMode: PropTypes.string.isRequired,
  setActiveMode: PropTypes.func.isRequired,
};
