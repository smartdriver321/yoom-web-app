'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Loader } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'

import { useGetCallById } from '@/lib/hooks/useGetCallById'
import Alert from '@/components/shared/Alert'

export default function Meeting() {
	const [isSetupComplete, setIsSetupComplete] = useState(false)

	const { id } = useParams()
	const { isLoaded, user } = useUser()
	const { call, isCallLoading } = useGetCallById(id)

	if (!isLoaded || isCallLoading) return <Loader />

	if (!call)
		return (
			<p className='text-center text-3xl font-bold text-white'>
				Call Not Found
			</p>
		)

	// get more info about custom call type:  https://getstream.io/video/docs/react/guides/configuring-call-types/
	const notAllowed =
		call.type === 'invited' &&
		(!user || !call.state.members.find((m) => m.user.id === user.id))

	if (notAllowed)
		return <Alert title='You are not allowed to join this meeting' />

	return (
		<main className='h-screen w-full'>
			<StreamCall call={call}>
				<StreamTheme></StreamTheme>
			</StreamCall>
		</main>
	)
}
