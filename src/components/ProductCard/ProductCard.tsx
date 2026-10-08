import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <article className={styles.card}>
      <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
        <img
          src={`/${product.image}`}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.title}>
        {product.name}
      </Link>

      <div className={styles.price}>
        <span>${product.price}</span>

        {product.fullPrice !== product.price && (
          <span className={styles.oldPrice}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.line} />

      <div className={styles.specifications}>
        <div>
          <span>Screen</span>
          <span>{product.screen}</span>
        </div>

        <div>
          <span>Capacity</span>
          <span>{product.capacity}</span>
        </div>

        <div>
          <span>RAM</span>
          <span>{product.ram}</span>
        </div>
      </div>

      <button type="button" className={styles.addButton}>
        Add to cart
      </button>
    </article>
  );
};
