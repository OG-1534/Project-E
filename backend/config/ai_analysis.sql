-- Skin analysis results table
DROP TABLE IF EXISTS skin_analysis_results CASCADE;
CREATE TABLE skin_analysis_results (
    analysis_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    analysis_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    skin_type VARCHAR(50),
    concerns TEXT[],
    image_url VARCHAR(255),
    ai_generated_report TEXT
);

-- Index for faster user lookups
CREATE INDEX idx_skin_analysis_results_user_id ON skin_analysis_results(user_id);

-- Recommendations table
DROP TABLE IF EXISTS recommendations CASCADE;
CREATE TABLE recommendations (
    recommendation_id SERIAL PRIMARY KEY,
    analysis_id INTEGER REFERENCES skin_analysis_results(analysis_id),
    product_id INTEGER REFERENCES products(product_id),
    recommendation_type VARCHAR(50),
    priority INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster lookups
CREATE INDEX idx_recommendations_analysis_id ON recommendations(analysis_id);
CREATE INDEX idx_recommendations_product_id ON recommendations(product_id);

-- Dermatologist reviews table
DROP TABLE IF EXISTS dermatologist_reviews CASCADE;
CREATE TABLE dermatologist_reviews (
    review_id SERIAL PRIMARY KEY,
    analysis_id INTEGER REFERENCES skin_analysis_results(analysis_id),
    dermatologist_id INTEGER REFERENCES users(user_id),
    review_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    review_notes TEXT,
    treatment_plan TEXT
);

-- Indexes for faster lookups
CREATE INDEX idx_dermatologist_reviews_analysis_id ON dermatologist_reviews(analysis_id);
CREATE INDEX idx_dermatologist_reviews_dermatologist_id ON dermatologist_reviews(dermatologist_id);

-- Virtual consultations table
DROP TABLE IF EXISTS virtual_consultations CASCADE;
CREATE TABLE virtual_consultations (
    consultation_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    dermatologist_id INTEGER REFERENCES users(user_id),
    consultation_date TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster lookups
CREATE INDEX idx_virtual_consultations_user_id ON virtual_consultations(user_id);
CREATE INDEX idx_virtual_consultations_dermatologist_id ON virtual_consultations(dermatologist_id);