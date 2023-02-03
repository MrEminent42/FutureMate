import { atom } from "jotai";

const uploadSuccessSnackAtom = atom(false);
const saveSuccessSnackAtom = atom(false);
const failSnackAtom = atom(false);

export { uploadSuccessSnackAtom, saveSuccessSnackAtom, failSnackAtom }