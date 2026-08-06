import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { useSnackbar } from '../../components/snackbar';
// local components
import ZoneMap from './ZoneMap';
import ZoneForm from './ZoneForm';
import ZoneList from './ZoneList';
import ZoneToolbar from './ZoneToolbar';
// API Services
import { getZonesList, createZone, updateZone, deleteZone } from '../../Services/ZoneSer';
// styles
import './styles.css';

// Preloaded Dummy Zones around Bikaner, India (28.0167, 73.3117)
const DUMMY_ZONES = [
  {
    id: 'zone-1',
    name: 'Zone 1 (Sadul Ganj)',
    city: 'Bikaner',
    status: 'Active',
    color: '#7C3AED',
    coordinates: [
      { lat: 28.025, lng: 73.310 },
      { lat: 28.030, lng: 73.325 },
      { lat: 28.015, lng: 73.330 },
      { lat: 28.010, lng: 73.315 }
    ]
  },
  {
    id: 'zone-2',
    name: 'Zone 2 (Rani Bazar)',
    city: 'Bikaner',
    status: 'Active',
    color: '#10B981',
    coordinates: [
      { lat: 28.005, lng: 73.320 },
      { lat: 28.012, lng: 73.340 },
      { lat: 27.995, lng: 73.345 },
      { lat: 27.990, lng: 73.325 }
    ]
  },
  {
    id: 'zone-3',
    name: 'Zone 3 (J.N.V. Colony)',
    city: 'Bikaner',
    status: 'Disabled',
    color: '#3B82F6',
    coordinates: [
      { lat: 28.015, lng: 73.290 },
      { lat: 28.020, lng: 73.305 },
      { lat: 28.005, lng: 73.308 },
      { lat: 28.000, lng: 73.295 }
    ]
  }
];

export default function ZoneSetupPage() {
  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  // Primary States
  const [polygon, setPolygon] = useState([]);
  const [zones, setZones] = useState(DUMMY_ZONES);
  const [selectedZone, setSelectedZone] = useState(null);

  // Layout and Auxiliary States
  const [selectedColor, setSelectedColor] = useState('#7C3AED');
  const [activeMode, setActiveMode] = useState('select');
  const [enableAllZones, setEnableAllZones] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  // Fetch zones list from backend
  const fetchZones = useCallback(async () => {
    try {
      const response = await getZonesList();
      if (response.success && Array.isArray(response.zones)) {
        // Standardize _id to id so components don't break
        const mapped = response.zones.map(z => ({
          ...z,
          id: z._id || z.id
        }));
        setZones(mapped);
      }
    } catch (error) {
      console.error("Error fetching zones from API:", error);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchZones();
  }, [fetchZones]);

  // Triggered when saving/updating a zone from the form
  const handleSaveZone = async (zoneData) => {
    try {
      if (selectedZone) {
        // Edit Mode API call
        const response = await updateZone(selectedZone.id, {
          name: zoneData.name,
          city: zoneData.city,
          status: zoneData.status,
          color: zoneData.color,
          coordinates: zoneData.coordinates
        });
        if (response.success) {
          await fetchZones();
          setSelectedZone(null);
          enqueueSnackbar('Delivery zone updated successfully!', { variant: 'success' });
        }
      } else {
        // Create Mode API call
        const response = await createZone({
          name: zoneData.name,
          city: zoneData.city,
          status: zoneData.status,
          color: zoneData.color,
          coordinates: zoneData.coordinates
        });
        if (response.success) {
          await fetchZones();
          enqueueSnackbar('Delivery zone created successfully!', { variant: 'success' });
        }
      }
      setPolygon([]);
      setActiveMode('select');
    } catch (error) {
      console.error("Error saving zone:", error);
      enqueueSnackbar(error.error || error.message || "Failed to save delivery zone. Please try again.", { variant: 'error' });
    }
  };

  // Triggered when clicking Edit in the zone list
  const handleEditZone = (zone) => {
    setSelectedZone(zone);
    setPolygon(zone.coordinates);
    setSelectedColor(zone.color);
    setActiveMode('select');
  };

  // Triggered when clicking Delete in the zone list
  const handleDeleteZone = async (id) => {
    try {
      const response = await deleteZone(id);
      if (response.success) {
        await fetchZones();
        enqueueSnackbar('Delivery zone deleted successfully!', { variant: 'success' });
        if (selectedZone && selectedZone.id === id) {
          handleReset();
        }
      }
    } catch (error) {
      console.error("Error deleting zone:", error);
      enqueueSnackbar(error.error || error.message || "Failed to delete zone.", { variant: 'error' });
    }
  };

  // Toggle status of a zone between Active and Disabled
  const handleToggleStatus = async (id) => {
    try {
      const zoneToToggle = zones.find(zone => zone.id === id);
      if (!zoneToToggle) return;
      
      const nextStatus = zoneToToggle.status === 'Active' ? 'Disabled' : 'Active';
      const response = await updateZone(id, { status: nextStatus });
      if (response.success) {
        await fetchZones();
        enqueueSnackbar(`Zone status updated to ${nextStatus}!`, { variant: 'success' });
      }
    } catch (error) {
      console.error("Error toggling zone status:", error);
      enqueueSnackbar(error.error || error.message || "Failed to toggle status.", { variant: 'error' });
    }
  };

  // Resets the current form and active draw state
  const handleReset = () => {
    setSelectedZone(null);
    setPolygon([]);
    setActiveMode('select');
  };

  // Triggered when "Add New Zone" header button is clicked
  const handleAddNewZoneClick = () => {
    handleReset();
    setActiveMode('draw');
    // Auto click draw polygon tool
    setTimeout(() => {
      const el = document.querySelector('.leaflet-draw-draw-polygon');
      if (el) el.click();
    }, 100);
  };

  // Filtered Zones to display on the map and in the list
  const filteredZones = zones.filter((zone) => {
    if (!enableAllZones) return false;
    if (statusFilter === 'Active') return zone.status === 'Active';
    if (statusFilter === 'Disabled') return zone.status === 'Disabled';
    return true;
  });

  return (
    <>
      <Helmet>
        <title> Zone Setup | VEZZIE </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'} className="zone-setup-container">
        {/* Page Top Header */}
        <div className="zone-setup-header">
          <div className="zone-header-left">
            <h1>Zone Setup</h1>
            <CustomBreadcrumbs
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Zone Setup' },
              ]}
              sx={{ mb: 0 }}
            />
          </div>
          <button
            type="button"
            className="add-zone-btn"
            onClick={handleAddNewZoneClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add New Zone
          </button>
        </div>

        {/* Layout Grid (75% Map / 25% Sidecards) */}
        <div className="zone-setup-grid">
          {/* LEFT SIDE (75%) */}
          <div className="map-card">
            <div className="map-card-header">
              <div className="map-header-title">
                <h2>Map Zone Setup</h2>
                <p>Draw and manage delivery zones on the map</p>
              </div>

              {/* Map Layer Filters */}
              <div className="map-header-controls">
                <label className="switch-container" htmlFor="enable-zones-overlay">
                  <input
                    id="enable-zones-overlay"
                    type="checkbox"
                    className="switch-input"
                    checked={enableAllZones}
                    onChange={(e) => setEnableAllZones(e.target.checked)}
                  />
                  <span className="switch-slider" />
                  <span>Enable Zone Overlay</span>
                </label>

                <select
                  className="map-select"
                  aria-label="Filter Zones by Status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Zones</option>
                  <option value="Active">Active Only</option>
                  <option value="Disabled">Disabled Only</option>
                </select>
              </div>
            </div>

            {/* Interactive Map Block */}
            <div className="map-wrapper">
              <ZoneToolbar
                activeMode={activeMode}
                setActiveMode={setActiveMode}
                onClearAll={() => setPolygon([])}
              />

              <ZoneMap
                polygon={polygon}
                setPolygon={setPolygon}
                zones={filteredZones}
                selectedZone={selectedZone}
                selectedColor={selectedColor}
                activeMode={activeMode}
                setActiveMode={setActiveMode}
              />
            </div>

            {/* Bottom Actions linking Form submit & Instruction bar */}
            <div className="map-bottom-actions">
              <div className="map-action-btns">
                <button
                  type="submit"
                  form="zone-setup-form"
                  className="btn-primary"
                  disabled={polygon.length === 0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  Save Zone Boundary
                </button>
                
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleReset}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                  </svg>
                  Reset Layout
                </button>
              </div>

              <div className="instruction-banner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span>Click on the map to create a zone. Drag points to adjust the delivery area boundaries.</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (25%) */}
          <div className="right-cards-container">
            {/* Form settings panel */}
            <div id="zone-setup-form-wrapper">
              <ZoneForm
                selectedZone={selectedZone}
                polygon={polygon}
                onSave={handleSaveZone}
                onReset={handleReset}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            </div>

            {/* List and CRUD actions panel */}
            <ZoneList
              zones={filteredZones}
              onEdit={handleEditZone}
              onDelete={handleDeleteZone}
              onToggleStatus={handleToggleStatus}
              selectedZone={selectedZone}
            />
          </div>
        </div>

        {/* BOTTOM INSTRUCTIONS BLOCK */}
        <div className="right-card instructions-card">
          <h2>Instruction Guide</h2>
          <p className="card-desc">Follow these quick steps to successfully define delivery zones for your store</p>
          
          <div className="instruction-steps">
            <div className="step-card">
              <span className="step-num">1</span>
              <div className="step-text">
                <h4>Draw boundaries</h4>
                <p>Click the &quot;Draw Zone&quot; sidebar button on the map, then click consecutive points on the map. Connect the final point back to the first to create a closed polygon.</p>
              </div>
            </div>

            <div className="step-card">
              <span className="step-num">2</span>
              <div className="step-text">
                <h4>Edit boundaries</h4>
                <p>To refine coordinates, click &quot;Edit Zone&quot;. Drag any polygon corner point to a new location, then click the map or click Select to stop editing.</p>
              </div>
            </div>

            <div className="step-card">
              <span className="step-num">3</span>
              <div className="step-text">
                <h4>Input details</h4>
                <p>Fill out the zone name and delivery city on the settings form. Select a custom theme overlay color dot.</p>
              </div>
            </div>

            <div className="step-card">
              <span className="step-num">4</span>
              <div className="step-text">
                <h4>Save zone</h4>
                <p>Click &quot;Save Zone&quot; or &quot;Save Zone Boundary&quot; under the map. The zone will immediately populate in the Zone List and render as a colored overlay.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
