import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../modules/Card";
import styles from "./CategoriesPage.module.css";

function CategoriesPage({ data }) {
  const [query, setQuery] = useState({ difficulty: "", cookTime:""});
  const router = useRouter();

  useEffect(() => {
    const { difficulty, cookTime} = router.query
    if (query.difficulty !== difficulty || query.cookTime !== cookTime) {
      setQuery({difficulty, cookTime})
    }
  }, [router.query])

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setQuery({...query, [name]: value});
  }

  const handleSearch = () => {
    router.push({pathname:"/categories", query})
  };

  return (
    <div className={styles.container}>
      <h2>Categories</h2>
      <div className={styles.select}>
        <select name="difficulty" value={query.difficulty} onChange={changeHandler}>
          <option value="">Difficalty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select name="cookTime" value={query.cookTime} onChange={changeHandler}>
          <option value="">Cooking Time</option>
          <option value="moreThan30">More Than 30 min</option>
          <option value="lessThan30">Less Than 30 min</option>
        </select>
        <button onClick={handleSearch}>Search</button>
        <div className={styles.cards}>
          {!data.length ? <img src="/images/search.png"  alt="Category" /> : null}
          {
            data.map(food => <Card key={food.id} food={food}/>)
          }
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
