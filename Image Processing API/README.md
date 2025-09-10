
# Image Processing API

## Overview
This project provides an API endpoint for resizing images on demand. Images are processed using **Sharp** and cached for future requests to improve performance.

The project is built with **TypeScript**, **Express**, and includes **unit + API tests**.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/raghadjam/Udactiy_Fullstack/
   cd Udactiy_Fullstack
   
2. Install dependencies:

   ```bash
   npm install
   ```

---

## Available Scripts

* **Build the project**

  ```bash
  npm run build
  ```

* **Start the server** (after build)

  ```bash
  npm start
  ```

* **Run tests**

  ```bash
  npm test
  ```

* **Lint the code**

  ```bash
  npm run lint
  ```

* **Format the code**

  ```bash
  npm run format
  ```

---

## API Endpoint

### `GET /api/images`

Resize an image and return the processed file.

**Query Parameters:**

* `filename` (string, required) – name of the image in `images/` folder (without extension).
* `width` (number, required) – desired image width in pixels.
* `height` (number, required) – desired image height in pixels.

**Example Request:**

```
http://localhost:3000/api/images?filename=fjord&width=200&height=200
```

If the resized image already exists in the `thumbnails/` folder, it will be returned from cache instead of being re-processed.

---

## Error Handling

* `400 Bad Request` → Missing or invalid parameters.
* `404 Not Found` → Image file does not exist.
* `500 Internal Server Error` → Unexpected errors during processing.

---

## Testing

This project includes:

* **Unit tests** for the image processing utility.
* **Integration tests** for the API endpoint.

Run tests with:

```bash
npm test
```

---

