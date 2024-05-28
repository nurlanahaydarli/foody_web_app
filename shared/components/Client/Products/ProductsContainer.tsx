import  styles from './products.module.css'
import ProductsCard from "./ProductCard";
import Loading from "../../Loading/Loading";


type ProductsState={
    id:string;
    description:string;
    img_url:string;
    name:string;
    price:number;
}
export default function ProductsContainer(products:ProductsState) {
    return (
        <>
            <div className={styles.products_container}>
                <h2 className={`text-center ${styles.products_title}`}>Products</h2>
                <div className={styles.products_list}>
                    <ul>
                        {/*{products?.map((product)=>(*/}
                        {/*    <li>*/}
                        {/*        <ProductsCard />*/}
                        {/*    </li>*/}
                        {/*))}*/}
                    </ul>
                </div>
            </div>
        </>
    )
}