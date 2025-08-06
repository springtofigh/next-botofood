import Link from "next/link";
import styles from "./Card.module.css";
import Location from "../icons/Location";
import Dollar from "../icons/Dollar";

function Card({ food }) {

  return (
    <div className={styles.container}>
    <img src={`/images/${food.id}.jpeg`} alt={food.name}/>
    <div className={styles.details}>
      <h4>{food.name}</h4>
      <div>
        <Location/>
        {food.details[0].Cuisine}
      </div>
    </div>
    <div className={styles.price}>
        <Dollar/>
        {
          food.discount ? (<span className={styles.discount}>{food.price * (100 - food.discount) / 100} $</span>)  : (<span>{food.price} $</span>)
        }
        {
          food.discount ? ((<span className={styles.badge}>{(food.discount)} $</span>))  : null
        }
    </div>
    <Link href={`/menu/${food.id}`}>See Details</Link>
    </div>
  );
}

export default Card;
