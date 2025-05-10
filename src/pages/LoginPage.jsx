import { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Company Login
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate>
                    <TextField
                        fullWidth
                        label="Username"
                        margin="normal"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
