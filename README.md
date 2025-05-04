# SkyCiv Clone 3D Model Viewer

## 📝 Project Overview

SkyCiv is a powerful cloud-based structural engineering software suite. For this hackathon, I've rebuilt their landing page with a key enhancement: integrated 3D model visualization capabilities. Engineering and architecture professionals can now directly upload structural models in STL format and interact with them in real-time 3D without leaving the browser.

### 🌟 Original Site vs. My Enhancement

**Original SkyCiv Site:**
- Cloud-based structural analysis software
- Requires users to download and install specialized viewers for 3D models
- Primarily focuses on analysis rather than visualization

**My Enhanced Version:**
- Seamless in-browser 3D model visualization
- Drag-and-drop STL file upload functionality
- Sample model library for quick demonstration
- Responsive design across all devices
- Zero installation requirements for viewing complex 3D structures

## ✨ Features

### Core Features
- **Sleek Landing Page**: Faithful recreation of SkyCiv's modern UI
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Sample Model Library**: Pre-loaded structural models to demonstrate capabilities

### New Enhancement: In-Browser 3D Model Viewer
- **Drag & Drop STL Upload**: Upload structural models with simple drag and drop
- **Interactive 3D Viewing**: Pan, zoom, and rotate models in real-time
- **Zero Installation**: No desktop software or plugins required
- **Model Library**: Access to pre-loaded structural models including buildings, cranes, and architectural landmarks

## 🛠️ Technology Stack

- **Frontend Framework**: React with Vite
- **Styling**: Custom CSS with responsive design
- **3D Rendering**: Three.js for WebGL-based 3D visualization
- **File Handling**: React-Dropzone for drag-and-drop functionality
- **Icons & UI Elements**: Lucide React for modern iconography
- **API Communication**: Axios for API requests
- **Backend**: Node.js with Express (for file processing)

## 🚀 Live Demo

[View Live Demo](https://yadnyeshkolte.github.io/skyciv/)

## 💻 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yadnyeshkolte/skyciv.git
   cd skyciv
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

### Environment Variables

Create a `.env` file in the root directory with the following:
```
VITE_APP_API_URL=https://your-backend-api-url.com
```

## 🔍 How It Works

1. **User Flow:**
    - Users visit the landing page
    - They can either select a sample model or upload their own STL file
    - Once a model is selected/uploaded, the 3D viewer loads for interactive exploration

2. **Technical Process:**
    - STL files are processed on the server
    - The viewer uses THREE.js to render 3D models in the browser
    - Responsive design ensures usability across all devices

## 🧪 Future Enhancements

- Material property visualization
- Stress analysis overlay
- Collaborative viewing with real-time annotations
- Export capabilities to various formats
- Integration with SkyCiv's structural analysis tools

## 📄 License

MIT License

## 🙏 Acknowledgements

- [SkyCiv](https://skyciv.com) for inspiration
- [Three.js](https://threejs.org) for 3D rendering capabilities
- [React-Dropzone](https://react-dropzone.js.org) for file handling
- [Lucide React](https://lucide.dev) for beautiful icons