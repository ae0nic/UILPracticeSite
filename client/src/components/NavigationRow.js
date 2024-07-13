import "./NavigationRow.scss";

import ToggleButton from "react-bootstrap/esm/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/esm/ToggleButtonGroup";


export default function NavigationRow() {
    return (
        <>
            <div id="nav-row">
                <ToggleButtonGroup className="mb-2" type="radio" name="navrow-operation" defaultValue={"generate"}> 
                    <ToggleButton type="radio" id="navrow-generate" value="generate">Generate practice tests</ToggleButton>
                    <ToggleButton type="radio" id="navrow-view" value="view">View real tests</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </>
    );
}