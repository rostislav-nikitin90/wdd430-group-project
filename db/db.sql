
CREATE TABLE profiles (
    profile_id SERIAL PRIMARY KEY,    
    name VARCHAR(255) NOT NULL,       
    contact VARCHAR(255)              
);


CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,              
    name VARCHAR(255) NOT NULL,                 
    image TEXT,                                  
    description TEXT,                            
    price DECIMAL(10, 2) NOT NULL,               
    profile_id INTEGER NOT NULL,                
    CONSTRAINT fk_profile 
        FOREIGN KEY(profile_id) 
        REFERENCES profiles(profile_id) 
        ON DELETE CASCADE                       
);


CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,               
    name VARCHAR(255) NOT NULL,                 
    email VARCHAR(255),                         
    comment TEXT,                               
    star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5), 
    product_id INTEGER NOT NULL,                
    CONSTRAINT fk_product 
        FOREIGN KEY(product_id) 
        REFERENCES products(product_id) 
        ON DELETE CASCADE                      
);