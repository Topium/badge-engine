import { BadgeData } from "./interfaces";

const BadgePrint = function(props: { badgeData: BadgeData | undefined, size: number}) {
    const { badgeData, size } = props;

    const cutSizes = {
        '25': 32.6,
        '38': 51,
        '59': 69.8
    }

    const pageWidth = 180;
    const pageHeight = 270;
    const rowHeightMultiplier = 0.866;
    const cutSize = (cutSizes as any)[size.toString()]
    const rowSpan = Math.floor((pageWidth - cutSize * 0.5) / cutSize);
    const pageSpan = Math.floor(pageHeight / (cutSize * rowHeightMultiplier));
    const pageAmount = rowSpan * pageSpan
    const pageCount = Math.ceil(badgeData?.amount ? badgeData.amount / pageAmount : 0)

    return (
    <>
        {badgeData && size ?

            Array.from({ length: pageCount}).map((p, i) => (
                <div key={i} className="print-page" style={{height: pageHeight + 'mm'}}>
                    {Array.from({ length: Math.min(pageSpan, Math.ceil((badgeData.amount - i * pageSpan * rowSpan) / rowSpan))}).map((r, j) => (
                        <div key={j} className="print-row">
                            {Array.from({length: Math.min(rowSpan, badgeData.amount - i * pageSpan * rowSpan - j * rowSpan)}).map((b, k) => (
                                <div
                                    key={k * rowSpan + k}
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
                            ))}
                        </div>
                    ))}

                </div>
            ))

        : ''}
    </>
    )
}

export default BadgePrint;
