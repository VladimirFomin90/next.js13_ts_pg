import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		// fetch all posts
		try {
			const data = await prisma.post.findUnique({
				where: {
					id: req.query.details,
				},
				include: {
					user: true,
					Comment: {
						orderBy: {
							createdAt: 'desc',
						},
						include: {
							user: true,
						},
					},
				},
			});
			return res.status(200).json(data);
		} catch (error) {
			res.status(403).json({ error: 'Error fetching posts' });
		}
	}
}
