import { atom } from "jotai";
import { Intern, combineInternInfo } from "../types/Intern";

const currentUserAtom = atom<Intern | null>(null);

const currentUserListedAtom = atom(
    (get) => get(currentUserAtom)?.listed,
    (get, set, listed: boolean) => {
        if (!get(currentUserAtom)) return;
        set(currentUserAtom, combineInternInfo({ listed: listed }, get(currentUserAtom)!));
    }
)

export default currentUserAtom;
export { currentUserListedAtom };