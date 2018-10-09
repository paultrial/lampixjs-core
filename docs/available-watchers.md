# @lampix/core v1.x.x watcher names

- [NeuralNetworkClassifier](#neuralnetworkclassifier)
- [NeuralNetworkSegmenter](#neuralnetworksegmenter)
- [DepthClassifier](#depthclassifier)

***

## NeuralNetworkClassifier

*Uses a convolutional neural network to classify objects in the area watched by this classifier.  
The area is defined by the dimension of the neural network and the center of the bounding box of the contour registered from JS.*

**NeuralNetworkClassifier** requires the parameter `neural_network_name` to be specified.

### Usage:

```
{
  type: 'classifier',
  name: 'NeuralNetworkClassifier',
  params: {
    neural_network_name: <some_NN_name>
  }
}
```

***

## NeuralNetworkSegmenter

Like [NeuralNetworkClassifier](#neuralnetworkclassifier), NeuralNetworkSegmenter uses a convolutional neural network to classify objects.

NeuralNetworkSegmenter can detect (i.e locate and classify) multiple objects at a time in the specified watcher shape. 

**NeuralNetworkSegmenter** requires the parameter `neural_network_name` to be specified.

### Usage:

```
{
  type: 'segmenter',
  name: 'NeuralNetworkSegmenter',
  params: {
    neural_network_name: <some_NN_name>
  }
}
```

***

## DepthClassifier

Detects any object on or above the surface defined by the watcher's shape, returning contour information.

### Usage:

```
{
  type: 'segmenter',
  name: 'DepthClassifier'
}
```

***