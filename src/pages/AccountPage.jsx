// import { useEffect, useState } from 'react';
// import { Container, Typography } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import axios from 'axios';

// const columns = [
//     { field: 'companyName', headerName: 'Company Name', flex: 1 },
//     { field: 'customerName', headerName: 'Customer Name', flex: 1 },
//     { field: 'billingInstruction', headerName: 'Billing Instruction', flex: 1 },
//     {
//         field: 'totalCost',
//         headerName: 'Total Cost (₹)',
//         flex: 1,

//     },
//     { field: 'nextBillingDate', headerName: 'Next Billing Date', flex: 1 },
//     {
//         field: 'status',
//         headerName: 'Status',
//         flex: 1,
//         renderCell: (params) => (
//             <span style={{
//                 color: params.value === 'Paid' ? 'green' : 'red',
//                 fontWeight: 600,
//             }}>
//                 {params.value}
//             </span>
//         ),
//     },
// ];

// export default function AccountPage() {
//     const [billingData, setBillingData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('/api/billing');

//                 if (Array.isArray(response.data)) {
//                     const formatted = response.data.map((item, index) => ({
//                         id: item._id || index,
//                         companyName: item.customerId?.companyName || "N/A",
//                         customerName: item.customerId?.customerName || "N/A",
//                         billingInstruction: item.customerId?.billingInstructions || "N/A",
//                         totalCost: item.totalCost || 0,
//                         nextBillingDate: item.nextBillingDate
//                             ? new Date(item.nextBillingDate).toLocaleDateString()
//                             : "N/A",
//                         status: item.status || "Pending"
//                     }));

//                     setBillingData(formatted);
//                 } else {
//                     console.error("Unexpected API response format:", response.data);
//                     setBillingData([]);
//                 }
//             } catch (error) {
//                 console.error("Error fetching account data:", error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <Container maxWidth="lg" sx={{ mt: 4 }}>
//             <Typography variant="h4" gutterBottom>
//                 Accounts Dashboard
//             </Typography>

//             <div style={{ height: 500, width: '100%' }}>
//                 <DataGrid
//                     rows={billingData}
//                     columns={columns}
//                     pageSize={5}
//                     rowsPerPageOptions={[5, 10, 20]}
//                 />
//             </div>
//         </Container>
//     );
// }


// import { useEffect, useState } from "react";
// import { Container, Typography, Button, TextField, Box } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import axios from "axios";

// export default function AccountPage() {
//     const [billingData, setBillingData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");

//     const handleStatusToggle = (id) => {
//         setBillingData((prevData) =>
//             prevData.map((item) =>
//                 item.id === id
//                     ? {
//                         ...item,
//                         status: item.status === "Paid" ? "Pending" : "Paid",
//                     }
//                     : item
//             )
//         );
//     };

//     const columns = [
//         { field: "companyName", headerName: "Company Name", flex: 1 },
//         { field: "billingInstruction", headerName: "Billing Instruction", flex: 1 },
//         {
//             field: "totalCost",
//             headerName: "Total Cost (₹)",
//             flex: 1,
//             // valueFormatter: (params) => {
//             //   const value = params.value;
//             //   return typeof value === "number" ? ₹${value.toLocaleString()} : "₹0";
//             // },
//         },
//         { field: "nextBillingDate", headerName: "Next Billing Date", flex: 1 },
//         { field: "ip", headerName: "IP Address", flex: 1 },
//         { field: "config", headerName: "Config", flex: 1 },
//         { field: "port", headerName: "Port Number", flex: 1 },
//         {
//             field: "status",
//             headerName: "Status",
//             flex: 1,
//             sortable: false,
//             renderCell: (params) => (
//                 <Button
//                     variant="contained"
//                     size="small"
//                     onClick={(event) => {
//                         event.stopPropagation(); // Prevent row selection
//                         handleStatusToggle(params.row.id);
//                     }}
//                     style={{
//                         backgroundColor: params.value === "Paid" ? "#a9c52f" : "#c13131",
//                         color: "white",
//                         fontWeight: 600,
//                         textTransform: "none",
//                         borderRadius: 8,
//                         boxShadow: "none",
//                     }}
//                 >
//                     {params.value}
//                 </Button>
//             ),
//         },
//     ];

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("/api/billing");

//                 if (Array.isArray(response.data)) {
//                     const formatted = response.data.map((item, index) => {
//                         const dateObj = item.nextBillingDate
//                             ? new Date(item.nextBillingDate)
//                             : null;
//                         return {
//                             id: item._id || index,
//                             companyName: item.customerId?.companyName || "N/A",
//                             billingInstruction: item.customerId?.billingInstructions || "N/A",
//                             //   totalCost: item.totalCost || 0,
//                             totalCost: item.customerId?.yearlyCost || 0,

//                             nextBillingDate: dateObj ? dateObj.toLocaleDateString() : "N/A",
//                             nextBillingRaw: dateObj?.toISOString().split("T")[0] || "", // ISO format
//                             status: item.status || "Pending",
//                             ip: item.ip || "N/A",
//                             config: item.config || "N/A",
//                             port: item.port || "N/A",
//                         };
//                     });

//                     setBillingData(formatted);
//                 } else {
//                     console.error("Unexpected API response format:", response.data);
//                     setBillingData([]);
//                 }
//             } catch (error) {
//                 console.error("Error fetching account data:", error);
//             }
//         };

//         fetchData();
//     }, []);

//     useEffect(() => {
//         if (!startDate && !endDate) {
//             setFilteredData(billingData);
//         } else {
//             const start = startDate ? new Date(startDate) : new Date("1970-01-01");
//             const end = endDate ? new Date(endDate) : new Date("9999-12-31");

//             const filtered = billingData.filter((item) => {
//                 const billingDate = new Date(item.nextBillingRaw);
//                 return billingDate >= start && billingDate <= end;
//             });

//             setFilteredData(filtered);
//         }
//     }, [startDate, endDate, billingData]);

//     return (
//         <Container maxWidth="lg" sx={{ mt: 4 }}>
//             <Typography variant="h4" gutterBottom>
//                 Accounts Dashboard
//             </Typography>

//             <Box sx={{ mb: 2, display: "flex", gap: 2, alignItems: "center" }}>
//                 <TextField
//                     type="date"
//                     label="Start Date"
//                     InputLabelProps={{ shrink: true }}
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                 />
//                 <TextField
//                     type="date"
//                     label="End Date"
//                     InputLabelProps={{ shrink: true }}
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                 />
//                 <Button
//                     variant="outlined"
//                     onClick={() => {
//                         setStartDate("");
//                         setEndDate("");
//                     }}
//                 >
//                     Clear Filter
//                 </Button>
//             </Box>

//             <div style={{ height: 500, width: "100%" }}>
//                 <DataGrid
//                     rows={filteredData}
//                     columns={columns}
//                     pageSize={5}
//                     rowsPerPageOptions={[5, 10, 20]}
//                     disableSelectionOnClick
//                 />
//             </div>
//         </Container>
//     );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Switch,
    Typography,
} from "@mui/material";

const AccountPage = () => {
    const [billingData, setBillingData] = useState([]);

    // Fetch billing data
    useEffect(() => {
        const fetchBillingData = async () => {
            try {
                const response = await axios.get("/api/billing");
                const flattenedData = [];

                response.data.forEach((billingDoc) => {
                    billingDoc.services.forEach((service, index) => {
                        flattenedData.push({
                            id: `${billingDoc._id}-${index}`,
                            companyName: billingDoc.companyName,
                            serviceName: service.serviceName,
                            billingInstruction: service.billingInstruction,
                            cost: service.cost,
                            nextBillingDate: new Date(service.nextBillingDate).toLocaleDateString(),
                            status: service.status,
                            billingId: billingDoc._id,
                            serviceIndex: index,
                        });
                    });
                });

                setBillingData(flattenedData);
            } catch (err) {
                console.error("Failed to fetch billing data", err);
            }
        };

        fetchBillingData();
    }, []);

    // Toggle status and persist to backend
    const handleStatusToggle = async (rowId) => {
        const updatedRows = billingData.map((item) => {
            if (item.id === rowId) {
                const newStatus = item.status === "Paid" ? "Pending" : "Paid";

                axios
                    .patch(`/api/billing/${item.billingId}/service/${item.serviceIndex}`, {
                        status: newStatus,
                    })
                    .then(() => {
                        console.log("Status updated successfully");
                    })
                    .catch((err) => {
                        console.error("Failed to update status", err);
                    });

                return { ...item, status: newStatus };
            }
            return item;
        });

        setBillingData(updatedRows);
    };

    return (
        <div style={{ padding: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                Accounts - Billing Overview
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead style={{ backgroundColor: "#f5f5f5" }}>
                        <TableRow>
                            <TableCell>Company Name</TableCell>
                            <TableCell>Service</TableCell>
                            <TableCell>Billing Instruction</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Next Billing Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {billingData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.companyName}</TableCell>
                                <TableCell>{row.serviceName}</TableCell>
                                <TableCell>{row.billingInstruction}</TableCell>
                                <TableCell>₹{row.cost}</TableCell>
                                <TableCell>{row.nextBillingDate}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={row.status === "Paid"}
                                        onChange={() => handleStatusToggle(row.id)}
                                        color="primary"
                                    />
                                    {row.status}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AccountPage;
