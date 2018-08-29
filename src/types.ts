export type Opts<T> = {
  [key: string]: T
};

export type LampixInternal = {
  isDepthClassifierActivated: boolean;
  activateDepthClassifier: (opts: Opts<string>) => void;
  deactivateDepthClassifier: () => void;
  getLampixInfo: () => void;
  registerMovement: (rectArrayJSON: string) => void;
  registerSimpleClassifier: (classRectArrayJSON: string) => void;
  registerDrawingDetector: (classRectArrayJSON: string) => void;
  playFullScreenVideo: (filename: string) => void;
  registerPositionClassifier: (classRectArrayJSON: string) => void;
  setIgnoredRects: (rectArrayJSON: string) => void;
  getApps: () => void;
  switchToApp: (appName: string) => void;
  transformCoordinates: (toTransform: string) => void;
};

declare global {
  interface Window {
    _lampix_internal: LampixInternal;
    onMovement: movementCallback;
    onSimpleClassifier: simpleClassifierCallback;
    onPositionClassifier: positionClassifierCallback;
    onPrePositionClassifier: prePositionClassifierCallback;
    onDrawingDetector: drawingDetectorCallback;
    onLampixInfo: lampixInfoCallback;
    onGetApps: getAppsCallback;
    onTransformCoordinates: transformCoordinatesCallback;
  }
}

export interface Rect {
  /** X coordinate of the rectangle's top left corner. */
  posX: number;
  /** Y coordinate of the rectangle's top left corner. */
  posY: number;
  width: number;
  height: number;
  classifier?: string;
  [key: string]: any;
}

/**
 * Object providing information about the Lampix environment
 *
 * @public
 */
export interface LampixInfo {
  /** Lampix unique hardware ID. */
  id: string;
  /** Lampix OS version. */
  version: string;
  /** True if the application is run within a simulator. */
  isSimulator: boolean;
}

/**
 * Callback invoked when Lampix information is available.
 *
 * @param lampixInfo Object containing relevant Lampix information. See {@link LampixInfo}.
 */
export interface lampixInfoCallback {
  (lampixInfo: LampixInfo): void;
}

export interface Point {
  posX: number;
  posY: number;
}

export interface Outline {
  /** Array of points that define the outline. See {@link Point}. */
  points: Point[];
}

/**
 * Callback invoked when movement is detected.
 *
 * @param rectIndex Index of the rectangle handling the movement event.
 * @param outlines Array of outlines detected in the rectangle. See {@link Outline}.
 */
export interface movementCallback {
  (rectIndex: number, outlines: Outline[]): void;
}

/**
 * Callback invoked when an object is detected and classified.
 *
 * @param rectIndex Index of the rectangle handling the classification event.
 * @param recognizedClass Class returned by the classifier.
 * @param metadata Field for extra information regarding classified objects.
 */
export interface simpleClassifierCallback {
  (rectIndex: number, recognizedClass: string, metadata: string): void;
}

export interface ClassifiedObject {
  /** Used to track same object over multiple frames. */
  objectId: string;
  /** Class returned by classifier. */
  recognizedClass: string;
  outline: Outline;
}

/**
 * Callback invoked when an object is detected and classified.
 *
 * @param rectIndex Index of the rectangle handling the classification event.
 * @param classifiedObjects Array of detected objects. See {@link ClassifiedObject}.
 * @param metadata Field for extra information regarding classified objects
 */
export interface positionClassifierCallback {
  (rectIndex: number, classifiedObjects: ClassifiedObject[], metadata: string): void;
}

/**
 * Callback invoked when an object is detected, but before it is classified.
 *
 * @param rectIndex Index of the rectangle handling the classification event.
 * @param detectedObjects Array of objects describing the shape of the detected objects.
 */
export interface prePositionClassifierCallback {
  (rectIndex: number, detectedObjects: Outline[]): void;
}

export interface drawingDetectorCallback {
  (rectIndex: number, objects: Outline[]): void;
}

export interface AppInfo {
  [name: string]: string;
}

export interface getAppsCallback {
  (apps: AppInfo[]): void;
}

/**
 * Callback invoked when converting camera coordinates to projector, or vice versa
 *
 * @param toTransform Object specifying the rectangle to transform and what direction the conversion should take
 */
export interface transformCoordinatesCallback {
  (transformedRect: CoordinatesToTransform[]): void;
}

export interface Callbacks {
  movementCb: movementCallback;
  simpleClassifierCb: simpleClassifierCallback;
  positionClassifierCb: positionClassifierCallback;
  prePositionClassifierCb: prePositionClassifierCallback;
  lampixInfoCb: lampixInfoCallback;
  drawingDetectorCb: drawingDetectorCallback;
  getAppsCb: getAppsCallback;
  transformCoordinatesCb: transformCoordinatesCallback;
}

export interface CoordinatesToTransform extends Rect {
  type: 'camera' | 'projector';
}

export interface PublisherEventListeners {
  [functionId: string]: Function;
}

export interface PublisherTopicContent {
  listeners: PublisherEventListeners;
  queue: string[];
}

export interface PublisherTopics {
  [topic: string]: PublisherTopicContent;
}

export namespace API {
  export interface getLampixInfo { (): Promise<LampixInfo>; }
}

export interface ILampixBridge {
  getLampixInfo: API.getLampixInfo;
}
