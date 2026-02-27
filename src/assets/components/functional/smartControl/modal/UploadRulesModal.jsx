import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    IconButton,
    CircularProgress,
    LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const UploadRulesModal = ({ open, setOpen, onUpload, handleSnackbarOpen, getRulesData }) => {
    const [file, setFile] = useState(null);
    const [uploadState, setUploadState] = useState("idle"); // idle, uploading, processing, completed, error
    const [uploadResult, setUploadResult] = useState(null);
    const [uploadId, setUploadId] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setUploadState("idle");
            setUploadResult(null);
        }
    };

    const handleClose = () => {
        if (uploadState === "uploading" || uploadState === "processing") return;
        setFile(null);
        setUploadState("idle");
        setUploadResult(null);
        setUploadId(null);
        setOpen(false);
    };

    const pollStatus = async (id) => {
        const token = localStorage.getItem("accessToken");
        const interval = setInterval(async () => {
            try {
                const response = await fetch(`https://react-api-script.onrender.com/api/upload-superstatus/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!response.ok) throw new Error("Status check failed");
                const data = await response.json();

                if (data.status === "completed") {
                    clearInterval(interval);
                    setUploadResult(data);
                    setUploadState("completed");
                    handleSnackbarOpen("Excel processed successfully!", "success");
                    getRulesData(true);
                } else if (data.status === "failed" || data.error) {
                    clearInterval(interval);
                    setUploadState("error");
                    setUploadResult(data);
                    handleSnackbarOpen(data.error || "Processing failed", "error");
                }
            } catch (error) {
                clearInterval(interval);
                setUploadState("error");
                console.error("Polling error:", error);
            }
        }, 2000);

        return () => clearInterval(interval);
    };

    const handleSubmit = async () => {
        if (!file) return;

        setUploadState("uploading");
        const formData = new FormData();
        formData.append("file", file);
        const token = localStorage.getItem("accessToken");

        try {
            const response = await fetch("https://react-api-script.onrender.com/api/upload-superloadercampaign-excel/", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");
            const data = await response.json();

            if (data.upload_id) {
                setUploadId(data.upload_id);
                setUploadState("processing");
                pollStatus(data.upload_id);
            } else {
                throw new Error("No upload ID received");
            }
        } catch (error) {
            setUploadState("error");
            handleSnackbarOpen("Failed to upload Excel", "error");
            console.error("Upload error:", error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ m: 0, p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6">Import Rules from Excel</Typography>
                <IconButton onClick={handleClose} size="small" disabled={uploadState === "uploading" || uploadState === "processing"}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {uploadState === "idle" || uploadState === "uploading" || uploadState === "error" ? (
                    <Box
                        sx={{
                            border: "2px dashed #ccc",
                            borderRadius: 2,
                            p: 4,
                            textAlign: "center",
                            cursor: uploadState === "uploading" ? "default" : "pointer",
                            backgroundColor: "#f9f9f9",
                            "&:hover": { backgroundColor: uploadState === "uploading" ? "#f9f9f9" : "#f0f0f0", borderColor: "#1976d2" },
                        }}
                        onClick={() => uploadState !== "uploading" && document.getElementById("file-input").click()}
                    >
                        <input
                            type="file"
                            id="file-input"
                            hidden
                            accept=".xlsx, .xls"
                            onChange={handleFileChange}
                            disabled={uploadState === "uploading"}
                        />
                        <CloudUploadIcon sx={{ fontSize: 48, color: uploadState === "error" ? "#d32f2f" : "#1976d2", mb: 2 }} />
                        <Typography variant="body1">
                            {file ? file.name : "Click to select or drag and drop Excel file"}
                        </Typography>
                        {uploadState === "uploading" && (
                            <Box sx={{ width: '100%', mt: 2 }}>
                                <LinearProgress />
                                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>Uploading file...</Typography>
                            </Box>
                        )}
                        {uploadState === "error" && (
                            <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                                An error occurred. Please try again.
                            </Typography>
                        )}
                    </Box>
                ) : uploadState === "processing" ? (
                    <Box sx={{ textAlign: 'center', p: 4 }}>
                        <CircularProgress size={48} sx={{ mb: 2 }} />
                        <Typography variant="h6">Processing File</Typography>
                        <Typography variant="body2" color="textSecondary">
                            Please wait while we validate and insert your rules...
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>ID: {uploadId}</Typography>
                    </Box>
                ) : (
                    <Box sx={{ textAlign: 'center', p: 4 }}>
                        <CheckCircleIcon sx={{ fontSize: 64, color: "#4caf50", mb: 2 }} />
                        <Typography variant="h6">Upload Completed</Typography>
                        <Box sx={{ mt: 2, textAlign: 'left', display: 'inline-block' }}>
                            <Typography variant="body2">Sheet Type: <strong>{uploadResult?.sheet_type}</strong></Typography>
                            <Typography variant="body2">Total Rows: <strong>{uploadResult?.total_rows}</strong></Typography>
                            <Typography variant="body2">Valid Rows: <strong>{uploadResult?.valid_rows}</strong></Typography>
                            <Typography variant="body2">Inserted: <strong>{uploadResult?.inserted}</strong></Typography>
                        </Box>
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={handleClose} color="inherit" disabled={uploadState === "uploading" || uploadState === "processing"}>
                    {uploadState === "completed" ? "Close" : "Cancel"}
                </Button>
                {(uploadState === "idle" || uploadState === "error") && (
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        disabled={!file}
                        startIcon={<UploadFileIcon />}
                    >
                        Upload Rules
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default UploadRulesModal;
