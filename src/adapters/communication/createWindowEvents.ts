// Utils
import noop from 'lodash/noop';
import isFunction from 'lodash/isFunction';
import invariant from 'invariant';

import { internalError } from '../../utils/messages/internalError';

// Types
import {
  LampixInfo,
  ClassifiedObject,
  AppInfo,
  CoordinatesToTransform
} from '../../types';

// Core
import { listeners } from './listeners';

/**
 * Creates the functions called by the Lampix backend.
 * These provide the main form of communication between Lampix and the running app.
 */
let bindEvents = () => {
  // Prevent multiple calls
  bindEvents = noop;

  window.onMovement = (rectIndex, outlines) => {
    invariant(
      isFunction(listeners.movementCb),
      internalError('callbacks.movementCb must be a function.')
    );

    listeners.movementCb(rectIndex, outlines);
  };

  window.onSimpleClassifier = (
    rectIndex: number,
    recognizedClass: string,
    metadata: string
  ) => {
    invariant(
      isFunction(listeners.simpleClassifierCb),
      internalError('callbacks.simpleClassifierCb must be a function.')
    );

    listeners.simpleClassifierCb(rectIndex, recognizedClass, metadata);
  };

  window.onPositionClassifier = (
    rectIndex: number,
    classifiedObjects: ClassifiedObject[]
  ) => {
    invariant(
      isFunction(listeners.positionClassifierCb),
      internalError('callbacks.positionClassifierCb must be a function.')
    );

    listeners.positionClassifierCb(rectIndex, classifiedObjects);
  };

  window.onPrePositionClassifier = (rectIndex, detectedObjects) => {
    invariant(
      isFunction(listeners.prePositionClassifierCb),
      internalError('callbacks.prePositionClassifierCb must be a function.')
    );

    listeners.prePositionClassifierCb(rectIndex, detectedObjects);
  };

  window.onLampixInfo = (lampixInfo: LampixInfo) => {
    invariant(
      isFunction(listeners.lampixInfoCb),
      internalError('callbacks.lampixInfoCb must be a function.')
    );

    listeners.lampixInfoCb(lampixInfo);
  };

  window.onGetApps = (apps: AppInfo[]) => {
    invariant(
      isFunction(listeners.getAppsCb),
      internalError('callbacks.getAppsCb must be a function.')
    );

    listeners.getAppsCb(apps);
  };

  window.onTransformCoordinates = (transformedRect: CoordinatesToTransform[]) => {
    invariant(
      isFunction(listeners.transformCoordinatesCb),
      internalError('callbacks.transformCoordinatesCb must be a function.')
    );

    listeners.transformCoordinatesCb(transformedRect);
  };

  window.onDrawingDetector = (rectIndex, objects) => {
    invariant(
      isFunction(listeners.drawingDetectorCb),
      internalError('callbacks.drawingDetectorCb must be a function.')
    );

    listeners.drawingDetectorCb(rectIndex, objects);
  };
};

export { bindEvents };
