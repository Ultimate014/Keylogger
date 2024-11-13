import { BookA, Keyboard, TextCursor, Type } from "lucide-react";

const getAllAlphabets = () => {
  let alphabets = [];
  for (let i = 97; i <= 122; i++) {
    alphabets.push(String.fromCharCode(i));
  }
  return alphabets;
};

export const data = {
  name: "Logger",
  indicators: [
    {
      title: "Show Vowels",
      icon: BookA,
      type: "vowels",
    },
    {
      title: "Show Consonants",
      icon: Type,
      type: "consonants",
    },
    {
      title: "Show Other Keys",
      icon: Keyboard,
      type: "other",
    },
  ],
  dummy: shuffle([
    // ...getAllAlphabets(),
    // ...getAllAlphabets(),
    // ...getAllAlphabets(),
    // ...getAllAlphabets(),
    // "Ctrl",
    // "Alt",
    // "Shift",
    // "Enter",
    // "Backspace",
    // "Tab",
    // "Caps Lock",
    // "Space",
    // "Arrow Up",
    // "Arrow Down",
    // "Arrow Left",
    // "Arrow Right",
    // "Page Up",
    // "Page Down",
    // "Home",
    // "End",
    // "Insert",
    // "Delete",
    // "Escape",
  ]),
};

export const specialKeys = [
  "Ctrl",
  "Alt",
  "Shift",
  "Enter",
  "Key.backspace",
  "Tab",
  "Caps Lock",
  "Key.space",
  "Arrow Up",
  "Arrow Down",
  "Arrow Left",
  "Arrow Right",
  "Page Up",
  "Page Down",
  "Home",
  "End",
  "Insert",
  "Delete",
  "Escape",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12",
];

export const VowelKeys = ["a", "e", "i", "o", "u"];
export const ConsonantKeys = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const getFilteredKeys = (type) => {
  switch (type) {
    case "vowels":
      return VowelKeys;
    case "consonants":
      return ConsonantKeys;
    case "other":
      return specialKeys;
    default:
      return [];
  }
};
