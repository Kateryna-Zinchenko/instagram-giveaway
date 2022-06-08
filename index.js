import fs from 'fs';

const uniqueValues = () => {
    let array = [];
    const files = fs.readdirSync('./files');
    files.forEach((file) => {
        const data = fs.readFileSync(`./files/${file}`, {encoding:'utf8', flag:'r'}).split('\n');
        array = array.concat(data);
    });
    console.log(`Уникальных словосочетаний: ${[...new Set(array)].length}`);
};

uniqueValues();

