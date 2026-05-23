// Shared card layout constants and helpers for horizontal-scroll card components

export const CARD_WIDTH_RATIO = 0.48;
export const CARD_HEIGHT_RATIO = 0.46;
export const CARD_ASPECT_RATIO = 0.75; // height = width * this ratio
export const CARD_GAP_CSS = "clamp(16px, 2vw, 28px)";
export const CARD_PADDING_LEFT_CSS = "clamp(24px, 4vw, 48px)";

export function getCardGap() {
  return Math.min(28, Math.max(16, window.innerWidth * 0.02));
}

export function getCardPaddingLeft() {
  return Math.min(48, Math.max(24, window.innerWidth * 0.04));
}
