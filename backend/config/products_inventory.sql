-- Brands table
DROP TABLE IF EXISTS brands CASCADE;
CREATE TABLE brands (
    brand_id SERIAL PRIMARY KEY,
    brand_name VARCHAR(100) UNIQUE NOT NULL,
    integration_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products table
DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    brand_id INTEGER REFERENCES brands(brand_id),
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster product lookups
CREATE INDEX idx_products_brand_id ON products(brand_id);

-- Inventory table
DROP TABLE IF EXISTS inventory CASCADE;
CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER NOT NULL,
    last_restocked_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster inventory lookups
CREATE INDEX idx_inventory_product_id ON inventory(product_id);

-- Product categories table
DROP TABLE IF EXISTS product_categories CASCADE;
CREATE TABLE product_categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL
);

-- Product-category association table
DROP TABLE IF EXISTS product_category_mapping CASCADE;
CREATE TABLE product_category_mapping (
    product_id INTEGER REFERENCES products(product_id),
    category_id INTEGER REFERENCES product_categories(category_id),
    PRIMARY KEY (product_id, category_id)
);

-- Index for faster category lookups
CREATE INDEX idx_product_category_mapping_category_id ON product_category_mapping(category_id);