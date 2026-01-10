import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Chip, Paper, Typography } from '@mui/material';

const getSeverityColor = (severity) => {
    if (severity >= 4) return 'error'; 
    if (severity === 3) return 'warning';
    return 'success';
};

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'IncidentName', headerName: 'Incident Name', width: 250 },
    { 
        field: 'Severity', 
        headerName: 'Severity', 
        width: 120,
        renderCell: (params) => (
            <Chip 
                label={params.value >= 4 ? 'High' : 'Normal'} 
                color={getSeverityColor(params.value)} 
                size="small" 
            />
        )
    },
    { field: 'HostName', headerName: 'Host Name', width: 180 },
    { field: 'HostIp', headerName: 'IP Address', width: 150 },
    { 
        field: 'DateIn', 
        headerName: 'Date', 
        width: 200,
        valueFormatter: (params) => new Date(params.value).toLocaleString()
    },
];

const AlertsTable = ({ alerts, loading }) => {
    // DataGrid חייב שדה בשם id, אז אנחנו יוצרים אותו
    const rows = alerts.map(alert => ({
        ...alert,
        id: alert.ClientDbId
    }));

    return (
        <Paper elevation={3} sx={{ height: 600, width: '100%', p: 2, mt: 3 }}>
            <Typography variant="h6" gutterBottom>Alerts List</Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                pageSize={10}
                rowsPerPageOptions={[10, 20]}
                disableSelectionOnClick
            />
        </Paper>
    );
};

export default AlertsTable;