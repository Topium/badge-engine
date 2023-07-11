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
    const cutSize = (cutSizes as any)[size.toString()]
    const rowSpan = Math.floor((pageWidth - cutSize * 0.5) / cutSize);
    const rowCount = Math.ceil(badgeData?.amount ? badgeData.amount / rowSpan : 0);

    return (
    <>
        {badgeData && size ?

            Array.from({ length: rowCount}).map((r, i) => (
                <div key={i} className="print-row">
                    {Array.from({length: Math.min(rowSpan, badgeData.amount - i * rowSpan)}).map((b, j) => (
                        <div
                            key={i * rowSpan + j}
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
            ))

            // Array.from({ length: badgeData.amount}).map((b, i) => (
            // <div
            //     key={i}
            //     className="print-badge-cut"
            //     style={{width: cutSize + 'mm', height: cutSize + 'mm'}}
            // >
            //     <div
            //         className="print-badge-container"
            //         style={{width: size + 'mm', height: size + 'mm'}}
            //     >
            //         <img
            //             src={badgeData.fileUrl}
            //             alt=""
            //             style={{transform: `scale(${badgeData.scale}%) translate(${badgeData.imageX / badgeData.scale * 100}%,${badgeData.imageY / badgeData.scale * 100}%)`}}
            //         />
            //     </div>
            // </div>
            // ))

        : ''}
    </>
    )
}

export default BadgePrint;
