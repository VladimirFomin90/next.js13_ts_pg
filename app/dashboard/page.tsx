import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import MyPosts from './myPosts';

export default async function Dashboard() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect('/api/auth/signin');
	}
	return (
		<main>
			<h1 className='text-bold text-2xl'>
				Welcome back {session?.user?.name}
			</h1>
			<MyPosts />
			
		</main>
	);
}
