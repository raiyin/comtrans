import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ActionCreators from '../shared/api/store/action-creators';

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(ActionCreators, dispatch);
};
