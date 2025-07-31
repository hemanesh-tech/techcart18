import Joi from 'joi';

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    
    next();
  };
};

// Validation schemas
export const registerSchema = Joi.object({
  fullName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().pattern(/^[+]?[\d\s-()]+$/).optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const productSchema = Joi.object({
  name: Joi.string().min(2).max(200).required(),
  description: Joi.string().min(10).max(2000).required(),
  shortDescription: Joi.string().max(500).optional(),
  price: Joi.number().min(0).required(),
  originalPrice: Joi.number().min(0).optional(),
  discount: Joi.number().min(0).max(100).optional(),
  category: Joi.string().required(),
  subcategory: Joi.string().optional(),
  brand: Joi.string().required(),
  model: Joi.string().optional(),
  sku: Joi.string().required(),
  stock: Joi.number().min(0).required(),
  weight: Joi.number().min(0).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  freeShipping: Joi.boolean().optional()
});

export const orderSchema = Joi.object({
  items: Joi.array().items(Joi.object({
    product: Joi.string().required(),
    quantity: Joi.number().min(1).required()
  })).min(1).required(),
  shippingAddress: Joi.object({
    fullName: Joi.string().required(),
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string().optional(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
    country: Joi.string().optional(),
    phone: Joi.string().required()
  }).required(),
  paymentMethod: Joi.string().valid('credit_card', 'debit_card', 'net_banking', 'upi', 'cod', 'wallet').required()
});