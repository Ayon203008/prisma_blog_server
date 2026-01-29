import { Request, Response } from "express";
import { postService } from "./post.services";
import { Post } from "../../../generated/prisma/client";

// * CREATE POST

const createPost = async (req: Request, res: Response) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(400).json({
                error: "Post creation failed",
            })
        }

        const result = await postService.createPost(req.body, user.id as string)
        res.status(201).json(result)
        console.log(result)
    } catch (err) {
        res.status(400).json({
            error: "Post creation failed",
        })
    }
}

// * GET ALL POST

const getAllPost = async (req: Request, res: Response) => {
    try {
        const {search} = req.query

        const searchString = typeof search==='string'? search : undefined

        console.log("Search value = ",search)
        const result = await postService.getAllPost({search:searchString})
        res.status(200).json(result)

    } catch (e) {
        res.status(400).json({
            error: "Post Creation failed",
            details: e
        })
    }
}


export const PostController = {
    createPost,
    getAllPost
}