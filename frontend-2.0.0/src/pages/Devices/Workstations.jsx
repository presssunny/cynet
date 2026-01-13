import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Paper,
  Button,
  useTheme,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  TextField,
  MenuItem,
  InputAdornment,
  Drawer,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import { getHostsOverview } from "../../api/cynet";
import StatCard from "../../Components/StatCard";
import StatusPill from "../../Components/StatusPill";
import RiskChip from "../../Components/RiskChip";
import ServerDetailsPanel from "./Components/ServerDetailsPanel";
import { formatDateYYYYMMDD, formatTimeHHMM, safeStr } from "./utils";

const FiltersActionsBar = ({
  search,
  setSearch,
  department,
  setDepartment,
  status,
  setStatus,
  departmentOptions,
  onRunHealthCheck,
  onExport,
  onDisable,
}) => {
  const theme = useTheme();

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      bgcolor: theme.palette.background.paper,
      "& fieldset": { borderColor: theme.palette.divider },
    },
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
      <TextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search server..."
        size="medium"
        sx={{ ...inputSx, flex: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon sx={{ color: theme.palette.text.secondary }} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        sx={{ ...inputSx, flex: 1 }}
        SelectProps={{ displayEmpty: true }}
      >
        <MenuItem value="">IP Address</MenuItem>
        {departmentOptions.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ ...inputSx, flex: 1 }}
        SelectProps={{ displayEmpty: true }}
      >
        <MenuItem value="">Status</MenuItem>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="locked">Locked</MenuItem>
        <MenuItem value="at_risk">At Risk</MenuItem>
      </TextField>

      <Button
        variant="outlined"
        startIcon={<PlayArrowRoundedIcon />}
        onClick={onRunHealthCheck}
        sx={{
          height: 56,
          borderColor: theme.palette.divider,
          color: theme.palette.text.primary,
          whiteSpace: "nowrap",
        }}
      >
        Run Health Check
      </Button>
      <Button
        variant="outlined"
        startIcon={<DownloadRoundedIcon />}
        onClick={onExport}
        sx={{
          height: 56,
          borderColor: theme.palette.divider,
          color: theme.palette.text.primary,
        }}
      >
        Export
      </Button>
      <Button
        variant="outlined"
        startIcon={<BlockRoundedIcon />}
        onClick={onDisable}
        sx={{
          height: 56,
          borderColor: theme.palette.divider,
          color: theme.palette.text.primary,
        }}
      >
        Disable
      </Button>
    </Stack>
  );
};

function pickOsShort(host) {
  const tlOs = host?.threatlocker?.operatingSystem;
  const cyOs = host?.cynet?.OperatingSystem;
  const osFull = tlOs || cyOs || "—";
  const lower = safeStr(osFull).toLowerCase();
  if (lower.includes("windows")) return { os: "Windows", osFull };
  if (
    lower.includes("linux") ||
    lower.includes("ubuntu") ||
    lower.includes("debian") ||
    lower.includes("rocky")
  )
    return { os: "Linux", osFull };
  return { os: osFull === "—" ? "—" : "Other", osFull };
}

function pickIp(host) {
  const cyIp = host?.cynet?.LastIp;
  const tlIp = host?.threatlocker?.lastCheckinIPAddress;
  return cyIp || tlIp || "—";
}

function computeStatus(host) {
  const tlMode = safeStr(host?.threatlocker?.mode).toLowerCase();
  const isLocked =
    tlMode.includes("lock") ||
    host?.threatlocker?.isLockDownMode === true ||
    host?.threatlocker?.isLockedOut === true;

  if (isLocked) return "locked";

  const isStale = host?.isStale === true;

  const riskLevel = Number(host?.cynet?.RiskLevel);
  const hasRisk = Number.isFinite(riskLevel);

  if (isStale) return "at_risk";
  if (hasRisk && riskLevel >= 400) return "at_risk";

  return "active";
}

function computeRisk(host) {
  const riskLevel = Number(host?.cynet?.RiskLevel);

  if (Number.isFinite(riskLevel)) {
    if (riskLevel >= 700) return "critical";
    if (riskLevel >= 400) return "high";
    if (riskLevel >= 200) return "medium";
    return "low";
  }

  if (host?.isStale) return "critical";
  if (host?.hasCY === false || host?.hasTL === false) return "high";
  return "low";
}

function mapApiHostToRow(h) {
  const hostname = h?.hostname || "—";
  const id = safeStr(h?.hostnameKey || hostname || Math.random());

  const { os, osFull } = pickOsShort(h);

  const lastSeen = h?.lastSeen;
  const lastAuditDate = lastSeen ? formatDateYYYYMMDD(lastSeen) : "—";
  const lastAuditTime = lastSeen ? formatTimeHHMM(lastSeen) : "—";

  const cpuLoad =
    typeof h?.cynet?.TotalCPUPercentage === "number"
      ? Math.max(0, Math.min(100, Math.round(h.cynet.TotalCPUPercentage)))
      : null;

  const memory =
    typeof h?.cynet?.MemoryPercentage === "number"
      ? Math.max(0, Math.min(100, Math.round(h.cynet.MemoryPercentage)))
      : null;

  const lastPatch =
    h?.cynet?.LastUpdate || h?.threatlocker?.threatLockerVersion || "—";

  const alertsParts = [];
  if (h?.hasCY === false) alertsParts.push("Cynet missing");
  if (h?.hasTL === false) alertsParts.push("ThreatLocker missing");
  if (h?.isStale === true) alertsParts.push("Host is stale/offline");
  const riskLevel = Number(h?.cynet?.RiskLevel);
  if (Number.isFinite(riskLevel) && riskLevel >= 400) {
    alertsParts.push(`High risk score (${riskLevel})`);
  }
  const alerts = alertsParts.length ? alertsParts.join(", ") : "—";

  const owner = "—";

  const ip = pickIp(h);
  const department = ip;

  const status = computeStatus(h);
  const risk = computeRisk(h);

  return {
    id,
    server: hostname,
    department,
    status,
    os,
    osFull,
    lastAuditDate,
    lastAuditTime,
    risk,
    cpuLoad,
    memory,
    lastPatch: safeStr(lastPatch),
    owner,
    alerts,
    __raw: h,
  };
}

// --------------------
// MAIN WIDGET
// --------------------
const Workstations = () => {
  const theme = useTheme();

  // Pagination config
  const PAGE_SIZE = 10;

  // State
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState(""); // IP filter
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState({});
  const [page, setPage] = useState(1);

  // right panel state (null => hidden)
  const [activeServerId, setActiveServerId] = useState(null);

  // API data state
  const [hostsOverview, setHostsOverview] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const data = await getHostsOverview({});
        setHostsOverview(data);

        const apiHosts = Array.isArray(data?.hosts) ? data.hosts : [];
        const mappedRows = apiHosts
          .filter((h) => h?.threatlocker?.group === "Workstations")
          .map(mapApiHostToRow);
        setRows(mappedRows);
        console.log("Fetched and mapped hosts:", mappedRows);

        setActiveServerId((prev) => {
          if (!prev) return prev;
          const exists = mappedRows.some((r) => r.id === prev);
          return exists ? prev : null;
        });
      } catch (error) {
        console.error("Error fetching hosts overview:", error);
      }
    };
    fetchHosts();
  }, []);

  const activeServer = useMemo(() => {
    return rows.find((r) => r.id === activeServerId) || null;
  }, [activeServerId, rows]);

  // Derived
  const departmentOptions = useMemo(() => {
    return Array.from(new Set(rows.map((r) => r.department)))
      .filter((x) => x && x !== "—")
      .sort();
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchSearch = row.server
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchIP = department ? row.department === department : true;
      const matchStatus = status ? row.status === status : true;
      return matchSearch && matchIP && matchStatus;
    });
  }, [rows, search, department, status]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, department, status]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  }, [filteredRows.length]);

  // Keep page within bounds
  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const pagedRows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredRows.slice(start, start + PAGE_SIZE);
  }, [filteredRows, page]);

  const rangeStart = filteredRows.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, filteredRows.length);

  const toggleAll = (checked) => {
    const newSelected = {};
    if (checked) {
      filteredRows.forEach((r) => (newSelected[r.id] = true));
    }
    setSelected(newSelected);
  };

  const toggleOne = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isAllSelected =
    filteredRows.length > 0 && filteredRows.every((r) => selected[r.id]);
  const isIndeterminate =
    filteredRows.some((r) => selected[r.id]) && !isAllSelected;

  // Handlers for panel actions
  const onRunHealthCheck = (server) => console.log("Run check:", server?.id);
  const onExport = (server) => console.log("Export:", server?.id);
  const onDisable = (server) => console.log("Disable:", server?.id);

  // Stats
  const summary = rows || null;

  const totalServers = summary?.totalHosts ?? rows.length;

  const offlineInactive =
    summary?.staleOverThreshold ?? rows.filter((r) => r.__raw?.isStale).length;

  const activeConnected =
    summary?.totalHosts != null
      ? totalServers - (summary?.staleOverThreshold ?? 0)
      : rows.filter((r) => !r.__raw?.isStale).length;

  const nonCompliant =
    summary?.missingCY != null || summary?.missingTL != null
      ? (summary?.missingCY ?? 0) + (summary?.missingTL ?? 0)
      : rows.filter((r) => r.__raw?.hasCY === false || r.__raw?.hasTL === false)
          .length;

  // ----------------
  // Render
  // ----------------
  return (
    <Box sx={{ width: "100%", p: 2 }}>
      {/* 1. Top Cards Section */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
        <Box flex={1}>
          <StatCard label="Total Workstations:" value={String(totalServers)} />
        </Box>
        <Box flex={1}>
          <StatCard
            label="Active / Connected:"
            value={String(activeConnected)}
          />
        </Box>
        <Box flex={1}>
          <StatCard
            label="Offline / Inactive"
            value={String(offlineInactive)}
          />
        </Box>
        <Box flex={1}>
          <StatCard
            label="Non-compliant Workstations:"
            value={String(nonCompliant)}
          />
        </Box>
      </Stack>

      {/* 2. Filters */}
      <FiltersActionsBar
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        status={status}
        setStatus={setStatus}
        departmentOptions={departmentOptions}
        onRunHealthCheck={() => activeServer && onRunHealthCheck(activeServer)}
        onExport={() => activeServer && onExport(activeServer)}
        onDisable={() => activeServer && onDisable(activeServer)}
      />

      {/* 3. Table (Now full width, no stack needed) */}
      <Paper
        elevation={0}
        sx={{
          overflow: "hidden",
          mb: 2, // Spacing for pagination
        }}
      >
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={isIndeterminate}
                  checked={isAllSelected}
                  onChange={(e) => toggleAll(e.target.checked)}
                  color="primary"
                />
              </TableCell>
              <TableCell>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  color="text.secondary"
                >
                  Workstation
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  color="text.secondary"
                >
                  IP Address
                </Typography>
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    color="text.secondary"
                  >
                    Status
                  </Typography>
                  <SwapVertRoundedIcon fontSize="small" color="action" />
                </Stack>
              </TableCell>
              <TableCell>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  color="text.secondary"
                >
                  OS
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  color="text.secondary"
                >
                  Last Audit
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  color="text.secondary"
                >
                  Risk Level
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pagedRows.map((row) => {
              const isActive = row.id === activeServerId;

              return (
                <TableRow
                  key={row.id}
                  hover
                  selected={!!selected[row.id] || isActive}
                  onClick={() => setActiveServerId(row.id)}
                  sx={{
                    cursor: "pointer",
                    "&.Mui-selected": {
                      bgcolor: theme.palette.action.selected,
                    },
                    "&.Mui-selected:hover": {
                      bgcolor: theme.palette.action.hover,
                    },
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={!!selected[row.id]}
                      onChange={() => toggleOne(row.id)}
                      onClick={(e) => e.stopPropagation()}
                      color="primary"
                    />
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body2"
                      fontWeight={800}
                      color="text.primary"
                    >
                      {row.server}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" color="text.primary">
                      {row.department}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <StatusPill value={row.status} />
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" color="text.primary">
                      {row.os}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="text.primary"
                      >
                        {row.lastAuditDate}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {row.lastAuditTime}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <RiskChip value={row.risk} />
                  </TableCell>
                </TableRow>
              );
            })}

            {pagedRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    No servers found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* 4. Pagination Footer */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 2 }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {rangeStart} - {rangeEnd} of {filteredRows.length} servers
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            variant="outlined"
            startIcon={<KeyboardArrowLeftRoundedIcon />}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            sx={{
              borderColor: theme.palette.divider,
              color: theme.palette.text.primary,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Previous
          </Button>

          <Typography
            variant="body2"
            fontWeight={600}
            color="text.secondary"
            sx={{ mx: 1 }}
          >
            Page {page} of {totalPages}
          </Typography>

          <Button
            variant="outlined"
            endIcon={<KeyboardArrowRightRoundedIcon />}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            sx={{
              borderColor: theme.palette.divider,
              color: theme.palette.text.primary,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Next
          </Button>
        </Stack>
      </Stack>

      {/* 5. Modern Side Menu (Drawer) */}
      <Drawer
        anchor="right"
        open={!!activeServerId}
        onClose={() => setActiveServerId(null)}
        PaperProps={{
          sx: {
            boxShadow: theme.shadows[10],
          },
        }}
      >
        <ServerDetailsPanel
          server={activeServer}
          onClose={() => setActiveServerId(null)}
          onRunHealthCheck={onRunHealthCheck}
          onExport={onExport}
          onDisable={onDisable}
        />
      </Drawer>
    </Box>
  );
};

export default Workstations;
