import { useEffect, useState } from "react"
import { ListBadgeData } from "./interfaces"

type Props = { onBadgeSelect: (b: ListBadgeData) => void; }

function DBForm({onBadgeSelect}: Props) {
    const [badgesList, setBadgesList] = useState<ListBadgeData[]>([])

    useEffect(() => {
        fetch('http://127.0.0.1:5000/badges')
        .then((res) => res.json())
        .then((data: ListBadgeData[]) => setBadgesList(data))
    }, [])

    function handleBadgeChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedBadge: ListBadgeData | undefined = badgesList.find((b) => b.id.toString() === e.target.value)
        if (selectedBadge) {
            onBadgeSelect(selectedBadge)
        }
    }

    return (
        <label htmlFor="size">
            Valitse pinssi:&nbsp;
            <select onChange={handleBadgeChange} name="size" id="size-input">
                { badgesList.map((b) => (
                    <option key={b.id} value={b.id}>{b.badge_name}</option>
                ))}
            </select>
        </label>
    )
}

export default DBForm