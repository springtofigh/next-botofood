import CategoriesPage from "../../components/templates/CategoriesPage";

function Categories({ data }) {
  return <CategoriesPage data={data} />;
}

export default Categories;

export async function getServerSideProps(context) {
  const { query: {difficulty, cookTime} } = context

  const res = await fetch(`${process.env.BASE_URL}/data`)
  const data = await res.json()

  const filtredData = data.filter((item) => {
    const difficultyResult = item.details.filter(
      detail =>  detail.Difficulty && detail.Difficulty === difficulty
      );

      const timeResult = item.details.filter(detail => {
        const cookingTime = detail["Cooking Time"] || "";
        const cookTimeDetail = cookingTime.split(" ")[0];
        if (cookTime === "lessThan30" && cookTimeDetail && +cookTimeDetail <= 30) {
          return detail
        }else if (cookTime === "moreThan30" && +cookTimeDetail > 30) {
          return detail
        }
      })

      if (difficulty && cookTime && difficultyResult.length && timeResult.length) {
        return item;
      } else if(!difficulty && cookTime && timeResult.length) {
        return item;
      } else if (!cookTime && difficulty && difficultyResult.length) {
        return item;
      }
  })

  return { props: { data: filtredData } }
}