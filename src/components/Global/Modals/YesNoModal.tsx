import {BlurryModalBackground} from "./BlurryModalBackground.tsx";
import {ModalContainer} from "./ModalContainer.tsx";
import {BlueButton} from "../Buttons/RegularButtons/BlueButton.tsx";

export type ErrorModalProps = {
    title: string;
    onYesClick: () => void;
    onNoClick: () => void;
}

export const YesNoModal = (props: ErrorModalProps) => {
    return (
        <BlurryModalBackground>
            <ModalContainer>
                <span className="text-xl text-center font-bold mb-9">{props.title}</span>
                <div className="flex flex-col items-center justify-center sm:flex-row gap-2 w-full">
                    <BlueButton
                        label={"Да"}
                        onClick={props.onYesClick}
                        customStyles={"border-white border-2 max-w-30"}
                    />
                    <BlueButton
                        label={"Нет"}
                        onClick={props.onNoClick}
                        customStyles={"border-white border-2 max-w-30"}
                    />
                </div>
            </ModalContainer>
        </BlurryModalBackground>
    );
};