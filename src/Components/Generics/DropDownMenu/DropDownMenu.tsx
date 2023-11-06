import { useRef } from 'react';
import { ControlledMenu, MenuItem, useHover, useMenuState } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface dropDownChild {
    url: string;
    name: string
}

export interface dropDownProps {
    name: string;
    children: dropDownChild[];
}

function DropDownMenu(props: dropDownProps): JSX.Element {
    const ref = useRef(null);
    const [menuState, toggle] = useMenuState({ transition: true });
    const { anchorProps, hoverProps } = useHover(menuState.state, toggle);

    return (
        <>
            <div ref={ref} {...anchorProps}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "large",
                    alignItems: "center"
                }}>
                {props.name} <span style={{ transition: "all 500ms ease", transform: menuState.state === "open" ? "rotate(0.5turn)" : menuState.state === "opening" ? "rotate(0.5turn)" : "" }} ><KeyboardArrowDownIcon sx={{ display: "flex" }} /></span>
            </div>

            <ControlledMenu
                direction='bottom'
                arrow
                align='center'
                {...hoverProps}
                {...menuState}
                anchorRef={ref}
                onClose={() => toggle(false)}
            >
                {props.children.map((c, i) => <Link key={i} to={c.url}><MenuItem>{c.name}</MenuItem></Link>)}
            </ControlledMenu>
        </>
    );
}

export default DropDownMenu;
