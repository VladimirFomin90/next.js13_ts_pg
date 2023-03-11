'use client';

export default function Toggle() {
	return (
		<div className='fixed bg-black/40 w-full h-full z-20 left-0 top-0'>
			<div className='absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg flex flex-col gap-6'>
				<h2 className='text-xl '>
					Are You sure want to delete this post?
				</h2>
				<h3 className='text-red-600 text-sm'>
					post will be permanently deleted!
				</h3>
			</div>
		</div>
	);
}
