import React, { useState } from 'react';
import { Button, Form, Card, Container } from 'react-bootstrap';
import SuperHeader from './SuperHeader';

function AddMerchandise() {
  const [products, setProducts] = useState([
    { name: '', description: '', size: '', price: '', stock: '', isEditing: true }
  ]);
  const [showForm, setShowForm] = useState(true); // Controls visibility of the form

  // Add a new product
  const handleAddProduct = () => {
    setProducts([
      ...products,
      { name: '', description: '', size: '', price: '', stock: '', isEditing: true }
    ]);
    setShowForm(true);
  };

  // Toggle edit mode
  const editMode = (index) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, isEditing: !product.isEditing } : product
    );
    setProducts(updatedProducts);
  };

  // Remove a product
  const handleRemove = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // Update product details
  const handleEdit = (index, field, value) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, [field]: value } : product
    );
    setProducts(updatedProducts);
  };

  return (
    <div>
      <SuperHeader />
      <Container className="mt-4">
        <Card>
          <Card.Header as="h4">Add Sports Merchandise</Card.Header>
          <Card.Body>
            {showForm ? (
              <Form>
                {products.map((product, index) => (
                  <div key={index} className="mb-4 p-3 border rounded">
                    {product.isEditing ? (
                      <>
                        <Form.Group className="mb-3">
                          <Form.Label>Product Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            value={product.name}
                            onChange={(e) => handleEdit(index, 'name', e.target.value)}
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
                            onChange={(e) => handleEdit(index, 'description', e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Size</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Size S M L XL XXL"
                            value={product.size}
                            onChange={(e) => handleEdit(index, 'size', e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter price"
                            value={product.price}
                            onChange={(e) => handleEdit(index, 'price', e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Stock</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter stock quantity"
                            value={product.stock}
                            onChange={(e) => handleEdit(index, 'stock', e.target.value)}
                            required
                          />
                        </Form.Group>
                      </>
                    ) : (
                      <div>
                        <p><strong>Name:</strong> {product.name}</p>
                        <p><strong>Description:</strong> {product.description}</p>
                        <p><strong>Size:</strong> {product.size}</p>
                        <p><strong>Price:</strong> {product.price}</p>
                        <p><strong>Stock:</strong> {product.stock}</p>
                      </div>
                    )}
                    <div className="d-flex gap-2">
                      <Button variant="warning" onClick={() => editMode(index)}>
                        {product.isEditing ? 'Save' : 'Edit'}
                      </Button>
                      {products.length > 1 && (
                        <Button variant="danger" onClick={() => handleRemove(index)}>
                          Remove Product
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <div className="d-flex justify-content-center gap-3">
                  <Button variant="success" onClick={handleAddProduct}>
                    Add another product
                  </Button>
                </div>
              </Form>
            ) : (
              <div className="text-center">
                <Button variant="success" onClick={() => setShowForm(true)}>
                  Add New Merchandise
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default AddMerchandise;
