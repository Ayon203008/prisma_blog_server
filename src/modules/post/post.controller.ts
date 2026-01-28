import { Request, Response } from "express";
import { postService } from "./post.services";
import { Post } from "../../../generated/prisma/client";

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

export const PostController = {
    createPost
}