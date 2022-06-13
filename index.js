import fs from 'fs';

const PATH = './files-100k'
const files = fs.readdirSync(PATH);

const binarySearch = (array, key) => {
    let start = 0;
    let end = array.length - 1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);

        if (array[middle] === key) {
            return middle;
        } else if (array[middle] < key) {
            start = middle + 1;
        } else {
            end = middle - 1;
        }
    }
    return -1;
};

const uniqueArray = () => {
    let array = [];

    files.forEach((file) => {
        const data = fs.readFileSync(`${PATH}/${file}`, {encoding:'utf8', flag:'r'}).split('\n');
        array = array.concat(data);
    });
    return [...new Set(array)];
}

const uniqueValues = () => {
    const array = uniqueArray();
    console.log(`Уникальных словосочетаний: ${array.length}`);
};

const existInAllFiles = () => {
    let inAllArray = [];
    let allNamesArray = [];
    const uniqueNamesArray = uniqueArray().sort();

    files.forEach((file) => {
        const data = fs.readFileSync(`${PATH}/${file}`, {encoding:'utf8', flag:'r'}).split('\n').sort();
        allNamesArray.push(data);
    });

    for (let j = 0; j < uniqueNamesArray.length; j++) {
        let count = 0;
        for (let i = 0; i < allNamesArray.length; i++) {
            (binarySearch(allNamesArray[i], uniqueNamesArray[j]) !== -1) && count++;
        }
        (count === allNamesArray.length) && inAllArray.push(uniqueNamesArray[j]);
    }
    console.log(`Словосочетаний, которые есть во всех 20 файлах: ${inAllArray.length}`);

};

const existInAtLeastTen = () => {
    let inTenArray = [];
    let allNamesArray = [];
    const uniqueNamesArray = uniqueArray().sort();

    files.forEach((file) => {
        const data = fs.readFileSync(`${PATH}/${file}`, {encoding:'utf8', flag:'r'}).split('\n').sort();
        allNamesArray.push(data);
    });

    loop: for (let j = 0; j < uniqueNamesArray.length; j++) {
        let count = 0;
        for (let i = 0; i < allNamesArray.length; i++) {
            if (binarySearch(allNamesArray[i], uniqueNamesArray[j]) !== -1) {
                count++;
            }
            if (count === 10) {
                inTenArray.push(uniqueNamesArray[j]);
                continue loop;
            }
        }
    }
    console.log(`Словосочетаний, которые есть, как минимум, в 10 файлах: ${inTenArray.length}`);
};

console.time('time');

uniqueValues();
existInAllFiles();
existInAtLeastTen();

console.timeEnd('time');


