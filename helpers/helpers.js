import fs from "fs";

export const NEW_FILE_PATH = 'new.txt';

export const uniqueNamesInFile = (data) => {
    const allNames = data.split('\n').sort();
    return [...new Set(allNames)];
};

export const uniqueNamesInNewFile = (data) => {
    const allNames = data.split(',');
    return [...new Set(allNames)].length;
};

export const removingNewFile = () => {
    try {
        fs.unlinkSync(`${NEW_FILE_PATH}`);
    } catch(err) {
        console.error(err);
    }
};

export const addingNewFile = () => {
    try {
        fs.writeFileSync(`${NEW_FILE_PATH}`, '');
    } catch(err) {
        console.error(err);
    }
};

export const appendNewFile = (file) => {
    try {
        const data = fs.readFileSync(`./files/${file}`, {encoding:'utf8', flag:'r'});
        fs.appendFileSync(`${NEW_FILE_PATH}`, `${uniqueNamesInFile(data)}`);
    } catch(err) {
        console.error(err);
    }
};

export const uniqueNames = () => {
    const data = fs.readFileSync(`${NEW_FILE_PATH}`, {encoding:'utf8', flag:'r'});
    console.log('Уникальных юзернеймов в 20 файлах: '+ uniqueNamesInNewFile(data));
};