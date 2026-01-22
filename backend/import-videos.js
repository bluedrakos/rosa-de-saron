const fs = require('fs');
const path = require('path');

const CSV_FILE = path.join(__dirname, 'enlaces', 'videos.csv');
const STRAPI_URL = 'http://localhost:1337/api/reuniones';

// Helper to parse CSV line with quotes
function parseCSVLine(text) {
    const re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
    const re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;

    const a = [];
    text.replace(re_value, function(m0, m1, m2, m3) {
        if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
        else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"').replace(/""/g, '"'));
        else if (m3 !== undefined) a.push(m3);
        return '';
    });
    if (/,\s*$/.test(text)) a.push('');
    return a;
}

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD') // Remove accents
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

function extractSpeaker(title) {
    // Attempt to find speaker name after "Predicación"
    const match = title.match(/Predicación\s+(?:Pastor|Pastora|Presbítero)?\s*([A-Za-zÀ-ÿ ]+?)(?:\s+Domingo|\s+Sábado|\s+Culto|\s*$)/i);
    return match ? match[1].trim() : "Iglesia Rosa de Sarón";
}

async function importVideos() {
    console.log('Reading CSV file...');
    const fileContent = fs.readFileSync(CSV_FILE, 'utf-8');
    const lines = fileContent.split('\n').filter(l => l.trim().length > 0);
    
    // Skip header
    const dataLines = lines.slice(1);
    
    console.log(`Found ${dataLines.length} videos to import.`);

    let successCount = 0;

    for (const line of dataLines) {
        // Simple manual split might fail on quoted commas, but let's try our regex or fallback
        // Since we know the structure: Title, Link, Date. Link and Date usually don't have commas.
        // Title might have commas and is quoted if so.
        // Let's use a simpler split if regex is too complex/brittle, but the regex above is standard.
        // Actually, for this specific file, we can split by `https` index?
        // No, let's try the regex parser loop.
        
        let cols = parseCSVLine(line);
        if (cols.length < 3) {
             // Fallback: splitting by last two commas isn't safe if link has comma (unlikely)
             // But Title is the erratic one.
             // Let's try splitting by ",http" which is a safe delimiter for this specific file structure
             const parts = line.split(',http');
             if (parts.length === 2) {
                const titlePart = parts[0];
                const rest = 'http' + parts[1];
                const lastComma = rest.lastIndexOf(',');
                const link = rest.substring(0, lastComma);
                const date = rest.substring(lastComma + 1);
                cols = [titlePart.replace(/^"|"$/g, ''), link, date];
             }
        }

        if (cols.length >= 3) {
            const title = cols[0].trim();
            const link = cols[1].trim();
            const dateStr = cols[2].trim();
            
            const speaker = extractSpeaker(title);
            const slug = slugify(title) + '-' + Math.random().toString(36).substr(2, 5); // Add random to ensure uniqueness

            const payload = {
                data: {
                    title: title,
                    videoUrl: link,
                    date: dateStr.split('T')[0], // Extract YYYY-MM-DD
                    speaker: speaker,
                    slug: slug,
                    description: "Predicación del culto."
                }
            };

            try {
                const res = await fetch(STRAPI_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                
                if (res.ok) {
                    process.stdout.write('.');
                    successCount++;
                } else {
                    const err = await res.json();
                    console.error(`\nFailed to import: ${title}`, JSON.stringify(err, null, 2));
                }
            } catch (error) {
                console.error(`\nError requesting ${STRAPI_URL}`, error.message);
            }
            
            // Small delay to be nice
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }

    console.log(`\nImport completed! Successfully imported ${successCount} videos.`);
}

importVideos();
