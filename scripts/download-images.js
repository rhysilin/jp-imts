import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define project root (one level up from scripts/)
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const imagesDir = path.join(publicDir, 'images');

// Image URLs (Unsplash High Quality)
const images = [
  {
    name: 'philo-1.jpg', // Elderly/Health/Lifestyle
    url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'philo-2.jpg', // Globalization/Abstract
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'philo-3.jpg', // Diversity/Communication
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'feature-tech.jpg', // Medical Technology/Surgery
    url: 'https://images.unsplash.com/photo-1579684385136-137af75135a8?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'feature-team.jpg', // Medical Team
    url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2070&auto=format&fit=crop'
  }
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✅ Downloaded: ${path.basename(filepath)}`);
          resolve();
        });
      } else {
        res.consume();
        reject(new Error(`Failed to download ${url}, status code: ${res.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const main = async () => {
  console.log('📂 Checking directories...');
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
    console.log('📂 Created directory: public/images');
  }

  console.log('⬇️  Starting image downloads...');

  try {
    await Promise.all(images.map(img => {
      const filepath = path.join(imagesDir, img.name);
      return downloadImage(img.url, filepath);
    }));
    console.log('✨ All images downloaded successfully!');
  } catch (error) {
    console.error('❌ Error downloading images:', error);
  }
};

main();