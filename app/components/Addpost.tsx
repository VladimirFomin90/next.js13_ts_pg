'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function CreatePost() {
	const [title, setTitle] = useState('');
	const [isDisables, setIsDisables] = useState(false);

	// create a post
	const {mutate} = useMutation(
		async (title) => await axios.post('/api/posts/addPost', { title })
	);
	return (
		<form className='bg-white my-8 p-8 rounded-md'>
			<div className='flex flex-col my-4'>
				<textarea
					onChange={(text) => setTitle(text.target.value)}
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
					disabled={isDisables}
					className='text-sm bg-teal-600 text-white p-2 rounded-xl px-6 disabled:opacity-25 '
				>
					Create a post
				</button>
			</div>
		</form>
	);
}
