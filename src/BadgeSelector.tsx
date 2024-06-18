import { useEffect, useState } from "react"
import { ErrorResponse, ListBadgeData } from "./types/interfaces"
import axios, { AxiosError } from "axios"
import { useAuth } from "./provider/authProvider";

type Props = { onBadgeSelect: (b: ListBadgeData) => void; }

function BadgeSelector({onBadgeSelect}: Props) {
    const [badgesList, setBadgesList] = useState<ListBadgeData[]>([])
    const [error, setError] = useState<string>()
    const {user} = useAuth()

    useEffect(() => {
        setTimeout(() => { // There's some kind of threading issue with pimysql:https://github.com/julien-duponchelle/python-mysql-replication/issues/138
                axios.get<ListBadgeData[]>(import.meta.env.VITE_BACKEND + '/badges')
                .then((res)=> {
                    setBadgesList(res.data)
                    setError(undefined)
                })
                .catch((err: AxiosError<ErrorResponse>) => {
                    setBadgesList([])
                    const message = err.response?.data.msg || err.message
                    setError(message)
                })
        }, 500);
    }, [user])

    function handleBadgeChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedBadge: ListBadgeData | undefined = badgesList.find((b) => b.id.toString() === e.target.value)
        if (selectedBadge) {
            onBadgeSelect(selectedBadge)
        }
    }

    return (
        <>
        { error ? (
            <div className="error">{error}</div>
        ) : (
            <>
                <label htmlFor="badge-input">
                    Valitse pinssi:&nbsp;
                    <select defaultValue={-1} onChange={handleBadgeChange} name="size" id="badge-input">
                        <option disabled value={-1}>Valitse pinssi...</option>
                        { badgesList.map((b) => (
                            <option key={b.id} value={b.id}>{b.badge_name}</option>
                        ))}
                    </select>
                </label>
            </>
        )}
        </>
    )
}

export default BadgeSelector