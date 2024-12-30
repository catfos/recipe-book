import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import clientPromise from "@/lib/mongodb";
import type { Recipe } from "@/lib/model"
import { FormEvent } from 'react';

interface RecipesProps {
    recipes: Recipe[]
}

export default function Recipes({
    recipes,
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
        <>
            <h2>Recipes</h2>
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
        </>
    )
}


export const getServerSideProps = (async () => {
    try {
        const client = await clientPromise;
        const db = client.db("recipe_book");
        const recipes = await db
            .collection("recipes")
            .find({})
            .limit(10)
            .toArray();
        return {
            props: { recipes: JSON.parse(JSON.stringify(recipes)) }
        }
    } catch (e) {
        console.error(e);
        return { props: { recipes: [] }};
    }
  }) satisfies GetServerSideProps<{ recipes: Recipe[] }>
