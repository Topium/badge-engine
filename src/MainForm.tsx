const MainForm = function(props: {onSizeChange: (n:number) => void}) {
return (
    <form>
        <label htmlFor="size">
            Pinssien koko:&nbsp;
            <select onChange={(e) => props.onSizeChange(parseInt(e.target.value))} name="size" id="size-input">
                <option value="25">25mm</option>
                <option value="38">38mm</option>
                <option value="59">59mm</option>
            </select>
        </label>
    </form>
)
}

export default MainForm;
