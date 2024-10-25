const fs = require('fs');
const cities = require("./cities.json");


const keyExists = {

}

let uniqueCities = [];

cities.forEach(c => {
    if (!keyExists[c.admin_name]) {
        uniqueCities.push(c);
        keyExists[c.admin_name] = true;
    }
});

// Convert unique cities array to JSON and save to a file
fs.writeFile('uniqueCities.json', JSON.stringify(uniqueCities, null, 2), (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('uniqueCities.json file has been saved with unique cities!');
    }
});
