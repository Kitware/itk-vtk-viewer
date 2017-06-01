title: Default viewer
---

The default view of the ITK/VTK Image Viewer let you drag and drop into the page the data file that you want to look at.
But an additional usage of that page is possible by providing extra arguments to the URL. This allow to reference remote dataset and enable there visualization in full screen.

The extra argument to provide is `?fileToLoad=[...]` where the path provided can be relative to the current location on the Web or you can provide a full http:// url to the actual data.

![ItkVtkImageViewer](./dataViewer.jpg)

Moreover an additional parameter could be added to force the slice viewing mode. To do that just add `?use2D` or `?fileToLoad=[..]&use2D` inside the URL. 

![ItkVtkImageViewer2D](./2dViewer.jpg)
