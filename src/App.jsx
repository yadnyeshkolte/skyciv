import React, { useState, useEffect } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import ModelViewer from './ModelViewer';
import { Upload, LayoutTemplate, ChevronDown, Cloud, Zap, Users } from 'lucide-react';
// Import the logo
import SkyCivLogo from './assets/skyciv-logo.png';

function App() {
    const [modelUrl, setModelUrl] = useState(null);
    const [binUrl, setBinUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showUploadScreen, setShowUploadScreen] = useState(true);
    const [showSampleDropdown, setShowSampleDropdown] = useState(false);

    const sampleModels = [
        { name: 'Crane', file: 'crane.stl' },
        { name: 'House', file: 'house.stl' },
        { name: 'Pantheon', file: 'pantheon.stl' },
        { name: 'Modern Villa', file: 'modernvilla.stl' },
        { name: 'Torre Latinoamericana', file: 'torrelatinoamericana.stl' },
        { name: 'Burj Khalifa', file: 'burjkhalifa.stl' },
        { name: 'Luffing Crane', file: 'luffingcrane.stl' },
        { name: 'Transformer', file: 'transformer.stl' }
    ];

    const handleModelLoad = (data) => {
        setIsLoading(true);

        const apiBaseUrl = import.meta.env.VITE_APP_API_URL || '';
        // Fix: Don't overwrite the data properties before using them
        const modelUrl = data.download_url ? `${apiBaseUrl}${data.download_url}` : null;
        const binUrl = data.bin_url ? `${apiBaseUrl}${data.bin_url}` : null;

        console.log('Loading model with URL:', modelUrl); // Debugging
        console.log('Binary URL:', binUrl); // Debugging

        setModelUrl(modelUrl);
        setBinUrl(binUrl);
        setShowUploadScreen(false);
    };

    const handleSampleModel = (fileName) => {
        setIsLoading(true);
        setModelUrl(`https://raw.githubusercontent.com/yadnyeshkolte/skyciv/main/stlfiles/${fileName}`);
        setBinUrl(null);
        setShowUploadScreen(false);
        setShowSampleDropdown(false);
    };

    const toggleSampleDropdown = () => {
        setShowSampleDropdown(!showSampleDropdown);
    };

    const handleNewUpload = () => {
        // Clear the cached model
        setModelUrl(null);
        setBinUrl(null);
        setShowUploadScreen(true);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (showSampleDropdown && !event.target.closest('.hero-button')) {
                setShowSampleDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSampleDropdown]);

    return (
        <div className="App">
            {showUploadScreen ? (
                <div className="home-screen">
                    {/* Header Navigation Bar */}
                    <header className="skyciv-header">
                        <div className="skyciv-logo">
                            <img src={SkyCivLogo} alt="SkyCiv Logo" />
                        </div>
                        <nav className="skyciv-nav">
                            <ul>
                                <li><a href="#">Products</a></li>
                                <li><a href="#">Pricing</a></li>
                                <li><a href="#">Tools</a></li>
                                <li><a href="#">Resources</a></li>
                                <li><a href="#">API</a></li>
                                <li><a href="#">Login</a></li>
                                <li>
                                    <button className="sign-up-btn">SIGN UP</button>
                                </li>
                            </ul>
                        </nav>
                    </header>

                    {/* Hero Section */}
                    <div className="hero-section">
                        <div className="hero-content">
                            <h1>SkyCiv Structural Analysis Software</h1>
                            <p className="hero-description">
                                Powerful FEA structural analysis and design software.
                                <br />
                                Accessed directly from your browser.
                            </p>

                            {/* Two buttons for model selection and upload */}
                            <div className="hero-buttons">
                                <div className="hero-button">
                                    <button className="skyciv-primary-btn" onClick={toggleSampleDropdown}>
                                        Select Sample Model
                                        <ChevronDown size={16} />
                                    </button>
                                    {showSampleDropdown && (
                                        <div className="sample-dropdown-menu">
                                            {sampleModels.map((model) => (
                                                <div
                                                    key={model.file}
                                                    className="sample-dropdown-item"
                                                    onClick={() => handleSampleModel(model.file)}
                                                >
                                                    {model.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="hero-button-upload">
                                    <FileUpload onModelLoad={handleModelLoad} />
                                </div>
                            </div>
                            {/* Features Section */}
                            <div className="features-section">
                                <div className="feature">
                                    <div className="feature-icon">
                                        <Cloud size={48} />
                                    </div>
                                    <h3>No Installations</h3>
                                </div>

                                <div className="feature">
                                    <div className="feature-icon">
                                        <Zap size={48} />
                                    </div>
                                    <h3>Powerful Modeling</h3>
                                </div>

                                <div className="feature">
                                    <div className="feature-icon">
                                        <Users size={48} />
                                    </div>
                                    <h3>Easy Collaboration</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ) : (
                <div className="viewer-screen">
                    <div className="new-upload-button">
                        <button onClick={handleNewUpload} className="back-button" title="Upload new model">
                            <Upload size={10} />
                            <span>New Upload</span>
                        </button>
                    </div>

                    <div className="fullscreen-viewer">
                        <ModelViewer
                            modelUrl={modelUrl}
                            binUrl={binUrl}
                            onLoad={() => setIsLoading(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;