# Din-Din API

Desafio-Back-end-03-dindin-dbeifood

## Description

This project was a final challenge to create a RESTful API in Node.js with Postgres for a e-commerce.

## Installation

1. Clone this repository: `git clone git@github.com:rdvid/desafio-backend-03-dindin-dbeifood.git`
2. Navigate to the project directory: `cd desafio-backend-03-dindin-dbeifood`
3. Install dependencies: `npm install`
4. Run the project: `npm run dev`

## How to Use

To use the API, simply send HTTP requests to the available endpoints.

### Endpoints

Here are the endpoints available in the API:

- `POST /usuario`: this path is a login panel, it demands, in your body request,
  an object with two values, and if this credencials are accepted it returns a object
  with the values passed plus a token id to use in all requests linked to user account:

#### **Request Example**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Response Example**

```javascript
// HTTP Status 200
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

rotas.post("/usuario", cadastrarUsuario)
rotas.post("/login", loginUsuario)

- `GET /categoria`: Returns a list of all registered categories.

- `GET /cliente`: Returns a list of all registered clients.

- `GET /cliente/:id`: Returns information for the client with the specified ID.

- `POST /cliente`: Creates a new client based on the data provided in the request body.

- `PUT /cliente/:id`: Updates information for the client with the specified ID based on the data provided in the request body.

- `POST /login`: Creates a new acess token based on the data provided in the request body and log the user.

- `GET /pedido`: Returns a list of all registered orders.

- `POST /pedido`: Creates a new order based on the data provided in the request body.

- `GET /produto`: Returns a list of all registered products.

- `GET /produto/:id`: Returns information for the product with the specified ID.

- `POST /produto`: Creates a new product based on the data provided in the request body.

- `PUT /produto/:id`: Updates information for the product with the specified ID based on the data provided in the request body.

- `DELETE /produto/:id`: Deletes the product with the specified ID.

- `POST /upload`: Sends a image url based on the data provided in the request body to the image's database.

- `GET /usuario`: Returns a list of all registered users.

- `POST /usuario`: Creates a new user based on the data provided in the request body.

- `PATCH /usuario/redefinir`: Updates the password information for the user on the data provided in the request body.

- `PUT /usuario`: Updates information for the user on the data provided in the request body.

To use the API, send HTTP requests to these endpoints using an HTTP client such as [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/) or [cURL](https://curl.se/).

## Contributing

We welcome contributions to this project! To contribute, follow these steps:

1. Fork this repository
2. Create a branch with your feature: `git checkout -b my-feature`
3. Commit your changes: `git commit -m 'My new feature'`
4. Push to the branch: `git push origin my-feature`
5. Open a Pull Request

## Contributors

| [<img src="https://avatars.githubusercontent.com/u/85734491?v=4" width=115><br><sub>Adelvane Ferreira</sub>](https://github.com/AdelvaneFerreira) | [<img src="https://avatars.githubusercontent.com/u/95707984?v=4" width=115><br><sub>Paulo Hartelt</sub>](https://github.com/PauloHartelt) | [<img src="https://avatars.githubusercontent.com/u/76759510?v=4" width=115><br><sub>Janine Henrique</sub>](https://github.com/janinehenrique) |
| :-----------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: |

## Contact

If you have any questions or suggestions about this project, feel free to contact me through my GitHub profile: [@PauloHartelt](https://github.com/PauloHartelt).

![imagem 1](https://user-images.githubusercontent.com/95707984/186934611-ead39007-43d3-454c-9357-0d14b11c2c51.png)
