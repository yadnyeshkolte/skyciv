import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Upload } from 'lucide-react';

const FileUpload = ({ onModelLoad }) => {
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState(null);

    const onDrop = useCallback(async (acceptedFiles) => {
        // Reset states
        setError(null);
        setUploading(true);
        setUploadProgress(0);

        // Check if file is an STL
        const file = acceptedFiles[0];
        if (!file.name.toLowerCase().endsWith('.stl')) {
            setError('Please upload an STL file');
            setUploading(false);
            return;
        }

        // Create form data
        const formData = new FormData();
        formData.append('file', file);

        try {
            const apiUrl = import.meta.env.VITE_APP_API_URL || '';
            const response = await axios.post(
                `${apiUrl}/api/convert-stl`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(percentCompleted);
                    },
                }
            );

            // Verify response data structure before passing to parent
            console.log('Upload response:', response.data);

            if (!response.data || (!response.data.download_url && !response.data.bin_url)) {
                throw new Error('Invalid response format from server');
            }

            // Call the parent component's handler with the response data
            onModelLoad(response.data);
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.response?.data?.detail || err.message || 'Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    }, [onModelLoad]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="upload-container">
            <div
                {...getRootProps()}
                className={`skyciv-primary-btn-upload dropzone ${isDragActive ? 'active' : ''}`}
            >
                <input {...getInputProps()} />
                {uploading ? (
                    <div className="upload-progress">
                        <p className="upload-progress-text">Uploading: {uploadProgress}%</p>
                        <div className="progress-container">
                            <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                    </div>
                ) : (
                    <div className="upload-content">
                        <Upload size={16} className="upload-icon" />
                        <p className="upload-text">
                            {isDragActive
                                ? 'Drop STL file'
                                : 'Upload Your Model'}
                        </p>
                    </div>
                )}
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default FileUpload;