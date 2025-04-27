# QRify: Instant QR Code Generator 🚀🔗

## Overview
**QRify** is a lightweight and efficient QR code generator built with **Node.js**, leveraging the **inquirer** package for user input and **qr-image** for QR code generation. It allows users to instantly convert any URL into a QR code and saves the input in a text file for reference. With a simple command-line interface, QRify ensures a seamless and automated way to generate QR codes for quick access and sharing.

## Features
- Prompt user for a URL using `inquirer`.
- Generate a QR code from the URL using `qr-image`.
- Save the QR code as an image file (`qr_img.png`).
- Save the user input URL in a text file (`URL.txt`).

## Technologies Used
- Node.js
- `inquirer` (for user input)
- `qr-image` (for QR code generation)
- `fs` (for file handling)

## Setup Instructions
### Prerequisites
Ensure you have Node.js installed on your system. You can check this by running:
```sh
node -v
```
If not installed, download and install it from [Node.js official website](https://nodejs.org/).

### Installation
1. Clone the repository:
```sh
git clone <repository-url>
cd <project-folder>
```
2. Install dependencies:
```sh
npm install inquirer qr-image fs
```

### Running the Application
1. Open a terminal and navigate to the project folder.
2. Run the following command:
```sh
nodemon index.js
```
3. Enter a URL when prompted.
4. The QR code image will be generated as `qr_img.png`.
5. The entered URL will be saved in `URL.txt`.

## Usage Example
```sh
? Type in your URL: https://example.com
The file has been saved!
```
After running the program:
- `qr_img.png` will contain the generated QR code.
- `URL.txt` will store the provided URL.


## Author
Developed by Vishnu Vandhan

