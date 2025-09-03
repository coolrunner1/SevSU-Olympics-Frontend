import {SmallRedButton} from "../../Global/Buttons/SmallButtons/SmallRedButton.tsx";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import {useNavigate} from "react-router";

export const AdminHeader = () => {
    const signOut = useSignOut();
    const navigate = useNavigate();

    const onSignOutPress = () => {
        signOut();
        navigate("/login");
    }

    return (
        <header>
            <SmallRedButton onClick={onSignOutPress} label={"Выйти"} />
        </header>
    );
};