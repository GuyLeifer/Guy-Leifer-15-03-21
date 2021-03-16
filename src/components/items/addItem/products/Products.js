import Carousel from 'styled-components-carousel';
import Product from './Product'

function Products({ products, productSetter }) {

    return (
        <div>
            <Carousel
                center
                infinite
                showArrows
                showIndicator
                slidesToShow={1}>
                {products.map(product => {
                    return (
                        <Product key={product.id} product={product} productSetter={productSetter} />
                    )
                })}
            </Carousel>
        </div>
    )
}

export default Products
