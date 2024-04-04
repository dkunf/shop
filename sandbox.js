// Create a string
const str = "hello";

// Convert the string to an array of Unicode code points
const codePoints = Array.from(str).map((char) => char.charCodeAt(0));

// Create a Uint8Array to hold the bytes
const uint8Array = new Uint8Array(codePoints.length);

// Copy the code points into the Uint8Array
codePoints.forEach((codePoint, index) => {
  // Encode the code point into bytes
  if (codePoint <= 0xff) {
    uint8Array[index] = codePoint; // If the code point fits in one byte
  } else {
    // If the code point requires more than one byte, handle it accordingly
    // This example assumes UTF-8 encoding
    // You would need to implement proper encoding logic for your use case
    throw new Error("UTF-8 encoding not implemented");
  }
});

// Wrap the Uint8Array in an ArrayBuffer
const arrayBuffer = uint8Array.buffer;

// Now, 'arrayBuffer' contains the encoded string "hello"
console.log(arrayBuffer[0]);
