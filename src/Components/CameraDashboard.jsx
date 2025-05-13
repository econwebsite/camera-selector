import React, { useState } from 'react';
import {
  TextField,
  Button,
  IconButton,
  Typography,
  Checkbox,
  FormControlLabel,
  Collapse
} from '@mui/material';
import { Sensors } from '@mui/icons-material';

import { ArrowUpward } from '@mui/icons-material';
import CameraDetailCard from './Datacomp/Datacomp';
import {
  FilterList,
  Settings,
  Speed,
  Colorize,
  Memory,
  Lens,
  HighQuality,
  Cable,
} from '@mui/icons-material';

import './CameraDashboard.css';
const filterOptions = [
  {
    title: "Resolution",
    icon: <HighQuality fontSize="small" />, 
    options: ["720p", "1080p", "4K", "8K"]
  },
  {
    title: "Interface",
    icon: <Cable fontSize="small" />, 
    options: ["USB 2.0", "USB 3.0", "HDMI", "Ethernet"]
  },
  {
    title: "Frame Rate",
    icon: <Speed fontSize="small" />,
    options: ["30fps", "60fps", "120fps", "240fps"]
  },
  {
    title: "Chroma",
    icon: <Colorize fontSize="small" />,
    options: ["Color", "RGB", "Monochrome"]
  },
  {
    title: "Onboard ISP",
    icon: <Memory fontSize="small" />,
    options: ["Yes", "No"]
  },
  {
    title: "Sensor",
    icon: <Sensors fontSize="small" />, 
    options: ["Sony IMX334", "Omnivision OV9732", "Sony IMX327"]
  }
];


const CameraDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [openFilter, setOpenFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return;

    if (!searchHistory.includes(term)) {
      setSearchHistory([term, ...searchHistory]);
    }

    setSelectedId(term);
    setSearchTerm('');
  };

  const handleHistoryClick = (term) => {
    setSelectedId(term);
    setSearchTerm(term);
  };

  const handleNewSearch = () => {
    setSearchTerm('');
    setSelectedId(null);
    setSearchHistory([]);
    setSelectedFilters({});
  };

  const handleFilterToggle = (filterTitle) => {
    setOpenFilter(openFilter === filterTitle ? null : filterTitle);
  };

  const handleFilterChange = (filterTitle, option) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterTitle]: prev[filterTitle]?.includes(option)
        ? prev[filterTitle].filter(item => item !== option)
        : [...(prev[filterTitle] || []), option]
    }));
  };

  return (
    <div className="dashboard-container">
      {/* Left Sidebar */}
      <div className="left-sidebar">
        <div className="sidebar-header">
          <Typography variant="h6" className="sidebar-title">Context</Typography>
        </div>
        
        <div className='Total-history'>
          <div className="history-list">
            {searchHistory.map((item, idx) => (
              <div
                key={idx}
                className="history-item"
                onClick={() => handleHistoryClick(item)}
              >
                <Typography variant="body2" className="history-text">
                  {item}
                </Typography>
                <div className="hover-indicator"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
  <div className="filter-header">
    <FilterList fontSize="small" />
    <Typography variant="subtitle1" className="filter-title">
      Filters
    </Typography>
  </div>

  <div className="filter-content">
    {filterOptions.map((filter) => (
      <div key={filter.title} className="filter-group">
        <div className="filter-group-header" onClick={() => handleFilterToggle(filter.title)}>
          {filter.icon}
          <Typography variant="body2" className="filter-group-title">
            {filter.title}
          </Typography>
        </div>

        <Collapse in={openFilter === filter.title}>
          <div className="filter-options">
            {filter.options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    size="small"
                    checked={selectedFilters[filter.title]?.includes(option) || false}
                    onChange={() => handleFilterChange(filter.title, option)}
                    color="primary"
                  />
                }
                label={option}
                className="filter-option"
              />
            ))}
          </div>
        </Collapse>
      </div>
    ))}
  </div>
</div>

      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="center-content">
          <CameraDetailCard 
            filter={selectedId} 
            selectedFilters={selectedFilters}
          />
        </div>

        {/* Bottom Search Bar */}
        <div className="bottom-search-container">
          <div className="search-wrapper">
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Search camera types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                className: 'search-input',
                endAdornment: (
                  <IconButton
                    onClick={handleSearch}
                    className="search-button"
                    disableRipple
                  >
                    <ArrowUpward className="arrow-icon" />
                  </IconButton>
                ),
              }}
            />
            <Button
              variant="contained"
              className="new-search-button"
              onClick={handleNewSearch}
            >
              New Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraDashboard;