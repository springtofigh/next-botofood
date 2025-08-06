import { useRouter } from "next/router";
import DetailsPage from "../../components/templates/DetailsPage";

function Details({ food }) {
  const router =  useRouter()

  if (router.isFallback) {
    return <h2>Loading...</h2>
  }

  return <DetailsPage food= { food }/>;
}

export default Details;


export async function getStaticPaths() {

  const res = await fetch(`${process.env.BASE_URL}/data`)
  const foods = await res.json()
  const data = foods.slice(0, 10)
 
  // Get the paths we want to pre-render based on foods
  const paths = data.map((food) => ({
    params: { id: food.id.toString() },
  }))
 
  // We'll pre-render only these paths at build time.
  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {

  const res = await fetch(`${process.env.BASE_URL}/data/${params.id}`)
  const food = await res.json()

  if (!food.id) {
   return {
    notFound: true,
   };
  }
 
  // Pass post data to the page via props
  return { props: { food }, revalidate: +process.env.REVALIDATE, }
}