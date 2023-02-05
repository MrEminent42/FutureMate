import { atom } from "jotai";
import { Intern } from "../types/Intern";

const selectedInternAtom = atom<Intern | null>(null);

export default selectedInternAtom;