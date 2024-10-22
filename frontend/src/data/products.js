// src/data/products.js
const products = [
    {
      id: 1,
      name: "Product 1",
      image: require('../img/product1.jpg'), // Use require to dynamically resolve the image path
    },
    {
      id: 2,
      name: "Product 2",
      image: require('../img/product2.jpg.'),
    },
    {
        id: 3,
        name: "Product 2",
        image: require('../img/product3.jpg.'),
    },
    {
        id: 4,
        name: "Product 5",
        image: require('../img/product5.jpg'),
    },
    {
        id: 6,
        name: "Product 6",
        image: require("../img/product6.jpg"),
    },
    {
        id: 7,
        name: "Product 7",
        image: require("../img/product7.jpg"),
    }
  ];
  
  export default products;
