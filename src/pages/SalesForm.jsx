import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Snackbar,
    IconButton,
    Grid,
    Autocomplete
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const servicesList = ['VPS Server', 'Hosting Services', 'ITSM', 'Antivirus', 'VEEAM', 'DataBackup/DRServices', 'E-Mailing', 'M365', 'Google Workspace', 'Tally Shared Cloud', 'GSuite', 'Managed Services', 'DLP', 'CPanel Servers', 'Rental Services', 'SAAS Based Licences', 'AWS', 'Azure Public Cloud'];

export default function SalesForm() {
    const [companyOptions, setCompanyOptions] = useState([]);

    const [formData, setFormData] = useState({
        company: null,
        companyName: '',
        customerName: '',
        email: '',
        mobile: '',
        address: '',
        serviceCommitments: '',
        demoStatus: '',
        backup: '',
        filledBy: ''
    });

    const [isExisting, setIsExisting] = useState(false);
    const [existingServices, setExistingServices] = useState([]);

    const [newService, setNewService] = useState({
        serviceName: '',
        costPrice: '',
        sellingPrice: '',
        yearlyCost: '',
        billingInstruction: '',
        billingDate: ''
    });

    const [newServices, setNewServices] = useState([]);

    const [totalNewCost, setTotalNewCost] = useState('0.00');

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const sum = newServices.reduce((acc, s) => acc + Number(s.yearlyCost), 0);
        setTotalNewCost(sum.toFixed(2));
    }, [newServices]);


    const fetchCompanies = async (input) => {
        try {
            const res = await axios.get(`/api/sales/company/${input}`);
            setCompanyOptions(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCompanySelect = (e, company) => {
        if (typeof company === 'string' || !company) {
            // new company
            setIsExisting(false);
            setFormData((prev) => ({
                ...prev,
                company: null,
                companyName: company,
                customerName: '',
                email: '',
                mobile: '',
                address: ''
            }))
            setExistingServices([]);

        } else {
            // existing company
            setIsExisting(true);
            setFormData((prev) => ({
                ...prev,
                company: company._id,
                companyName: company.companyName,
                customerName: company.customerName || '',
                email: company.email || '',
                mobile: company.mobile || '',
                address: company.address || ''
            }))
            axios.get(`/api/sales/company/${encodeURIComponent(company.companyName)}`)
                .then((res) => setExistingServices(res.data?.services || []))
                .catch(() => setExistingServices([]));
        }
    };

    const handleInputChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    };

    const handleServiceChange = (e) => {
        const { name, value } = e.target;
        setNewService((prev) => {
            const updated = { ...prev, [name]: value };
            if (name === 'sellingPrice') {
                const selling = parseFloat(value);
                updated.yearlyCost = !isNaN(selling) ? selling * 12 : 0;
            }
            return updated;
        });
    };

    const addService = () => {
        const { serviceName, costPrice, sellingPrice, billingInstruction, billingDate } = newService;

        if (!serviceName || !costPrice || !sellingPrice || !billingInstruction || !billingDate) {
            return setSnackbar({ open: true, message: 'Please complete all fields in new service.', severity: 'error' })
        }
        if (isNaN(Number(costPrice)) ||
            isNaN(Number(sellingPrice))) {
            return setSnackbar({ open: true, message: 'Prices must be numeric.', severity: 'error' })
        }
        const duplicate = existingServices.some(s => s.serviceName === serviceName) ||
            newServices.some(s => s.serviceName === serviceName);
        if (duplicate) {
            return setSnackbar({ open: true, message: 'Service already exists.', severity: 'error' })
        }
        setNewServices([...newServices, {
            serviceName,
            costPrice,
            sellingPrice,
            billingInstruction,
            billingDate,
            yearlyCost: newService.yearlyCost
        }]);
        setNewService({ serviceName: '', costPrice: '', sellingPrice: '', billingInstruction: '', billingDate: '', yearlyCost: '' })
    };

    const removeService = (i) => {
        setNewServices((prev) => prev.filter((_, idx) => idx !== i));
    };

    const handleSubmit = async () => {
        if (!isExisting && !formData.companyName) {
            return setSnackbar({ open: true, message: 'Please enter a company name.', severity: 'error' })
        }
        if (isExisting && !formData.company) {
            return setSnackbar({ open: true, message: 'Please select a company.', severity: 'error' })
        }
        if (newServices.length === 0) {
            return setSnackbar({ open: true, message: 'Add at least one new service.', severity: 'error' })
        }
        const payload = {
            companyName: formData.companyName,
            companyId: formData.company,
            customerName: formData.customerName,
            email: formData.email,
            mobile: formData.mobile,
            address: formData.address,
            serviceCommitments: formData.serviceCommitments,
            demoStatus: formData.demoStatus,
            backup: formData.backup,
            filledBy: formData.filledBy,
            services: newServices,
        };
        try {
            const res = await axios.post('/api/sales', payload);
            if (res.status === 201) {
                setSnackbar({ open: true, message: 'Sales form submitted successfully!', severity: 'success' })
                // Reset form afterwards
                setFormData({
                    company: null,
                    companyName: '',
                    customerName: '',
                    email: '',
                    mobile: '',
                    address: '',
                    serviceCommitments: '',
                    demoStatus: '',
                    backup: '',
                    filledBy: ''
                })
                setNewServices([]);

            }
        } catch (error) {
            setSnackbar({ open: true, message: error?.response?.data?.error || 'Submission failed!', severity: 'error' })
        }
    };
    // <Conainer></Conainer>
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>{isExisting ? 'Existing Customer' : 'New Customer'}</Typography>
            <Autocomplete
                options={companyOptions}
                getOptionLabel={(opt) => (typeof opt === 'string' ? opt : opt.companyName)}
                onInputChange={(e, value) => {
                    fetchCompanies(value);
                    setFormData((prev) => ({ ...prev, companyName: value }))
                }}
                onChange={handleCompanySelect}
                freeSolo
                renderInput={(params) =>
                    <TextField {...params} label="Company Name" variant="outlined" required />}
                value={isExisting ? companyOptions.find((c) => c._id === formData.company) || '' : formData.companyName}
            />

            {!isExisting && (
                <>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Customer Name"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                </>
            )}

            <TextField
                fullWidth
                margin="normal"
                label="Service Commitments *"
                name="serviceCommitments"
                value={formData.serviceCommitments}
                onChange={handleInputChange}
                required
            />

            <FormControl fullWidth margin="normal">
                <InputLabel>Demo Status *</InputLabel>
                <Select
                    name="demoStatus"
                    value={formData.demoStatus}
                    onChange={handleInputChange}
                    required
                >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="YES">YES</MenuItem>
                    <MenuItem value="NO">NO</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>Backup *</InputLabel>
                <Select
                    name="backup"
                    value={formData.backup}
                    onChange={handleInputChange}
                    required
                >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="YES">YES</MenuItem>
                    <MenuItem value="NO">NO</MenuItem>
                </Select>
            </FormControl>

            <TextField
                fullWidth
                margin="normal"
                label="Form Filled By *"
                name="filledBy"
                value={formData.filledBy}
                onChange={handleInputChange}
                required
            />

            {isExisting && existingServices.length > 0 && (
                <Box my={2} p={2} border="1px solid #ccc" borderRadius={1}>
                    <Typography variant="h6">Previously Subscribed Services</Typography>
                    {existingServices.map((svc, idx) => (
                        <Box key={idx} display="flex" justifyContent="space-between" mb={1}>
                            <Typography>{svc.serviceName}</Typography>
                            <Typography>₹{svc.cost} | {svc.billingInstruction} | {new Date(svc.billingDate).toLocaleDateString()}</Typography>
                        </Box>
                    ))}
                </Box>
            )}

            <Box mt={4}>
                <Typography variant="h6">Add New Services</Typography>
                <Grid container spacing={2} mt={1}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth sx={{ minWidth: 200 }}>
                            <InputLabel>Service Name *</InputLabel>
                            <Select name="serviceName" value={newService.serviceName} onChange={handleServiceChange}>
                                {servicesList.map((s, idx) => (
                                    <MenuItem key={idx} value={s}>{s}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="Cost Price (₹)*"
                            name="costPrice"
                            type="number"
                            value={newService.costPrice}
                            onChange={handleServiceChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="Selling Price (₹/month)*"
                            name="sellingPrice"
                            type="number"
                            value={newService.sellingPrice}
                            onChange={handleServiceChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="Yearly Cost (₹)"
                            name="yearlyCost"
                            type="number"
                            value={newService.yearlyCost}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    {/* <Grid item xs={12} sm={3}>
                        <FormControl fullWidth >
                            <InputLabel>Billing Instruction *</InputLabel>
                            <Select name="billingInstruction" value={newService.billingInstruction} onChange={handleServiceChange} size='large'>
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="Monthly">Monthly</MenuItem>
                                <MenuItem value="Quarterly">Quarterly</MenuItem>
                                <MenuItem value="Half-Yearly">Half-Yearly</MenuItem>
                                <MenuItem value="Yearly">Yearly</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid> */}

                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth sx={{ minWidth: 200 }}>
                            <InputLabel id="billing-label">Billing Instruction *</InputLabel>
                            <Select
                                labelId="billing-label"
                                label="Billing Instruction *"
                                name="billingInstruction"
                                value={newService.billingInstruction}
                                onChange={handleServiceChange}>
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="Monthly">Monthly</MenuItem>
                                <MenuItem value="Quarterly">Quarterly</MenuItem>
                                <MenuItem value="Half-Yearly">Half-Yearly</MenuItem>
                                <MenuItem value="Yearly">Yearly</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Billing Start Date *"
                            name="billingDate"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={newService.billingDate}
                            onChange={handleServiceChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button fullWidth variant="contained" color="primary" onClick={addService}>
                            Add Service
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {newServices.length > 0 && (
                <Box my={3}>
                    <Typography variant="subtitle1">New Services Added</Typography>
                    {newServices.map((svc, idx) => (
                        <Box key={idx} display="flex" justifyContent="space-between" alignItems="center" p={1} border="1px solid #ccc" borderRadius={1} mb={1}>
                            <Typography>{svc.serviceName}</Typography>
                            <Typography>₹{svc.costPrice} | {svc.billingInstruction} | {new Date(svc.billingDate).toLocaleDateString()}</Typography>
                            <IconButton color="error" onClick={() => removeService(idx)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            )}

            <Box my={2}>
                <Typography variant="h6">
                    Total Yearly Cost (New Services): ₹{totalNewCost}
                </Typography>
            </Box>

            <Button fullWidth variant="contained" color="success" onClick={handleSubmit}>
                Submit Sales Form
            </Button>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                message={snackbar.message}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Container>
    )
}

