'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { TiDelete } from 'react-icons/ti'

const DeleteButton = ({ id }) => {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        setIsLoading(true)

        const res = await fetch(`${location.origin}/api/tickets/${id}`, { method: 'DELETE' })
        const json = await res.json()

        if (json.error) {
            console.log(json.error)
            setIsLoading(false)
        }

        if (!json.error) {
            router.refresh()
            router.push('/tickets')
        }
    }

    return (
        <button className='btn-primary' onClick={handleClick} disabled={isLoading}>
            {isLoading ? (
                <>
                    <TiDelete /> Deleting...
                </>
            ) : (
                <>
                    <TiDelete />
                    Delete Ticket
                </>
            )}
        </button>
    )
}

export default DeleteButton
