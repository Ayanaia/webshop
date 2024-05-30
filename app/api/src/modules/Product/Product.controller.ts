import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/auth/authMiddleware";
import NotFoundError from "../../middleware/error/NotFoundError";
import ProductModel from "./Product.model";

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

const getProductDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id).lean();
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthRequest;
    const { user } = authReq;
    const product = new ProductModel({ ...authReq.body, sellerId: user?._id });
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthRequest;
    const { id } = req.params;
    const { user } = authReq;
    const product = await ProductModel.findOneAndUpdate(
      { _id: id, sellerId: user?._id },
      authReq.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      throw new NotFoundError("Product not found or not authorized");
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthRequest;
    const { id } = req.params;
    const { user } = authReq;
    const product = await ProductModel.findOneAndDelete({
      _id: id,
      sellerId: user?._id,
    });
    if (!product) {
      throw new NotFoundError("Product not found or not authorized");
    }
    res.json({});
  } catch (error) {
    next(error);
  }
};

export {
  getProducts,
  getProductDetail,
  updateProduct,
  createProduct,
  deleteProduct,
};
