import './Product.css';
function Product({ product, productSetter }) {
    return (
        // <div className="product" onClick={() => productSetter(product)}>
        <>
            <div className="top-line">
                <div className="product-title">{product.title}</div>
                <div className="product-description">{product.description}</div>
            </div>
            <img className="product-image" src={product.image} alt={product.image} />
            <div className="bottom-line">
                <div className="product-price">Price: {product.price}</div>
                <div className="product-category">Category: {product.category}</div>
            </div>
        </>
        // </div>
    )
}

export default Product
