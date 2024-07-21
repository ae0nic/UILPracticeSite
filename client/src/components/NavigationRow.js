import "./NavigationRow.scss";

import { useRef } from "react";
import ToggleButton from "react-bootstrap/esm/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/esm/ToggleButtonGroup";


export default function NavigationRow({setOperationState}) {
    let onChange = (val) => {
        if (val == 'generate') {
            setOperationState("generate");
        } else {
            setOperationState("view");
        }
    }

    return (
        <>
            <div id="nav-row">
                <ToggleButtonGroup className="mb-2" type="radio" id="navrow-operation"
                 name="navrow-operation" defaultValue={"generate"} onChange={onChange}> 
                    <ToggleButton type="radio" id="navrow-generate" value="generate">Generate practice tests</ToggleButton>
                    <ToggleButton type="radio" id="navrow-view" value="view">View real tests</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </>
    );
}