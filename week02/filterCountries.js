const fs = require('fs');
const csv = require('csv-parser');

const inputFile = 'input_countries.csv';
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

// Delete canada.txt and usa.txt if already exist
if (fs.existsSync(canadaFile)) {
    fs.unlinkSync(canadaFile);
    console.log(`${canadaFile} deleted successfully.`);
}

if (fs.existsSync(usaFile)) {
    fs.unlinkSync(usaFile);
    console.log(`${usaFile} deleted successfully.`);
}

const canadaData = [];
const usaData = [];

// Read and filter data from CSV
fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
        // Filter data of Canada
        if (row.country.toLowerCase() === 'canada') {
            canadaData.push(row);
        }
        // Filter data of United States
        if (row.country.toLowerCase() === 'united states') {
            usaData.push(row);
        }
    })
    .on('end', () => {
        // Write Canada data to canada.txt
        const canadaHeader = 'country,year,population\n';
        const canadaContent = canadaData.map(row => 
            `${row.country},${row.year},${row.population}`
        ).join('\n');
        
        fs.writeFileSync(canadaFile, canadaHeader + canadaContent);
        console.log(`${canadaFile} created with ${canadaData.length} records.`);

        // Write USA data to usa.txt
        const usaHeader = 'country,year,population\n';
        const usaContent = usaData.map(row => 
            `${row.country},${row.year},${row.population}`
        ).join('\n');
        
        fs.writeFileSync(usaFile, usaHeader + usaContent);
        console.log(`${usaFile} created with ${usaData.length} records.`);

        console.log('\nProcessing completed!');
    })
    .on('error', (error) => {
        console.error('Error reading CSV file:', error.message);
    });
