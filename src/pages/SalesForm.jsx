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


import {
    Container,
    TextField,
    Typography,
    Box,
    Button,
    Grid,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { useState } from "react";

const SalesForm = () => {
    const [formData, setFormData] = useState({
        companyName: "",
        customerName: "",
        email: "",
        mobile: "",
        address: "",
        referenceSource: "",
        billingDate: "",
        services: [],
        yearlyCost: "",
        billingInstructions: "",
        serviceCommitments: "",
        demo: "",
        backup: "",
        filledBy: "",
    });

    const servicesList = [
        "VPS Server", "Hosting Services", "ITSM", "Antivirus", "VEEAM",
        "Data Backup/DR Services", "E-Mailing/M365/Google Workspace",
        "Tally Shared Cloud", "G Suite/M365", "Managed Services",
        "DLP", "C Panel Servers", "Rental Services", "SAAS Based Licences",
        "AWS/Azure Public Cloud"
    ];

    const referenceSources = [
        "Google PPC", "BNI", "Client Reference", "Indiamart",
        "Existing Customer", "E2E", "New Customer"
    ];

    const billingOptions = ["Monthly", "Quarterly", "Half Yearly", "Annually", "Triennially"];
    const backupOptions = ["Full", "Data Folders only", "Not required , Client will take ownself"];
    const salesPeople = ["Dheeraj Gupta", "Jasmeet Bajaj", "Seema", "Riya", "Jessica"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (service) => {
        setFormData((prev) => {
            const updatedServices = prev.services.includes(service)
                ? prev.services.filter((s) => s !== service)
                : [...prev.services, service];
            return { ...prev, services: updatedServices };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        // You can send this to the backend using fetch or axios
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                New Customer (Sales Order Book)
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* Customer Info */}
                    <Grid item xs={12} sm={6}>
                        <TextField required fullWidth label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField required fullWidth label="Customer Name" name="customerName" value={formData.customerName} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField type="email" fullWidth label="E-Mail Address" name="email" value={formData.email} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField required fullWidth label="Mobile No." name="mobile" value={formData.mobile} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} />
                    </Grid>

                    {/* Reference Source */}
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel>Reference Source</InputLabel>
                            <Select name="referenceSource" value={formData.referenceSource} onChange={handleChange}>
                                {referenceSources.map((src) => (
                                    <MenuItem key={src} value={src}>{src}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Billing Date */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            type="date"
                            name="billingDate"
                            label="Date of Billing"
                            InputLabelProps={{ shrink: true }}
                            value={formData.billingDate}
                            onChange={handleChange}
                        />
                    </Grid>

                    {/* Services */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Services</Typography>
                        <FormGroup row>
                            {servicesList.map((service) => (
                                <FormControlLabel
                                    key={service}
                                    control={
                                        <Checkbox
                                            checked={formData.services.includes(service)}
                                            onChange={() => handleCheckboxChange(service)}
                                        />
                                    }
                                    label={service}
                                />
                            ))}
                        </FormGroup>
                    </Grid>

                    {/* Billing and Others */}
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth required label="Total Yearly Cost" name="yearlyCost" value={formData.yearlyCost} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required>
                            <InputLabel>Billing Instructions</InputLabel>
                            <Select name="billingInstructions" value={formData.billingInstructions} onChange={handleChange}>
                                {billingOptions.map((opt) => (
                                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth required label="Service Commitments" name="serviceCommitments" value={formData.serviceCommitments} onChange={handleChange} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required>
                            <InputLabel>Is Service/Server on Demo?</InputLabel>
                            <Select name="demo" value={formData.demo} onChange={handleChange}>
                                <MenuItem value="YES">YES</MenuItem>
                                <MenuItem value="NO">NO</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel>Backup Required?</InputLabel>
                            <Select name="backup" value={formData.backup} onChange={handleChange}>
                                {backupOptions.map((opt) => (
                                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Filled By */}
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel>Form Filled By</InputLabel>
                            <Select name="filledBy" value={formData.filledBy} onChange={handleChange}>
                                {salesPeople.map((person) => (
                                    <MenuItem key={person} value={person}>{person}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Submit */}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth>
                            Submit Sales Order
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default SalesForm;
