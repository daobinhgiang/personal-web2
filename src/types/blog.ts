import { ObjectId } from 'mongodb';

export interface BlogPost {
  _id?: ObjectId;
  title: string;
  content: string;
  excerpt?: string;
  author?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostData {
  title: string;
  content: string;
  excerpt?: string;
  author?: string;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  excerpt?: string;
  author?: string;
}
