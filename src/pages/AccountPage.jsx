import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
    { field: 'companyName', headerName: 'Company Name', flex: 1 },
    { field: 'customerName', headerName: 'Customer Name', flex: 1 },
    { field: 'billingInstruction', headerName: 'Billing Instruction', flex: 1 },
    {
        field: 'totalCost',
        headerName: 'Total Cost (₹)',
        flex: 1,
        valueFormatter: (params) => {
            const value = params.value;
            return typeof value === 'number' ? `₹${value.toLocaleString()}` : '₹0';
        }
    },
    { field: 'nextBillingDate', headerName: 'Next Billing Date', flex: 1 },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        renderCell: (params) => (
            <span style={{
                color: params.value === 'Paid' ? 'green' : 'red',
                fontWeight: 600,
            }}>
                {params.value}
            </span>
        ),
    },
];

export default function AccountPage() {
    const [billingData, setBillingData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/billing');

                if (Array.isArray(response.data)) {
                    const formatted = response.data.map((item, index) => ({
                        id: item._id || index,
                        companyName: item.customerId?.companyName || "N/A",
                        customerName: item.customerId?.customerName || "N/A",
                        billingInstruction: item.customerId?.billingInstructions || "N/A",
                        totalCost: item.totalCost || 0,
                        nextBillingDate: item.nextBillingDate
                            ? new Date(item.nextBillingDate).toLocaleDateString()
                            : "N/A",
                        status: item.status || "Pending"
                    }));

                    setBillingData(formatted);
                } else {
                    console.error("Unexpected API response format:", response.data);
                    setBillingData([]);
                }
            } catch (error) {
                console.error("Error fetching account data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Accounts Dashboard
            </Typography>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={billingData}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                />
            </div>
        </Container>
    );
}
