import {
  Watcher,
  PublicAPI
} from '../../../../types';

/**
 * Helper function to create a rectangle shape for a surface watcher
 * @param x - Top left horizontal coordinate
 * @param y - Top left vertical coordinate
 * @param width
 * @param height
 */
const rectangle = (
  x: number,
  y: number,
  width: number,
  height: number
): PublicAPI.Rectangle => ({
  width,
  height,
  posX: x,
  posY: y,
  type: Watcher.Shape.Type.Rectangle
});

export { rectangle };
