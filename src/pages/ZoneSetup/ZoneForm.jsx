import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const COLOR_PALETTE = [
  { label: 'Purple', hex: '#7C3AED' },
  { label: 'Green', hex: '#10B981' },
  { label: 'Blue', hex: '#3B82F6' },
  { label: 'Orange', hex: '#F59E0B' },
  { label: 'Red', hex: '#EF4444' },
];

export default function ZoneForm({
  selectedZone,
  polygon,
  onSave,
  onReset,
  selectedColor,
  setSelectedColor,
}) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [status, setStatus] = useState(true);

  const clearForm = useCallback(() => {
    setName('');
    setCity('');
    setStatus(true);
    setSelectedColor('#7C3AED');
  }, [setSelectedColor]);

  // Sync form when selectedZone changes (e.g. for Edit Mode)
  useEffect(() => {
    if (selectedZone) {
      setName(selectedZone.name);
      setCity(selectedZone.city);
      setStatus(selectedZone.status === 'Active');
      setSelectedColor(selectedZone.color);
    } else {
      clearForm();
    }
  }, [selectedZone, clearForm, setSelectedColor]);

  const handleReset = () => {
    clearForm();
    onReset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Please enter a Zone Name');
      return;
    }
    if (!city.trim()) {
      alert('Please enter a City');
      return;
    }

    if (polygon.length === 0) {
      alert('Please draw a polygon boundary on the map first.');
      return;
    }

    const zoneData = {
      id: selectedZone ? selectedZone.id : Date.now().toString(),
      name,
      city,
      status: status ? 'Active' : 'Disabled',
      color: selectedColor,
      coordinates: polygon,
    };

    onSave(zoneData);
    clearForm();
  };

  return (
    <div className="right-card">
      <h2>{selectedZone ? 'Edit Delivery Zone' : 'Zone Settings'}</h2>
      <p className="card-desc">
        {selectedZone
          ? 'Modify settings and save changes'
          : 'Define details for the delivery zone boundary'}
      </p>

      <form onSubmit={handleSubmit} className="zone-form" id="zone-setup-form">
        <div className="form-group">
          <label htmlFor="zone-name">
            Zone Name
            <input
              id="zone-name"
              type="text"
              className="form-control"
              placeholder="e.g. Zone A, Sadul Ganj"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginTop: '6px', display: 'block', width: '100%' }}
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="zone-city">
            City
            <input
              id="zone-city"
              type="text"
              className="form-control"
              placeholder="e.g. Bikaner, Jaipur"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ marginTop: '6px', display: 'block', width: '100%' }}
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="color-options-picker">
            Zone Overlay Color
            <div className="color-picker-list" id="color-options-picker" style={{ marginTop: '6px' }}>
              {COLOR_PALETTE.map((color) => (
                <button
                  type="button"
                  key={color.hex}
                  className={`color-option ${selectedColor === color.hex ? 'selected' : ''}`}
                  style={{ backgroundColor: color.hex, padding: 0 }}
                  onClick={() => setSelectedColor(color.hex)}
                  title={color.label}
                />
              ))}
            </div>
          </label>
        </div>

        <div className="form-group" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
          <label htmlFor="zone-status-toggle" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <span>Zone Status</span>
            <span className="switch-container">
              <input
                id="zone-status-toggle"
                type="checkbox"
                className="switch-input"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
              />
              <span className="switch-slider" />
            </span>
          </label>
        </div>

        {polygon.length === 0 ? (
          <div
            style={{
              fontSize: '12px',
              color: '#EF4444',
              backgroundColor: '#FEF2F2',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #FCA5A5',
              marginTop: '4px',
              lineHeight: 1.4,
            }}
          >
            <strong>Warning:</strong> No boundary polygon drawn. Click &quot;Draw Zone&quot; on the map toolbar to define the area.
          </div>
        ) : (
          <div
            style={{
              fontSize: '12px',
              color: '#10B981',
              backgroundColor: '#ECFDF5',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #A7F3D0',
              marginTop: '4px',
              lineHeight: 1.4,
            }}
          >
            <strong>Polygon Drawn:</strong> {polygon.length} boundary markers ready.
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
          <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
            {selectedZone ? 'Update Zone' : 'Save Zone'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleReset}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

ZoneForm.propTypes = {
  selectedZone: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    city: PropTypes.string,
    status: PropTypes.string,
    color: PropTypes.string,
    coordinates: PropTypes.array,
  }),
  polygon: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    })
  ).isRequired,
  onSave: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  selectedColor: PropTypes.string.isRequired,
  setSelectedColor: PropTypes.func.isRequired,
};
