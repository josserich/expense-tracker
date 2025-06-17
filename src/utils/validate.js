import capitalizeWord from "./capitalize";
import { numberRgx } from "./regex";

const validateImg = (img) => {
  // 1.validation extension
  const validateExt = img.mimeType.startsWith("image");
  if (!validateExt) {
    const errMsg = "Uppsss, It's not Image";
    throw new Error(errMsg);
  }
  // 2. validation base64
  const base64Length = img.base64.length;
  const sizeInBytes = 4 * Math.ceil(base64Length / 3) * 0.5624896334383812;
  const sizeInMB = sizeInBytes / (1024 * 1024);
  if (sizeInMB > 1) {
    const errMsg = "Uppsss, Maximize file Image = 1 MB";
    throw new Error(errMsg);
  }
};
const validateProduct = async (db, req) => {
  const { productId, productName, productPrice, productImg } = req;
  // validation requirement
  if (!productName || !productPrice) {
    const errMsg = `Product name and price are required !`;
    throw new Error(errMsg);
  }
  // validate price
  const isPrice = numberRgx.test(productPrice);
  if (!isPrice) {
    const errMsg = `Product Price must be Number`;
    throw new Error(errMsg);
  }
  // validation product name
  let TotalProduct = ``;
  if (productId) {
    const query = `
    SELECT 
    COUNT(*) AS totalProduct
    FROM 
    Product 
    WHERE 
    ProductId != ? AND 
    ProductName = ? `;
    const { totalProduct } = await db.getFirstAsync(query, [
      parseInt(productId),
      capitalizeWord(productName),
    ]);
    TotalProduct = totalProduct;
  }
  if (!productId) {
    const query = `
    SELECT 
    COUNT(*) AS totalProduct
    FROM 
    Product 
    WHERE 
    ProductName = ?`;
    const { totalProduct } = await db.getFirstAsync(query, [
      capitalizeWord(productName),
    ]);
    TotalProduct = totalProduct;
  }
  if (TotalProduct >= 1) {
    const msg = `${productName} - is already existed`;
    throw new Error(msg);
  }
  // validate image
  if (productImg) {
    if (productImg.mimeType) {
      validateImg(productImg);
    }
  }
};
export { validateProduct, validateImg };
