declare global {
    interface Console {
        logAsJson: (input: object) => void;
    }
}

console.logAsJson = function(input: object) {
    console.log('JSON Object:');
    console.log(JSON.stringify(input, null, 4));
};

export {}; // Required to apply the global declaration