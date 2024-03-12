const path = require("path");
const fs = require("fs");

const deleteFile = (filename) => {
    if (!filename) return;
    const filepath = `./public/assets/images/movie-images/${filename}`;
    if (fs.existsSync(filepath)) {
        fs.unlink(filepath, (err) => {
            err 
            ? console.log(`Error in unlinking file ${err}`) 
            : console.log(`File unlinked successfully`);
        });
    }
    return true;
}

module.exports = { deleteFile };