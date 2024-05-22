import  styles from './products.module.css'
import ProductsCard from "./ProductCard";


export default function ProductsContainer() {
    return (
        <>
            <div className={styles.products_container}>
                <h2 className={`text-center ${styles.products_title}`}>Products</h2>
                <div className={styles.products_list}>
                    <ul>
                        <li>
                            <ProductsCard />
                        </li>
                        <li>
                            <ProductsCard />
                        </li>
                        <li>
                            <ProductsCard />
                        </li>
                        <li>
                            <ProductsCard />
                        </li>
                        <li>
                            <ProductsCard />
                        </li>
                        <li>
                            <ProductsCard />
                        </li>
                        <li>
                            <ProductsCard />
                        </li>
                        <li>
                            <ProductsCard />
                        </li>
                        <li>
                            <ProductsCard />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}