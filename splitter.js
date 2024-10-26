// const fs = require('fs');

// // Path to the large JSON file
// const filePath = './cities.json';

// // Number of items per chunk (change this based on your needs)
// const itemsPerChunk = 2;
// const unified = {};

// // Read the large JSON file
// fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading the file:', err);
//         return;
//     }

//     // Parse the JSON data
//     const jsonArray = JSON.parse(data);

//     // Split the array into smaller chunks
//     let chunkIndex = 0;
//     for (let i = 0; i < jsonArray.length; i += itemsPerChunk) {
//         // Extract a chunk from the array
//         const chunk = jsonArray.slice(i, i + itemsPerChunk);

//         unified[`batch-${chunkIndex}`] = chunk;
//         chunkIndex++;
//     }

//     // Write the chunk to a new JSON file
//     const outputFilePath = `./unified.json`;
//     fs.writeFile(outputFilePath, JSON.stringify(unified, null, 2), (err) => {
//         if (err) {
//             console.error('Error writing the file:', err);
//         } else {
//             console.log(`Chunk written to ${outputFilePath}`);
//         }
//     });

// });



const fs = require('fs');

// Path to the large JSON file
const filePath = './cities.json';

const unified = {};

// Read the large JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Parse the JSON data
    const jsonArray = JSON.parse(data);

    // Initialize variables
    let chunkIndex = 0;
    let itemsPerChunk = 2; // Start with the desired initial chunk size

    // Split the array into progressively larger chunks
    let i = 0;
    while (i < jsonArray.length) {
        // Extract a chunk of the current size
        const chunk = jsonArray.slice(i, i + itemsPerChunk);

        // Store the chunk in the unified object with batch indexing
        unified[`batch-${chunkIndex}`] = chunk;

        // Move to the next segment and update indices
        i += itemsPerChunk;
        chunkIndex++;
        itemsPerChunk *= 2; // Double the items per chunk for the next batch
    }

    // Write the entire unified object to a single JSON file
    const outputFilePath = `./unified.json`;
    fs.writeFile(outputFilePath, JSON.stringify(unified, null, 2), (err) => {
        if (err) {
            console.error('Error writing the file:', err);
        } else {
            console.log(`Unified data written to ${outputFilePath}`);
        }
    });
});
