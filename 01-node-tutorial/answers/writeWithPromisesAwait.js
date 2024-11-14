const { writeFile, readFile } = require("fs").promises; 

const writer = async () => {
    try {
        await writeFile('temp.txt', 'one\n');
        await writeFile('temp.txt', 'two\n', { flag: 'a' });
        await writeFile('temp.txt', 'three\n', { flag: 'a' });
    } catch (error) {
        console.log(error);
    }
};

const reader = async () => {
    try {
        const data = await readFile('temp.txt', 'utf8');
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

const readWrite = async () => {
    try {
        await writer();
        await reader();
    } catch (error) {
        console.log(error);
    }
}

readWrite();