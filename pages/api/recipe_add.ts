import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import type { Recipe } from "@/lib/model";
import { NextRequest } from "next/server";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log("hit")
        const client = await clientPromise;
        const db = client.db("recipe_book");
        
        const data = JSON.parse(req.body);       

        const result = await db
            .collection("recipes")
            .insertOne(data)
            
        res.json(result);
    } catch (e) {
        console.error(e);
    }
}