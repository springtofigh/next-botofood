import MenuPage from "../../components/templates/MenuPage";

function Menu({ data }) {
  return <MenuPage data={data} />;
}
export default Menu;

// This function gets called at build time
export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch(`${process.env.BASE_URL}/data`)
    const data = await res.json()

    return {
      props: {
        data
      },
      revalidate: 3600,
    }
}