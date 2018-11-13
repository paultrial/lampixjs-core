import noop from 'lodash/noop';

import {
  ClassifiedObject,
  CoordinatesToTransform,
  WatcherID,
  ResponsePayloads
} from '../../../types';

import { publisher } from '../../../publisher';
import { LampixEvents } from '../../../events';

/**
 * Creates the functions called by the Lampix backend.
 * These provide the main form of communication between Lampix and the running app.
 */
let bindEvents = () => {
  // Prevent multiple calls
  bindEvents = noop;

  window.onObjectsClassified = (
    watcherId: WatcherID,
    classifiedObjects: ClassifiedObject[]
  ) => {
    publisher.publish(LampixEvents.Classification, {
      error: null,
      data: { watcherId, objects: classifiedObjects }
    });
  };

  window.onObjectsLocated = (
    watcherId,
    locatedObjects
  ) => {
    publisher.publish(LampixEvents.Location, {
      error: null,
      data: { watcherId, objects: locatedObjects }
    });
  };

  window.onWatcherRemoved = (watcherId: WatcherID) => {
    publisher.publish(LampixEvents.WatcherRemoved, {
      error: null,
      data: { watcherId }
    });
  };

  window.onWatcherAdded = (response: ResponsePayloads.AddWatchers) => {
    publisher.publish(LampixEvents.WatcherAdded, response);
  };

  window.onWatcherPaused = (watcherId: WatcherID) => {
    publisher.publish(LampixEvents.WatcherPaused, {
      error: null,
      data: { watcherId }
    });
  };

  window.onWatcherResumed = (watcherId: WatcherID) => {
    publisher.publish(LampixEvents.WatcherResumed, {
      error: null,
      data: { watcherId }
    });
  };

  window.onWatcherUpdated = (response: ResponsePayloads.UpdateWatcher) => {
    publisher.publish(LampixEvents.WatcherUpdated, response);
  };

  window.onLampixInfo = (response) => {
    publisher.publish(LampixEvents.LampixInfo, response);
  };

  window.onGetApps = (response) => {
    publisher.publish(LampixEvents.GetApps, response);
  };

  window.onTransformCoordinates = (transformedRect: CoordinatesToTransform[]) => {
    publisher.publish(LampixEvents.TransformCoordinates, {
      error: null,
      data: { transformedRect }
    });
  };

  window.onAppConfig = (config: object) => {
    publisher.publish(LampixEvents.AppConfig, {
      error: null,
      data: { config }
    });
  };

  window.onFileWritten = (response) => {
    publisher.publish(LampixEvents.FileWritten, response);
  };

  window.onFileRead = (response) => {
    publisher.publish(LampixEvents.FileRead, response);
  };
};

export { bindEvents };