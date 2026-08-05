import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;
const RZENX_API_KEY = process.env.RZENX_API_KEY || '67east';
const RZENX_BASE_URL = 'https://api.rzenx.xyz';

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ─── API BYPASS ──────────────────────────────────────────────
app.post('/api/bypass', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ success: false, error: 'URL is required' });
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return res.status(400).json({ success: false, error: 'URL must start with http:// or https://' });
    }

    const encoded = encodeURIComponent(url);
    try {
        const response = await axios.get(`${RZENX_BASE_URL}/bypass?link=${encoded}&key=${RZENX_API_KEY}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
                'Accept': 'application/json',
            },
            timeout: 30000,
        });

        const data = response.data;
        const result = data?.result || data?.destination || data?.url || data?.data?.url;
        if (result && typeof result === 'string') {
            return res.json({ success: true, result });
        }
        return res.status(500).json({ success: false, error: 'No result from API' });
    } catch (error) {
        console.error('[API] Error:', error.message);
        return res.status(500).json({ success: false, error: error.message || 'Bypass failed' });
    }
});

// ─── FRONTEND ──────────────────────────────────────────────────
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌐 Bypass Web running at http://localhost:${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/api/bypass`);
});