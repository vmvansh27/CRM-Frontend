// // src/pages/SalesForm.jsx
// import {
//     Box,
//     Container,
//     TextField,
//     Typography,
//     Checkbox,
//     FormGroup,
//     FormControlLabel,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Button,
//     Grid,
// } from '@mui/material';
// import { useState } from 'react';

// export default function SalesForm() {
//     const [isExisting, setIsExisting] = useState(false);
//     const [formData, setFormData] = useState({
//         companyName: '',
//         customerName: '',
//         email: '',
//         mobile: '',
//         address: '',
//         referenceSource: '',
//         billingDate: '',
//         services: [],
//         totalCost: '',
//         billingInstructions: '',
//         serviceCommitments: '',
//         demoStatus: '',
//         backup: '',
//         filledBy: '',
//     });

//     const servicesList = [
//         'VPS Server', 'Hosting Services', 'ITSM', 'Antivirus', 'VEEAM',
//         'Data Backup/DR Services', 'E-Mailing/M365/Google Workspace', 'Tally Shared Cloud',
//         'G Suite/M365', 'Managed Services', 'DLP', 'C Panel Servers',
//         'Rental Services', 'SAAS Based Licences', 'AWS/Azure Public Cloud'
//     ];

//     const handleServiceChange = (service) => {
//         const updatedServices = formData.services.includes(service)
//             ? formData.services.filter(s => s !== service)
//             : [...formData.services, service];
//         setFormData({ ...formData, services: updatedServices });
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     return (
//         <Container maxWidth="md" sx={{ py: 4 }}>
//             <Typography variant="h4" gutterBottom>
//                 {isExisting ? 'Existing Customer' : 'New Customer (Sales Order Book)'}
//             </Typography>

//             <FormControlLabel
//                 control={<Checkbox checked={isExisting} onChange={() => setIsExisting(!isExisting)} />}
//                 label="Is Existing Customer?"
//             />

//             {!isExisting && (
//                 <>
//                     <TextField fullWidth margin="normal" label="Company Name" name="companyName" onChange={handleChange} required />
//                     <TextField fullWidth margin="normal" label="Customer Name" name="customerName" onChange={handleChange} required />
//                     <TextField fullWidth margin="normal" label="Email Address" name="email" onChange={handleChange} />
//                     <TextField fullWidth margin="normal" label="Mobile No." name="mobile" onChange={handleChange} required />
//                     <TextField fullWidth margin="normal" label="Address" name="address" onChange={handleChange} required />
//                 </>
//             )}

//             <FormControl fullWidth margin="normal">
//                 <InputLabel>Reference Source</InputLabel>
//                 <Select name="referenceSource" value={formData.referenceSource} onChange={handleChange} required>
//                     <MenuItem value="Google PPC">Google PPC</MenuItem>
//                     <MenuItem value="BNI">BNI</MenuItem>
//                     <MenuItem value="Client Reference">Client Reference</MenuItem>
//                     <MenuItem value="Indiamart">Indiamart</MenuItem>
//                     <MenuItem value="Existing Customer">Existing Customer</MenuItem>
//                     <MenuItem value="E2E">E2E</MenuItem>
//                 </Select>
//             </FormControl>

//             <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Date of Billing"
//                 name="billingDate"
//                 type="date"
//                 InputLabelProps={{ shrink: true }}
//                 onChange={handleChange}
//                 required
//             />

//             <FormGroup>
//                 <Typography variant="h6" mt={2}>Services</Typography>
//                 {servicesList.map(service => (
//                     <FormControlLabel
//                         key={service}
//                         control={
//                             <Checkbox
//                                 checked={formData.services.includes(service)}
//                                 onChange={() => handleServiceChange(service)}
//                             />
//                         }
//                         label={service}
//                     />
//                 ))}
//             </FormGroup>

//             <TextField fullWidth margin="normal" label="Total Yearly Cost" name="totalCost" onChange={handleChange} required />

//             <FormControl fullWidth margin="normal">
//                 <InputLabel>Billing Instructions</InputLabel>
//                 <Select name="billingInstructions" value={formData.billingInstructions} onChange={handleChange} required>
//                     <MenuItem value="Monthly">Monthly</MenuItem>
//                     <MenuItem value="Quarterly">Quarterly</MenuItem>
//                     <MenuItem value="Half Yearly">Half Yearly</MenuItem>
//                     <MenuItem value="Annually">Annually</MenuItem>
//                     <MenuItem value="Triennially">Triennially</MenuItem>
//                 </Select>
//             </FormControl>

//             <TextField fullWidth margin="normal" label="Service Commitments" name="serviceCommitments" onChange={handleChange} required />

//             <FormControl fullWidth margin="normal">
//                 <InputLabel>Demo Status</InputLabel>
//                 <Select name="demoStatus" value={formData.demoStatus} onChange={handleChange} required>
//                     <MenuItem value="YES">YES</MenuItem>
//                     <MenuItem value="NO">NO</MenuItem>
//                 </Select>
//             </FormControl>

//             <FormControl fullWidth margin="normal">
//                 <InputLabel>Backup Required?</InputLabel>
//                 <Select name="backup" value={formData.backup} onChange={handleChange} required>
//                     <MenuItem value="Full">Full</MenuItem>
//                     <MenuItem value="Data Folders Only">Data Folders Only</MenuItem>
//                     <MenuItem value="Not required, Client will take ownself">Not required, Client will take ownself</MenuItem>
//                 </Select>
//             </FormControl>

//             <FormControl fullWidth margin="normal">
//                 <InputLabel>Form Filled By</InputLabel>
//                 <Select name="filledBy" value={formData.filledBy} onChange={handleChange} required>
//                     <MenuItem value="Dheeraj Gupta">Dheeraj Gupta</MenuItem>
//                     <MenuItem value="Jasmeet Bajaj">Jasmeet Bajaj</MenuItem>
//                     <MenuItem value="Seema">Seema</MenuItem>
//                     <MenuItem value="Riya">Riya</MenuItem>
//                     <MenuItem value="Jessica">Jessica</MenuItem>
//                 </Select>
//             </FormControl>

//             <Box textAlign="center" mt={3}>
//                 <Button variant="contained" size="large" onClick={() => console.log(formData)}>
//                     Submit Form
//                 </Button>
//             </Box>
//         </Container>
//     );
// }


// src/pages/SalesForm.jsx
import {
    Box,
    Container,
    TextField,
    Typography,
    Checkbox,
    FormGroup,
    FormControlLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Snackbar,
} from '@mui/material';
import { useState } from 'react';

export default function SalesForm() {
    const [isExisting, setIsExisting] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const initialForm = {
        companyName: '',
        customerName: '',
        email: '',
        mobile: '',
        address: '',
        referenceSource: '',
        billingDate: '',
        services: [],
        yearlyCost: '',
        billingInstructions: '',
        serviceCommitments: '',
        demoStatus: '',
        backup: '',
        filledBy: '',
    };

    const [formData, setFormData] = useState(initialForm);

    const servicesList = [
        'VPS Server', 'Hosting Services', 'ITSM', 'Antivirus', 'VEEAM',
        'Data Backup/DR Services', 'E-Mailing/M365/Google Workspace', 'Tally Shared Cloud',
        'G Suite/M365', 'Managed Services', 'DLP', 'C Panel Servers',
        'Rental Services', 'SAAS Based Licences', 'AWS/Azure Public Cloud'
    ];

    const handleServiceChange = (service) => {
        const updatedServices = formData.services.includes(service)
            ? formData.services.filter(s => s !== service)
            : [...formData.services, service];
        setFormData({ ...formData, services: updatedServices });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/sales", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                setSnackbar({ open: true, message: "Sales form submitted successfully!", severity: "success" });
                setFormData(initialForm);
                setIsExisting(false);
            } else {
                setSnackbar({ open: true, message: data.error || "Submission failed", severity: "error" });
            }
        } catch (error) {
            setSnackbar({ open: true, message: "Network error. Please try again.", severity: "error" });
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                {isExisting ? 'Existing Customer' : 'New Customer (Sales Order Book)'}
            </Typography>

            <FormControlLabel
                control={<Checkbox checked={isExisting} onChange={() => setIsExisting(!isExisting)} />}
                label="Is Existing Customer?"
            />

            {!isExisting && (
                <>
                    <TextField fullWidth margin="normal" label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} required />
                    <TextField fullWidth margin="normal" label="Customer Name" name="customerName" value={formData.customerName} onChange={handleChange} required />
                    <TextField fullWidth margin="normal" label="Email Address" name="email" value={formData.email} onChange={handleChange} />
                    <TextField fullWidth margin="normal" label="Mobile No." name="mobile" value={formData.mobile} onChange={handleChange} required />
                    <TextField fullWidth margin="normal" label="Address" name="address" value={formData.address} onChange={handleChange} required />
                </>
            )}

            <FormControl fullWidth margin="normal">
                <InputLabel>Reference Source</InputLabel>
                <Select name="referenceSource" value={formData.referenceSource} onChange={handleChange} required>
                    <MenuItem value="Google PPC">Google PPC</MenuItem>
                    <MenuItem value="BNI">BNI</MenuItem>
                    <MenuItem value="Client Reference">Client Reference</MenuItem>
                    <MenuItem value="Indiamart">Indiamart</MenuItem>
                    <MenuItem value="Existing Customer">Existing Customer</MenuItem>
                    <MenuItem value="E2E">E2E</MenuItem>
                </Select>
            </FormControl>

            <TextField
                fullWidth
                margin="normal"
                label="Date of Billing"
                name="billingDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.billingDate}
                onChange={handleChange}
                required
            />

            <FormGroup>
                <Typography variant="h6" mt={2}>Services</Typography>
                {servicesList.map(service => (
                    <FormControlLabel
                        key={service}
                        control={
                            <Checkbox
                                checked={formData.services.includes(service)}
                                onChange={() => handleServiceChange(service)}
                            />
                        }
                        label={service}
                    />
                ))}
            </FormGroup>

            <TextField fullWidth margin="normal" label="Total Yearly Cost" name="yearlyCost" value={formData.yearlCost} onChange={handleChange} required />

            <FormControl fullWidth margin="normal">
                <InputLabel>Billing Instructions</InputLabel>
                <Select name="billingInstructions" value={formData.billingInstructions} onChange={handleChange} required>
                    <MenuItem value="Monthly">Monthly</MenuItem>
                    <MenuItem value="Quarterly">Quarterly</MenuItem>
                    <MenuItem value="Half Yearly">Half Yearly</MenuItem>
                    <MenuItem value="Annually">Annually</MenuItem>
                    <MenuItem value="Triennially">Triennially</MenuItem>
                </Select>
            </FormControl>

            <TextField fullWidth margin="normal" label="Service Commitments" name="serviceCommitments" value={formData.serviceCommitments} onChange={handleChange} required />

            <FormControl fullWidth margin="normal">
                <InputLabel>Demo Status</InputLabel>
                <Select name="demoStatus" value={formData.demoStatus} onChange={handleChange} required>
                    <MenuItem value="YES">YES</MenuItem>
                    <MenuItem value="NO">NO</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>Backup Required?</InputLabel>
                <Select name="backup" value={formData.backup} onChange={handleChange} required>
                    <MenuItem value="Full">Full</MenuItem>
                    <MenuItem value="Data Folders Only">Data Folders Only</MenuItem>
                    <MenuItem value="Not required, Client will take ownself">Not required, Client will take ownself</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>Form Filled By</InputLabel>
                <Select name="filledBy" value={formData.filledBy} onChange={handleChange} required>
                    <MenuItem value="Dheeraj Gupta">Dheeraj Gupta</MenuItem>
                    <MenuItem value="Jasmeet Bajaj">Jasmeet Bajaj</MenuItem>
                    <MenuItem value="Seema">Seema</MenuItem>
                    <MenuItem value="Riya">Riya</MenuItem>
                    <MenuItem value="Jessica">Jessica</MenuItem>
                </Select>
            </FormControl>

            <Box textAlign="center" mt={3}>
                <Button variant="contained" size="large" onClick={handleSubmit}>
                    Submit Form
                </Button>
            </Box>

            <Snackbar
                open={snackbar.open}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                autoHideDuration={4000}
                message={snackbar.message}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Container>
    );
}
