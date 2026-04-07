const fs = require('fs');
const https = require('https');
const path = require('path');

const urls = [
  "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541252870104-1b07223b207d?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000&auto=format&fit=crop"
];

const dir = 'c:/Users/User/Downloads/sport/mercurial/public/athletes';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

urls.forEach((url, i) => {
  const req = https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      https.get(res.headers.location, (res2) => {
        const stream = fs.createWriteStream(path.join(dir, 'athlete_' + (i + 1) + '.jpg'));
        res2.pipe(stream);
        stream.on('finish', () => console.log('Downloaded', i+1));
      }).on('error', console.error);
    } else {
      const stream = fs.createWriteStream(path.join(dir, 'athlete_' + (i + 1) + '.jpg'));
      res.pipe(stream);
      stream.on('finish', () => console.log('Downloaded', i+1));
    }
  });
  req.on('error', console.error);
});
