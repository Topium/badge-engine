import axios from "axios"

type Props = {
    xPos: number;
    yPos: number;
    scale: number;
}

function BadgeSaver({xPos, yPos, scale}: Props) {
    const url= "https://static.wikia.nocookie.net/nickelodeon/images/0/09/Garfield.png/revision/latest?cb=20190807024205"

    function testPost(e: React.MouseEvent<HTMLButtonElement>) {
        console.log('event', e)
        axios.post(import.meta.env.VITE_BACKEND + '/badges',
                {x_pos: xPos, y_pos:yPos, scale, badge_url: url, badge_name: 'garvinen'},
                {headers: {
                    'Content-Type': 'application/json'
                }}
            )
            .then(res => console.log('res', res))
    }
    
    return (
        <button onClick={testPost}>Testaa post</button>
    )
}

export default BadgeSaver