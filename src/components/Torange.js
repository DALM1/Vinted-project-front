import { Range, getTrackBackground } from "react-range";

const STEP = 5;
const MIN = 0;
const MAX = 500;

const ToRange = ({ rtl, values, setValues }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
            }}
        >
            <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                rtl={rtl}
                onChange={(values) => setValues(values)}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: "36px",
                            display: "flex",
                            width: "100%",
                        }}
                    >
                        <div
                            ref={props.ref}
                            style={{
                                height: "5px",
                                width: "100%",
                                borderRadius: "4px",
                                background: getTrackBackground({
                                    values,
                                    colors: [
                                        "#ccc",
                                        "rgb(44, 177, 186)",
                                        "#ccc",
                                    ],
                                    min: MIN,
                                    max: MAX,
                                    rtl,
                                }),
                                alignSelf: "center",
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ index, props, isDragged }) => (
                    <div className="btn-range" {...props}>
                        <div className="drag-range">
                            {values[index].toFixed(0)}
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default ToRange;
