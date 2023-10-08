import { Router } from "express";
import { addPost, deletePost, getPost, updatePost } from "../controllers/post-controller";

const postRouter= Router();
postRouter.get('/',getPost);
postRouter.get('/:id',getPost);
postRouter.post('/',addPost);
postRouter.put('/:id',updatePost);
postRouter.delete('/:id',deletePost);
export default postRouter;