import React, { useState } from 'react';
import {
  Modal,
  IconButton,
  Button,
  Checkbox,
  FormControlLabel,
  Collapse,
} from '@mui/material';
import {
  Close,
  ExpandMore,
  ExpandLess,
  HighQuality,
  Cable,
  Speed,
  Colorize,
  Memory,
  ShutterSpeed,
  Sensors,
  CenterFocusStrong,
  CameraAlt,
  Storage,
} from '@mui/icons-material';
import './filter.css';

const filterOptions = [
  { title: "Max Resolution", icon: <HighQuality />, options: ["720p", "1080p", "4K", "8K"] },
  { title: "Interface", icon: <Cable />, options: ["USB 2.0", "USB 3.0", "HDMI", "Ethernet"] },
  { title: "Frame Rate", icon: <Speed />, options: ["30fps", "60fps", "120fps", "240fps"] },
  { title: "Chroma Type", icon: <Colorize />, options: ["Color", "RGB", "Monochrome"] },
  { title: "Processor", icon: <Memory />, options: ["DSP", "GPU", "CPU"] },
  { title: "Shutter Type", icon: <ShutterSpeed />, options: ["Global", "Rolling"] },
  { title: "Sensors", icon: <Sensors />, options: ["Sony IMX334", "Omnivision OV9732", "Sony IMX327"] },
  { title: "Focus Type", icon: <CenterFocusStrong />, options: ["Auto", "Manual", "Hybrid"] },
  { title: "Camera Features", icon: <Storage />, options: ["Night Vision", "HDR", "Waterproof"] },
  { title: "Enclosure", icon: <CameraAlt />, options: ["Metal", "Plastic", "IP67"] },
  { title: "On-board ISP", icon: <Memory />, options: ["Yes", "No"] },
];

const ModalFilter = ({ isOpen, onClose, selectedFilters, handleFilterChange }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerms, setSearchTerms] = useState({});

  const toggleDropdown = (index) => {
    setActiveDropdown(prev => (prev === index ? null : index));
  };

  const handleSearch = (filterTitle, value) => {
    setSearchTerms(prev => ({
      ...prev,
      [filterTitle]: value.toLowerCase()
    }));
  };

  const clearAllFilters = () => {
    setSearchTerms({});
    // Add your clear filters logic here if needed
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="ModalFilter-wrapper">
        <div className="ModalFilter-header">
          <h2>Econ Camera Filters</h2>
          <IconButton onClick={onClose}>
            <Close style={{ color: 'white' }} />
          </IconButton>
        </div>

        <div className="ModalFilter-grid">
          {filterOptions.map((filter, idx) => {
            const currentSearchTerm = searchTerms[filter.title] || '';
            const filteredOptions = filter.options.filter(option =>
              option.toLowerCase().includes(currentSearchTerm)
            );

            return (
<div
  className={`ModalFilter-card ${activeDropdown === idx ? 'active' : ''}`}
  key={filter.title}
>
                <div
                  className="ModalFilter-card-header"
                  onClick={() => toggleDropdown(idx)}
                >
                  <div className="ModalFilter-icon">{filter.icon}</div>
                  <span className="ModalFilter-title">{filter.title}</span>
                  <span className="ModalFilter-toggle">
                    {activeDropdown === idx ? <ExpandLess /> : <ExpandMore />}
                  </span>
                </div>

<Collapse in={activeDropdown === idx} timeout={200} unmountOnExit>
                  <div className="ModalFilter-options">
                    <input
                      type="text"
                      placeholder={`Search ${filter.title}...`}
                      className="ModalFilter-search"
                      value={currentSearchTerm}
                      onChange={(e) => handleSearch(filter.title, e.target.value)}
                    />
                    {filteredOptions.map((option) => (
                      <FormControlLabel
                        key={option}
                        control={
                          <Checkbox
                            checked={selectedFilters[filter.title]?.includes(option) || false}
                            onChange={() => handleFilterChange(filter.title, option)}
                            size="small"
                            color="primary"
                          />
                        }
                        label={<span className="ModalFilter-label">{option}</span>}
                        className="ModalFilter-checkbox"
                      />
                    ))}
                  </div>
                </Collapse>
              </div>
            );
          })}
        </div>

        <div className="ModalFilter-footer">
          <Button variant="outlined" onClick={clearAllFilters} className="ModalFilter-clear">
            Clear All
          </Button>
          <div>
            <Button variant="outlined" onClick={onClose} className="ModalFilter-cancel">
              Cancel
            </Button>
            <Button variant="contained" className="ModalFilter-apply" onClick={onClose}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalFilter;