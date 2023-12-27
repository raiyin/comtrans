import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../shared/api/store/reducers";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
