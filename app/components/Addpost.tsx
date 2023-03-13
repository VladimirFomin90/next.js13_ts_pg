'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function CreatePost() {
	const [title, setTitle] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);
	const queryClient = useQueryClient();
	let toastPostID: string;

	// create a post
	const { mutate } = useMutation(
		async (title: string) =>
			await axios.post('/api/posts/addPost', { title }),
		{
			onError: (error) => {
				if (error instanceof AxiosError) {
					toast.error(error?.response?.data.message, {
						id: toastPostID,
					});
				}
				setIsDisabled(false);
			},
			onSuccess: (data) => {
				queryClient.invalidateQueries(['posts']);
				toast.success('Post has been made', { id: toastPostID });
				setTitle('');
				setIsDisabled(false);
			},
		}
	);

	const submitPost = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsDisabled(true);
		// toastPostID = toast.loading('Creating your post', { id: toastPostID });
		mutate(title);
	};

	return (
		<form onSubmit={submitPost} className='bg-white my-8 p-8 rounded-md'>
			<div className='flex flex-col my-4'>
				<textarea
					onChange={(e) => setTitle(e.target.value)}
					name='title'
					value={title}
					placeholder="What's on your mind?"
					className='p-4 text-lg rounded-md my-2 bg-gray-200'
				></textarea>
			</div>
			<div className='flex items-center justify-between gap-2'>
				<p
					className={`font-bold tex-sm ${
						title.length > 240 ? 'text-red-600' : 'text-gray-600'
					}`}
				>{`${title.length}/240`}</p>
				<button
					disabled={isDisabled}
					className='text-sm bg-teal-600 text-white p-2 rounded-xl px-6 disabled:opacity-25 '
				>
					Create a post
				</button>
			</div>
		</form>
	);
}
