import { atom } from "jotai";
import { Intern } from "../types/Intern";

const currentUserAtom = atom<Intern | null>(null);

export default currentUserAtom;