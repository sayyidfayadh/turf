import React, { useState } from 'react';
import { Button, Form, Card, Container } from 'react-bootstrap';
import SuperHeader from './SuperHeader';

function AddMerchandiseForm() {
  const [products, setProducts] = useState([
    { name: '', description: '', size: '', price: '', stock: '' }
  ]);

  // Handler to add a new size as a new "product"
  const handleAddProduct = () => {
    setProducts([...products, { name: '', description: '', size: '', price: '', stock: '' }]);
  };

  // Handler to remove a product entry
  const handleRemoveProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // Handler for updating product details
  const handleProductChange = (index, field, value) => {
    const newProducts = products.map((product, i) =>
      i === index ? { ...product, [field]: value } : product
    );
    setProducts(newProducts);
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Products Submitted:", products);
    // Reset form after submission
    setProducts([{ name: '', description: '', size: '', price: '', stock: '' }]);
  };

  return (
    <div> <SuperHeader/>
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4">Add Sports Merchandise</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {products.map((product, index) => (
              <div key={index} className="mb-4 p-3 border rounded">
                <h5>Product {index + 1}</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    value={product.name}
                    onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter product description"
                    value={product.description}
                    onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Size (e.g., S, M, L)"
                    value={product.size}
                    onChange={(e) => handleProductChange(index, 'size', e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={product.price}
                    onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter stock quantity"
                    value={product.stock}
                    onChange={(e) => handleProductChange(index, 'stock', e.target.value)}
                    required
                  />
                </Form.Group>
                {products.length > 1 && (
                  <Button variant="danger" onClick={() => handleRemoveProduct(index)}>
                    Remove Product
                  </Button>
                )}
              </div>
            ))}
           <div className='d-flex justify-content-center gap-3 '>
           
            <button className='btn btn-success ' onClick={handleAddProduct}>
              Add another product
            </button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
           </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
}

export default AddMerchandiseForm;
