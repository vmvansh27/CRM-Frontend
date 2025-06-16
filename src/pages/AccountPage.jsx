// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Typography,
//     Button,
//     TextField,
//     Box,
// } from "@mui/material";

// const AccountPage = () => {
//     const [billingData, setBillingData] = useState([]);

//     const [filteredData, setFilteredData] = useState([]);

//     const [fromDate, setFromDate] = useState("");
//     const [toDate, setToDate] = useState("");

//     useEffect(() => {
//         fetchBillingData();
//     }, []);

//     const fetchBillingData = async () => {
//         try {
//             const response = await axios.get("/api/billing");

//             // Transform into a flat array first
//             const flattened = [];

//             response.data?.forEach((billing) => {
//                 billing.services?.forEach((service, index) => {
//                     flattened.push({
//                         id: `${billing._id}-${index}`,
//                         billingId: billing._id,
//                         serviceIndex: index,
//                         companyName: billing.companyName || "Unknown",
//                         customerName: billing.customerName || "Unknown",
//                         email: billing.email || "Unknown",
//                         phone: billing.mobile || "Unknown",
//                         filledBy: billing.filledBy || "Unknown",
//                         serviceName: service.serviceName,
//                         billingInstruction: service.billingInstruction,
//                         costPrice: service.costPrice,
//                         sellingPrice: service.sellingPrice,
//                         cost: service.cost,
//                         installment: service.installment,
//                         billingDate: new Date(service.nextBillingDate),
//                         status: service.status,
//                     });
//                 });
//             });

//             setBillingData(flattened);
//             setFilteredData(flattened);
//         } catch (err) {
//             console.error("Failed to fetch billing data", err);
//         }
//     };

//     const handleFilter = () => {
//         if (!fromDate || !toDate) return;

//         const from = new Date(fromDate);
//         const to = new Date(toDate);
//         to.setHours(23, 59, 59, 999); // Include whole day

//         const filtered = billingData.filter((item) => {
//             const billingDate = new Date(item.billingDate);
//             return billingDate >= from && billingDate <= to;
//         });

//         setFilteredData(filtered);
//     };

//     const handleClearClick = async (billingId, serviceIndex) => {
//         try {
//             await axios.patch(`/api/billing/${billingId}/service/${serviceIndex}`);

//             // After clearing, refresh the data from API
//             await fetchBillingData();

//         } catch (err) {
//             console.error("Failed to clear service", err);
//         }
//     };

//     const formatDate = (date) =>
//         new Date(date).toLocaleDateString("en-IN", {
//             year: "numeric",
//             month: "short",
//             day: "numeric",
//         });

//     return (
//         <div style={{ padding: "2rem" }}>
//             <Typography variant="h4" gutterBottom>
//                 Accounts - Billing Overview
//             </Typography>

//             <Box display="flex" gap={2} mb={3}>
//                 <TextField
//                     type="date"
//                     label="From"
//                     InputLabelProps={{ shrink: true }}
//                     value={fromDate}
//                     onChange={(e) => setFromDate(e.target.value)}
//                 />
//                 <TextField
//                     type="date"
//                     label="To"
//                     InputLabelProps={{ shrink: true }}
//                     value={toDate}
//                     onChange={(e) => setToDate(e.target.value)}
//                 />
//                 <Button variant="contained" color="primary" onClick={handleFilter}>
//                     Filter
//                 </Button>
//             </Box>

//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead style={{ backgroundColor: "#f5f5f5" }}>
//                         <TableRow>
//                             <TableCell>Company</TableCell>
//                             <TableCell>Customer</TableCell>
//                             <TableCell>Email</TableCell>
//                             <TableCell>Mobile</TableCell>
//                             <TableCell>Filled By</TableCell>
//                             <TableCell>Service</TableCell>
//                             <TableCell>Billing Instruction</TableCell>
//                             <TableCell>Cost price</TableCell>
//                             <TableCell>Selling price</TableCell>
//                             <TableCell>Difference</TableCell>
//                             <TableCell>Billing Date</TableCell>
//                             <TableCell>Status</TableCell>
//                         </TableRow>
//                     </TableHead>

//                     <TableBody>
//                         {filteredData.map((row) => (
//                             <TableRow key={row.id}>
//                                 <TableCell>{row.companyName}</TableCell>
//                                 <TableCell>{row.customerName}</TableCell>
//                                 <TableCell>{row.email}</TableCell>
//                                 <TableCell>{row.phone}</TableCell>
//                                 <TableCell>{row.filledBy}</TableCell>
//                                 <TableCell>{row.serviceName}</TableCell>
//                                 <TableCell>{row.billingInstruction}</TableCell>
//                                 <TableCell>₹{row.costPrice || 0}</TableCell>
//                                 <TableCell>₹{row.sellingPrice || 0}</TableCell>
//                                 <TableCell>₹{(row.sellingPrice || 0) - (row.costPrice || 0)}</TableCell>
//                                 <TableCell>{formatDate(row.billingDate)}</TableCell>
//                                 <TableCell>
//                                     {row.status === "Cleared" ? (
//                                         <Button variant="contained" color="success" disabled>
//                                             Cleared
//                                         </Button>
//                                     ) : (
//                                         <Button
//                                             variant="contained"
//                                             color="error"
//                                             onClick={() => handleClearClick(row.billingId, row.serviceIndex)}
//                                         >
//                                             Pending
//                                         </Button>
//                                     )}

//                                 </TableCell>
//                             </TableRow>)
//                         )}

//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     )
// };

// export default AccountPage;



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
    Typography,
    Button,
    TextField,
    Box,
} from "@mui/material";

const AccountPage = () => {
    const [billingData, setBillingData] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    useEffect(() => {
        fetchBillingData();
    }, []);

    const fetchBillingData = async () => {
        try {
            const response = await axios.get("/api/billing");

            // Transform into a flat array first
            const flattened = [];

            response.data?.forEach((billing) => {
                billing.services?.forEach((service, index) => {
                    flattened.push({
                        id: `${billing._id}-${index}`,
                        billingId: billing._id,
                        serviceIndex: index,
                        companyName: billing.companyName || "Unknown",
                        customerName: billing.customerName || "Unknown",
                        email: billing.email || "Unknown",
                        phone: billing.mobile || "Unknown",
                        filledBy: billing.filledBy || "Unknown",
                        serviceName: service.serviceName,
                        billingInstruction: service.billingInstruction,
                        costPrice: service.costPrice,
                        sellingPrice: service.sellingPrice,
                        totalCostPrice: service.totalCostPrice,
                        totalSellingPrice: service.totalSellingPrice,
                        installment: service.installment,
                        billingDate: new Date(service.nextBillingDate),
                        status: service.status,
                    });
                });
            });

            setBillingData(flattened);
            setFilteredData(flattened);
        } catch (err) {
            console.error("Failed to fetch billing data", err);
        }
    };

    const handleFilter = () => {
        if (!fromDate || !toDate) return;

        const from = new Date(fromDate);
        const to = new Date(toDate);
        to.setHours(23, 59, 59, 999); // Include whole day

        const filtered = billingData.filter((item) => {
            const billingDate = new Date(item.billingDate);
            return billingDate >= from && billingDate <= to;
        });

        setFilteredData(filtered);
    };

    const handleClearClick = async (billingId, serviceIndex) => {
        try {
            await axios.patch(`/api/billing/${billingId}/service/${serviceIndex}`);

            // After clearing, refresh the data from API
            await fetchBillingData();

        } catch (err) {
            console.error("Failed to clear service", err);
        }
    };

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    return (
        <div style={{ padding: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                Accounts - Billing Overview
            </Typography>

            <Box display="flex" gap={2} mb={3}>
                <TextField
                    type="date"
                    label="From"
                    InputLabelProps={{ shrink: true }}
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                />
                <TextField
                    type="date"
                    label="To"
                    InputLabelProps={{ shrink: true }}
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleFilter}>
                    Filter
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead style={{ backgroundColor: "#f5f5f5" }}>
                        <TableRow>
                            <TableCell>Company</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Mobile</TableCell>
                            <TableCell>Filled By</TableCell>
                            <TableCell>Service</TableCell>
                            <TableCell>Billing Instruction</TableCell>
                            <TableCell>Cost (₹)</TableCell>
                            <TableCell>Selling (₹)</TableCell>
                            <TableCell>Difference (₹)</TableCell>
                            <TableCell>Installment (₹)</TableCell>
                            <TableCell>Billing Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.companyName}</TableCell>
                                <TableCell>{row.customerName}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.filledBy}</TableCell>
                                <TableCell>{row.serviceName}</TableCell>
                                <TableCell>{row.billingInstruction}</TableCell>
                                <TableCell>₹{row.totalCostPrice || row.costPrice || 0}</TableCell>
                                <TableCell>₹{row.totalSellingPrice || row.sellingPrice || 0}</TableCell>
                                <TableCell>₹{(row.totalSellingPrice || row.sellingPrice || 0) - (row.totalCostPrice || row.costPrice || 0)}</TableCell>
                                <TableCell>₹{row.installment || 0}</TableCell>
                                <TableCell>{formatDate(row.billingDate)}</TableCell>
                                <TableCell>
                                    {row.status === "Cleared" ? (
                                        <Button variant="contained" color="success" disabled>
                                            Cleared
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleClearClick(row.billingId, row.serviceIndex)}
                                        >
                                            Pending
                                        </Button>
                                    )}

                                </TableCell>
                            </TableRow>)
                        )}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
};

export default AccountPage;
