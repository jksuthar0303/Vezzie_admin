import React from 'react';
import PropTypes from 'prop-types';

export default function ZoneToolbar({
  activeMode,
  setActiveMode,
  onClearAll,
}) {
  const handleModeChange = (mode) => {
    // Save or cancel active leaflet-draw modes when transitioning away from them
    if (activeMode === 'edit') {
      const elSaveEdit = document.querySelector('.leaflet-draw-actions a[title="Save changes."]') || document.querySelector('.leaflet-draw-actions a[title="Save changes"]');
      if (elSaveEdit) elSaveEdit.click();
    } else if (activeMode === 'delete') {
      const elSaveDelete = document.querySelector('.leaflet-draw-actions a[title="Save changes."]') || document.querySelector('.leaflet-draw-actions a[title="Save changes"]');
      if (elSaveDelete) elSaveDelete.click();
    } else if (activeMode === 'draw') {
      const elCancelDraw = document.querySelector('.leaflet-draw-actions a[title="Cancel drawing."]') || document.querySelector('.leaflet-draw-actions a[title="Cancel drawing"]');
      if (elCancelDraw) elCancelDraw.click();
    }

    setActiveMode(mode);

    // Programmatically click Leaflet Draw buttons
    if (mode === 'draw') {
      const el = document.querySelector('.leaflet-draw-draw-polygon');
      if (el) el.click();
    } else if (mode === 'edit') {
      const el = document.querySelector('.leaflet-draw-edit-edit');
      if (el) el.click();
    } else if (mode === 'delete') {
      const el = document.querySelector('.leaflet-draw-edit-remove');
      if (el) el.click();
    } else if (mode === 'select') {
      // In select mode, clean up any active drawing or editing states
      const elCancelDraw = document.querySelector('.leaflet-draw-actions a[title="Cancel drawing."]') || document.querySelector('.leaflet-draw-actions a[title="Cancel drawing"]');
      const elEditCancel = document.querySelector('.leaflet-draw-actions a[title="Cancel editing."]') || document.querySelector('.leaflet-draw-actions a[title="Cancel editing"]');
      if (elCancelDraw) elCancelDraw.click();
      if (elEditCancel) elEditCancel.click();
    }
  };

  const handleClearAllClick = () => {
    if (window.confirm("Are you sure you want to clear the currently drawn zone?")) {
      onClearAll();
      handleModeChange('select');
    }
  };

  return (
    <>
      {/* Floating Drawing Sidebar Overlay */}
      <div className="map-custom-toolbar">
        <button
          type="button"
          className={`toolbar-item ${activeMode === 'select' ? 'active' : ''}`}
          onClick={() => handleModeChange('select')}
          title="Select and navigate"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
            <path d="M13 13l6 6" />
          </svg>
          <span>Select</span>
        </button>

        <button
          type="button"
          className={`toolbar-item ${activeMode === 'draw' ? 'active' : ''}`}
          onClick={() => handleModeChange('draw')}
          title="Draw Delivery Zone"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          <span>Draw Zone</span>
        </button>

        <button
          type="button"
          className={`toolbar-item ${activeMode === 'edit' ? 'active' : ''}`}
          onClick={() => handleModeChange('edit')}
          title="Edit Zone Points"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span>Edit Zone</span>
        </button>

        <button
          type="button"
          className={`toolbar-item ${activeMode === 'delete' ? 'active' : ''}`}
          onClick={() => handleModeChange('delete')}
          title="Delete Zone Points"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          <span>Delete Zone</span>
        </button>

        <button
          type="button"
          className="toolbar-item"
          onClick={handleClearAllClick}
          title="Clear Current Zone"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
            <line x1="12" y1="2" x2="12" y2="12" />
          </svg>
          <span>Clear All</span>
        </button>
      </div>
    </>
  );
}

ZoneToolbar.propTypes = {
  activeMode: PropTypes.string.isRequired,
  setActiveMode: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired,
};
