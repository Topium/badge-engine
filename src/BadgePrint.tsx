import { BadgeData } from "./interfaces";

const BadgePrint = function(props: { badgeData: BadgeData | undefined, size: number}) {
    const { badgeData, size } = props;

    const cutSizes = {
        '25': 32.6,
        '38': 51,
        '59': 69.8
    }

    const cutSize = (cutSizes as any)[size.toString()]

    return (
    <>
        <h2>Badgeprint</h2>
        {badgeData && size ?

            Array.from({ length: badgeData.amount}).map((b, i) => (
            <div
                key={i}
                className="print-badge-cut"
                style={{width: cutSize + 'mm', height: cutSize + 'mm'}}
            >
                <div
                    className="print-badge-container"
                    style={{width: size + 'mm', height: size + 'mm'}}
                >
                    <img
                        src={badgeData.fileUrl}
                        alt=""
                        style={{transform: `scale(${badgeData.scale}%) translate(${badgeData.imageX / badgeData.scale * 100}%,${badgeData.imageY / badgeData.scale * 100}%)`}}
                    />
                </div>
            </div>
            ))

        : ''}
    </>
    )
}

export default BadgePrint;
