import styles from './cart-title.module.scss'
export default function CartTitle({ count }) {
    return (
      <div className={`${styles['j-shoppingCartTitleBox']} d-flex align-items-end pt-5 ms-2`}>
        <h1 className={`${styles['j-shoppingCartTitle']} mt-5 ms-4`}>我的購物車</h1>
        <small className="mb-2 ms-1">({count})</small>
      </div>
    );
  }