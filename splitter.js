const fs = require('fs');

// Path to the large JSON file
const filePath = './cities.json';

// Number of items per chunk (change this based on your needs)
const itemsPerChunk = 5;
const unified = {};

// Read the large JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Parse the JSON data
    const jsonArray = JSON.parse(data);

    // Split the array into smaller chunks
    let chunkIndex = 0;
    for (let i = 0; i < jsonArray.length; i += itemsPerChunk) {
        // Extract a chunk from the array
        const chunk = jsonArray.slice(i, i + itemsPerChunk);

        unified[`batch-${chunkIndex}`] = chunk;
        chunkIndex++;
    }

    // Write the chunk to a new JSON file
    const outputFilePath = `./unified.json`;
    fs.writeFile(outputFilePath, JSON.stringify(unified, null, 2), (err) => {
        if (err) {
            console.error('Error writing the file:', err);
        } else {
            console.log(`Chunk written to ${outputFilePath}`);
        }
    });

});
