const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validateExtension = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise((resolve, reject) => {

        const { file } = files;
        const nameCut = file.name.split('.');
        const extension = nameCut [nameCut.length -1];

        //validar la extension
        if (!validateExtension.includes(extension)) {
            return reject(`La extensión ${extension} no es valida, permitidas ${validateExtension}`)
            
        }

        const nameTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, nameTemp);

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(nameTemp);
        });
    });

    
}

module.exports = {
    uploadFile
}