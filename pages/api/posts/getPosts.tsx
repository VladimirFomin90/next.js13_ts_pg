import prisma from '../../../prisma/client';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		// fetch all posts
		try {
			const data = await prisma.post.findMany({
				include: {
					user: true,
					Comment: true,
				},
				orderBy: {
					createdAt: 'desc',
				},
			});
			return res.status(200).json(data);
		} catch (error) {
			res.status(403).json({ error: 'Error fetching posts' });
		}
	}
}
