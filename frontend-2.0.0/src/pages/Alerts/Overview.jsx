import {
  Box,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Chip,
} from "@mui/material";

const Overview = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Alert Name</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Alert rows will go here */}
            <TableRow>
              <TableCell>High CPU Usage</TableCell>
              <TableCell>High</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>2024-06-15 10:30 AM</TableCell>
              <TableCell>
                <Chip label="View Details" color="primary" clickable />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>High CPU Usage</TableCell>
              <TableCell>High</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>2024-06-15 10:30 AM</TableCell>
              <TableCell>
                <Chip label="View Details" color="primary" clickable />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>High CPU Usage</TableCell>
              <TableCell>High</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>2024-06-15 10:30 AM</TableCell>
              <TableCell>
                <Chip label="View Details" color="primary" clickable />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>High CPU Usage</TableCell>
              <TableCell>High</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>2024-06-15 10:30 AM</TableCell>
              <TableCell>
                <Chip label="View Details" color="primary" clickable />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>High CPU Usage</TableCell>
              <TableCell>High</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>2024-06-15 10:30 AM</TableCell>
              <TableCell>
                <Chip label="View Details" color="primary" clickable />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>High CPU Usage</TableCell>
              <TableCell>High</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>2024-06-15 10:30 AM</TableCell>
              <TableCell>
                <Chip label="View Details" color="primary" clickable />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default Overview;
