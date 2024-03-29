export type PostType = {
	id: string;
	title: string;
	updateAt?: string;
	user: {
		email: string;
		id: string;
		image: string;
		name: string;
	};
	Comment: {
		createdAt?: string;
		id: string;
		postId: string;
		title: string;
		userId: string;
		user: {
			id: string;
			email: string;
			name: string;
		};
	}[];
};
