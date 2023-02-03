import { atom } from "jotai";
import { MateInfo } from "../types/Mate";

const currentUserAtom = atom<MateInfo | null>(null);

export default currentUserAtom;