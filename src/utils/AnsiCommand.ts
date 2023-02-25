import { z } from "../../deps.ts";
import { HOME, HIDE_CURSOR, SCROLL_UP, CLEAR_RIGHT, CLEAR_LINE, CLEAR, CLEAR_DOWN, CLEAR_LEFT, CLEAR_SCREEN, CLEAR_UP, DOWN, ESC, LEFT, REQUEST_CURSOR_POSITION, RIGHT, SCROLL_DOWN, SHOW_CURSOR, UP, COLUMN, SAVE_CURSOR, RESTORE_CURSOR } from "./AnsiEscapeCodes.ts"

const MoveCount = z.number().positive();

/**
 * A class to simplify building strings for ANSI Compatible CLI Rendering
 * with the builder pattern. 
 * 
 * The order of command inserts will determine execution order
 */
export class AnsiCommand {

    /**
     * The parts of the command. 
     * Will be joined with empty string to form a string which can be sent to a cli. 
     */
    public readonly parts: string[] = []

    constructor() {

    }

    public moveLinesDown(count = 1) {
        this.parts.push(`${ESC}${MoveCount.parse(count)}E`)
        return this;
    }

    public moveLinesUp(count = 1) {
        const validCount = z.number().positive().parse(count);
        this.parts.push(`${ESC}${validCount}F`)
        return this;
    }

    public requestCursorPosition() {
        this.parts.push(`${ESC}${REQUEST_CURSOR_POSITION}`)
        return this;
    }

    public showCursor() {
        this.parts.push(`${ESC}${SHOW_CURSOR}`)
        return this;
    }

    public hideCursor() {
        this.parts.push(`${ESC}${HIDE_CURSOR}`)
        return this;
    }

    public scrollUp() {
        this.parts.push(`${ESC}${SCROLL_UP}`)
        return this;
    }

    public scrollDown() {
        this.parts.push(`${ESC}${SCROLL_DOWN}`)
        return this;
    }

    public moveCursorUp(count = 1) {
        this.parts.push(`${ESC}${MoveCount.parse(count)}${UP}`)
        return this;
    }

    public moveCursorDown(count = 1) {
        this.parts.push(`${ESC}${MoveCount.parse(count)}${DOWN}`)
        return this;
    }

    public moveCursorLeft(count = 1) {
        this.parts.push(`${ESC}${MoveCount.parse(count)}${LEFT}`)
        return this;
    }

    public moveCursorRight(count = 1) {
        this.parts.push(`${ESC}${MoveCount.parse(count)}${RIGHT}`)
        return this;
    }

    public moveCursorToCol(count = 1) {
        this.parts.push(`${ESC}${MoveCount.parse(count)}${COLUMN}`)
        return this;
    }

    public moveCursorToHome() {
        this.parts.push(`${ESC}${HOME}`)
        return this;
    }

    public saveCursor() {
        this.parts.push(`${ESC}${SAVE_CURSOR}`)
        return this;
    }

    public restoreCursor() {
        this.parts.push(`${ESC}${RESTORE_CURSOR}`)
        return this;
    }

    public clearLineRight() {
        this.parts.push(`${ESC}${CLEAR_RIGHT}`)
        return this;
    }

    public clearLineLeft() {
        this.parts.push(`${ESC}${CLEAR_LEFT}`)
        return this;
    }

    public clearLine() {
        this.parts.push(`${ESC}${CLEAR_LINE}`)
        return this;
    }

    /**
     * Clears the screen downwards, after the cursor
     */
    public clearScreenDown() {
        this.parts.push(`${ESC}${CLEAR_DOWN}`)
        return this;
    }

    /**
     * Clears the screen upwards, before the cursor
     */
    public clearScreenUp() {
        this.parts.push(`${ESC}${CLEAR_UP}`)
        return this;
    }

    public clearScreen() {
        this.parts.push(`${ESC}${CLEAR_SCREEN}`)
        return this;
    }

    /**
     * Same as running 'clear' in console
     */
    public clear() {
        this.parts.push(`${ESC}${CLEAR}`)
        return this;
    }

    public plainText(text: string) {
        this.parts.push(text);
        return this;
    }

    public newLine(text: string) {
        this.parts.push(`\n`);
        return this;
    }

    public getCommandString() {
        return this.parts.join(``)
    }

}