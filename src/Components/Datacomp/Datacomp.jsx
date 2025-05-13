import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@mui/material';
import './data.css';

const CameraDetailTable = ({ filter, selectedFilters }) => {
  const fieldKeyMap = {
    'Product Name': 'product',
    'Sensor': 'sensor',
    'Resolution': 'resolution',
    'Frame Rate': 'framerate',
    'Chroma': 'chroma',
    'Interface': 'interface',
    'Temperature': 'temperature',
    'Onboard ISP': 'isp',
  };

  const cameraData = [
    {
      id: '4k',
      product: 'STURDeCAM88',
      sensor: 'OX08B40',
      resolution: '8.3 MP',
      framerate: '30fps',
      chroma: 'Color',
      interface: 'GMSL2',
      temperature: '-40°C to 85°C',
      isp: 'Yes',
    },
    {
      id: '3MP',
      product: 'See3CAM_37CUGM',
      sensor: 'IMX900',
      resolution: '3.0 MP',
      framerate: '72FPS',
      chroma: 'Monochrome',
      interface: 'USB 3.0',
      temperature: '-30°C to 75°C',
      isp: 'Yes',
    },
    {
      id: '4k',
      product: 'See3CAM_CU83',
      sensor: 'AR0830',
      resolution: '8.0 MP',
      framerate: '30fps',
      chroma: 'Color & NIR',
      interface: 'USB 3.0',
      temperature: '-20°C to 65°C',
      isp: 'Yes',
    },
    {
      id: 'HDR',
      product: 'See3CAM_CU81',
      sensor: 'AR0821',
      resolution: '8.0 MP',
      framerate: '60fps',
      chroma: 'Color',
      interface: 'USB 3.0',
      temperature: '30°C to 70°C',
      isp: 'No',
    },
     {
      id: 'HDR',
      product: 'See3CAM_CU81',
      sensor: 'AR0821',
      resolution: '8.0 MP',
      framerate: '60fps',
      chroma: 'Color',
      interface: 'USB 3.0',
      temperature: '30°C to 70°C',
      isp: 'No',
    }, {
      id: 'HDR',
      product: 'See3CAM_CU81',
      sensor: 'AR0821',
      resolution: '8.0 MP',
      framerate: '60fps',
      chroma: 'Color',
      interface: 'USB 3.0',
      temperature: '30°C to 70°C',
      isp: 'No',
    }, {
      id: 'HDR',
      product: 'See3CAM_CU81',
      sensor: 'AR0821',
      resolution: '8.0 MP',
      framerate: '60fps',
      chroma: 'Color',
      interface: 'USB 3.0',
      temperature: '30°C to 70°C',
      isp: 'No',
    }, {
      id: 'HDR',
      product: 'See3CAM_CU81',
      sensor: 'AR0821',
      resolution: '8.0 MP',
      framerate: '60fps',
      chroma: 'Color',
      interface: 'USB 3.0',
      temperature: '30°C to 70°C',
      isp: 'No',
    }, {
      id: 'HDR',
      product: 'See3CAM_CU81',
      sensor: 'AR0821',
      resolution: '8.0 MP',
      framerate: '60fps',
      chroma: 'Color',
      interface: 'USB 3.0',
      temperature: '30°C to 70°C',
      isp: 'No',
    }, {
      id: 'HDR',
      product: 'See3CAM_CU81',
      sensor: 'AR0821',
      resolution: '8.0 MP',
      framerate: '60fps',
      chroma: 'Color',
      interface: 'USB 3.0',
      temperature: '30°C to 70°C',
      isp: 'No',
    }, {
      id: 'HDR',
      product: 'See3CAM_CU81',
      sensor: 'AR0821',
      resolution: '8.0 MP',
      framerate: '60fps',
      chroma: 'Color',
      interface: 'USB 3.0',
      temperature: '30°C to 70°C',
      isp: 'No',
    }, {
      id: 'HDR',
      product: 'See3CAM_CU81',
      sensor: 'AR0821',
      resolution: '8.0 MP',
      framerate: '60fps',
      chroma: 'Color',
      interface: 'USB 3.0',
      temperature: '30°C to 70°C',
      isp: 'No',
    }, {
      id: 'HDR',
      product: 'See3CAM_CU81',
      sensor: 'AR0821',
      resolution: '8.0 MP',
      framerate: '60fps',
      chroma: 'Color',
      interface: 'USB 3.0',
      temperature: '30°C to 70°C',
      isp: 'No',
    }, {
      id: 'HDR',
      product: 'See3CAM_CU81',
      sensor: 'AR0821',
      resolution: '8.0 MP',
      framerate: '60fps',
      chroma: 'Color',
      interface: 'USB 3.0',
      temperature: '30°C to 70°C',
      isp: 'No',
    },
  ];

  const matchesSearch = (item) => {
    if (!filter) return true;
    return Object.values(item).join(' ').toLowerCase().includes(filter.toLowerCase());
  };

  const matchesFilters = (item) => {
    return Object.entries(selectedFilters).every(([filterTitle, values]) => {
      if (!values.length) return true;
      const key = fieldKeyMap[filterTitle];
      if (!key) return true;
      const itemValue = String(item[key] || '').toLowerCase();
      return values.some((val) => itemValue === val.toLowerCase());
    });
  };

  const filteredData = cameraData.filter(
    (item) => matchesSearch(item) && matchesFilters(item)
  );

  if (filteredData.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary">
        No matching data found.
      </Typography>
    );
  }

  return (
    <div className="table-container">
      <Table className="camera-detail-table">
         <TableHead>
        <TableRow>
          <TableCell className="table-header" style={{ width: '18%' }}>Product Name</TableCell>
          <TableCell className="table-header" style={{ width: '10%' }}>Sensor</TableCell>
          <TableCell className="table-header" style={{ width: '10%' }}>Resolution</TableCell>
          <TableCell className="table-header" style={{ width: '10%' }}>Frame Rate</TableCell>
          <TableCell className="table-header" style={{ width: '12%' }}>Chroma</TableCell>
          <TableCell className="table-header" style={{ width: '10%' }}>Interface</TableCell>
          <TableCell className="table-header" style={{ width: '10%' }}>Temperature</TableCell>
          <TableCell className="table-header" style={{ width: '10%' }}>Onboard ISP</TableCell>
        </TableRow>
      </TableHead>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item.id} className="table-row">
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.sensor}</TableCell>
              <TableCell>{item.resolution}</TableCell>
              <TableCell>{item.framerate}</TableCell>
              <TableCell>{item.chroma}</TableCell>
              <TableCell>{item.interface}</TableCell>
              <TableCell>{item.temperature}</TableCell>
              <TableCell>{item.isp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CameraDetailTable;
