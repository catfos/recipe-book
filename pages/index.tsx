import type { Recipe } from "@/lib/model"
import { Inter } from "next/font/google";
import client from "@/lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { FormEvent } from 'react';
import Page from "@/components/Page";
import LoremIpsum from "@/components/LoremIpsum";

type ConnectionStatus = {
  isConnected: boolean;
  recipes: Array<Recipe>;
};

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await client.connect(); // `await client.connect()` will use the default database passed in the MONGODB_URI

    const db = client.db("recipe_book");
    const recipes = await db
        .collection("recipes")
        .find({})
        .limit(10)
        .toArray();

    return {
      props: { isConnected: true, recipes: JSON.parse(JSON.stringify(recipes)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false, recipes: [] },
    };
  }
};

export default function Home({
  isConnected,
  recipes
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
          event.preventDefault();
          
          const formData = new FormData(event.currentTarget);
          const dataToPost = JSON.stringify({
              name: formData.get("name"),
              category: formData.get("category")
          })
          
          const response = await fetch("/api/recipe_add", {
              method: 'POST',
              body: dataToPost
          });
  
          const data = response.json();
      }
  
  return (
    <Page>
        <h1 className="text-xl">Recipes</h1>
        {recipes.map((recipe: Recipe) => 
            <li key={recipe._id}>{recipe.name}</li>
        )}
        <form onSubmit={onSubmit}>
            <input id="name" name="name" placeholder="name"/>
            <select id="category" name="category">
                <option>Dinner</option>
                <option>Lunch</option>
            </select>
            <button type="submit">Submit</button>
        </form>
        <LoremIpsum />
    </Page>
  );
}
