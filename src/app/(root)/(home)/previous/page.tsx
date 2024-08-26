import CallList from '@/components/shared/CallList'

export default function PreviousPage() {
	return (
		<section className='flex size-full flex-col gap-10 text-white'>
			<h1 className='text-3xl font-bold'>Previous Calls</h1>

			<CallList type='ended' />
		</section>
	)
}
