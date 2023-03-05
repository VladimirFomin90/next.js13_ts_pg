'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
	return (
		<li className='list-one'>
			<button
				className='text-sm bg-gray-700 text-white py-2 px-4 rounded-xl disabled:opacity-25'
				onClick={() => signIn()}
			>
				Sign In
			</button>
		</li>
	);
}
