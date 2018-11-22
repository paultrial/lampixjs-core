# `.watchers.add(...watchers)`

Registers one or more areas to watch with Lampix.

#### Arguments

1. `...watchers` ([`Watcher[]`](./watcher.md)) Comma separated Watcher objects


#### Returns

([`Promise<RegisteredWatcher[]>`](./registered-watcher.md)): A promise that fulfills with a list of [`RegisteredWatcher`](./registered-watcher.md) objects, equal in length to the number of arguments provided to the function

#### Example

```js
import lampix from '@lampix/core';

const draw = (recognizedObject) => {
  // Drawing amazing effects
};

const watcher = {
  name: 'DepthClassifier',
  shape: lampix.helpers.rectangle(0, 0, window.innerWidth, window.innerHeight),
  onClassification: (recognizedObjects) => {
    recognizedObjects.forEach(draw);
  }
};

lampix.watchers.add(watcher)
  .then((registeredWatchers) => {
    console.log(registeredWatchers.length); // 1
  });
```