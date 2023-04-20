
import { useContext } from "react";
import { SelectedContext } from "../context/SelectedContext";

export const useSelected = (id: string) => {
    const { selected, setSelected } = useContext(SelectedContext);
    return [selected === id, setSelected.bind(null, id)] as const
}