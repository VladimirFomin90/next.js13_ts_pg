import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const session = await getServerSession(req, res, authOptions);
		if (!session)
			return res.status(401).json({ message: 'Sign in to make a post' });

		const title: string = req.body.title;

		// User
		const prismaUser = await prisma.user.findUnique({
			where: { email: session?.user?.email },
		});

		// Check title
		if (title.length > 240)
			return res.status(403).json({ message: 'Too long text!' });
		if (!title.length)
			return res.status(403).json({ message: 'Write something!' });

		// create Post
		try {
			const result = await prisma.post.create({
				data: {
					title,
					userId: prismaUser.id,
				},
			});
			res.status(200).json(result);
		} catch (error) {
			res.status(403).json({
				error: 'Error has occured while making a post',
			});
		}
	}
}
