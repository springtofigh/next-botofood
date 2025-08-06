import styles from "./DetailsPage.module.css";
import Location from "../icons/Location";
import Dollar from "../icons/Dollar";

function DetailsPage({ food }) {
  const discountedPrice = food.discount ? (food.price * (100 - food.discount)) / 100 : food.price;

  return (
    <div className={styles.container}>
      <h2>Details</h2>
      <div className={styles.banner}>
        <img src={`/images/${food.id}.jpeg`} alt={food.name}/>
        <div>
          <h3>{food.name}</h3>
          <span className={styles.location}>
          <Location/>
          {food.details[0].Cuisine}
          </span>
          <span className={styles.location}>
          <Dollar/>
          {discountedPrice}$
          </span>
          {food.discount ? (<span className={styles.discount}>{food.discount} $ OFF</span>) : null}
        </div>
      </div>
      <div className={styles.introduction}>
        <p>{food.introduction}</p>
      </div>
      <div className={styles.details}>
        <h4>Details</h4>
        <ul>
          {
            food.details.map((detail, index) => (
              <li key={index}>
                <p>{Object.keys(detail)[0]}:</p>
                <span>{Object.values(detail)[0]}</span>
              </li>
            ))
          }
        </ul>
      </div>
      <div className={styles.details}>
        <h4>Ingredients</h4>
        <ul>
          {
            food.ingredients.map((ingredient, index) => (
              <li key={index}>
                <p>{ingredient}</p>
              </li>
            ))
          }
        </ul>
      </div>
      <div className={styles.recipe}>
        <h4>Recipe</h4>
        {
          food.recipe.map((item, index) => (
            <div key={index} className={index%2 ? styles.odd : styles.even }>
              <span>{index + 1}</span>
              <p>{item}</p>
            </div>
          ))
        }
      </div>
      <button>Add To Cart</button>
    </div>
  );
}

export default DetailsPage;
