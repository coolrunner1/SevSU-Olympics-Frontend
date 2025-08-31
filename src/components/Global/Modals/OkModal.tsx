import {BlurryModalBackground} from "./BlurryModalBackground.tsx";
import {ModalContainer} from "./ModalContainer.tsx";
import {BlueButton} from "../Buttons/RegularButtons/BlueButton.tsx";

export type OkModalProps = {
    message: string;
    setClose: () => void;
}

export const OkModal = (props: OkModalProps) => {
    return (
        <BlurryModalBackground>
            <ModalContainer>
                <span className="text-xl text-center font-bold mb-9">{props.message}</span>
                <BlueButton
                    label={"OK"}
                    onClick={props.setClose}
                    customStyles={"border-white border-2 max-w-30"}
                />
            </ModalContainer>
        </BlurryModalBackground>
    );
};