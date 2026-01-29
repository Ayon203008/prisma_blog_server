import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

// * CREATE POST

const createPost = async (data: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'authorId'>, userId: string) => {
    const result = await prisma.post.create({
        data: {
            ...data,
            authorId: userId
        }
    })
    return result
}

// * GET ALL POST

const getAllPost = async (paylaod: { search?: string | undefined }) => {
    const allPost = await prisma.post.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: paylaod.search as string,
                        mode: "insensitive"
                    }
                },
                {
                    content: {
                        contains: paylaod.search as string,
                        mode: "insensitive"
                    }
                },
                {
                    tags: {
                        has: paylaod.search as string
                    }
                }

            ]
        }
    })
    return allPost
}

export const postService = {
    createPost,
    getAllPost
} 