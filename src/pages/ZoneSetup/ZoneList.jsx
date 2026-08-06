import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function ZoneList({
  zones,
  onEdit,
  onDelete,
  onToggleStatus,
  selectedZone,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuToggle = (id, e) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEditClick = (zone, e) => {
    e.stopPropagation();
    onEdit(zone);
    setOpenMenuId(null);
  };

  const handleDeleteClick = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this delivery zone? This cannot be undone.")) {
      onDelete(id);
    }
    setOpenMenuId(null);
  };

  const handleStatusToggle = (id, e) => {
    e.stopPropagation();
    onToggleStatus(id);
    setOpenMenuId(null);
  };

  return (
    <div className="right-card" ref={dropdownRef}>
      <h2>Zone List</h2>
      <p className="card-desc">Manage your configured delivery areas ({zones.length})</p>

      <div className="zone-list">
        {zones.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '14px' }}>
            No delivery zones saved yet.
          </div>
        ) : (
          zones.map((zone) => {
            const isEditing = selectedZone && selectedZone.id === zone.id;
            const isActive = zone.status === 'Active';

            return (
              <div
                key={zone.id}
                className={`zone-list-item ${isEditing ? 'editing-active' : ''}`}
                style={{
                  borderLeft: `4px solid ${zone.color}`,
                  backgroundColor: isEditing ? 'var(--primary-light)' : 'transparent',
                }}
              >
                <div className="zone-item-left">
                  <span className="color-dot" style={{ backgroundColor: zone.color }} />
                  <div className="zone-item-info">
                    <span className="zone-item-name">{zone.name}</span>
                    <span className="zone-item-sub">
                      {zone.city}
                    </span>
                  </div>
                </div>

                <div className="zone-item-right">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', marginRight: '8px' }}>
                    <span className={`badge ${isActive ? 'badge-active' : 'badge-disabled'}`}>
                      {zone.status}
                    </span>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <button
                      type="button"
                      className="menu-btn"
                      onClick={(e) => handleMenuToggle(zone.id, e)}
                      title="More actions"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>

                    {openMenuId === zone.id && (
                      <div className="dropdown-menu">
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={(e) => handleEditClick(zone, e)}
                        >
                          Edit Settings
                        </button>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={(e) => handleStatusToggle(zone.id, e)}
                        >
                          {isActive ? 'Disable Zone' : 'Enable Zone'}
                        </button>
                        <button
                          type="button"
                          className="dropdown-item delete"
                          onClick={(e) => handleDeleteClick(zone.id, e)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

ZoneList.propTypes = {
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
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleStatus: PropTypes.func.isRequired,
  selectedZone: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    city: PropTypes.string,
    status: PropTypes.string,
    color: PropTypes.string,
    coordinates: PropTypes.array,
  }),
};
