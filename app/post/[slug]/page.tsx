'use client';

import Post from '@/app/components/Post';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// fetch all posts
const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/posts/${slug}`);
	return response.data;
};

export default function PostDetail() {
	return (
		<div>
			{/* <Post /> */}
		</div>
	);
}
