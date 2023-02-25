
/**
 * Source of these: https://github.com/denosaurs/tty/blob/main/mod.ts 
 * Full Table: https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797#sequences
 */

export const ESC = "\u001B[";

export const REQUEST_CURSOR_POSITION = "6n";
export const HIDE_CURSOR = "?25l";
export const SHOW_CURSOR = "?25h";
export const SCROLL_UP = "T";
export const SCROLL_DOWN = "S";
export const SAVE_CURSOR = "s";
export const RESTORE_CURSOR = "u";

export const UP = "A";
export const DOWN = "B";
export const RIGHT = "C";
export const LEFT = "D";

export const CLEAR_RIGHT = "0K";
export const CLEAR_LEFT = "1K";
export const CLEAR_LINE = "2K";

export const CLEAR_DOWN = "0J";
export const CLEAR_UP = "1J";
export const CLEAR_SCREEN = "2J";
export const CLEAR = "\u001Bc";

export const NEXT_LINE = "1E";
export const PREV_LINE = "1F";
export const COLUMN = "G"; // left?
export const HOME = "H";