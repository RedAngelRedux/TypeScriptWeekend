function fizzBuzz(fizz: number,buzz: number): string[] {

    const result : string[] = [];

    for(let i = 1; i <= 100; i++) {
        if(i % fizz === 0 && i % buzz === 0){
            result.push("FizzBuzz");
        } else if (i % fizz === 0) {
            result.push("Fizz");
        } else if (i % buzz === 0) {
            result.push("Buzz");
        } else {
            result.push(i.toString());
        }
    }

    return result;
}    
    
const fizzBuzzResults = fizzBuzz(3,5);
console.log(fizzBuzzResults);