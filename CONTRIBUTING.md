Contributing to ITK/VTK ImageViewer
====================================

This page documents at a very high level how to contribute to itk-vtk-image-viewer.

1. The itk-vtk-image-viewer source is maintained on Github at [github.com/kitware/itk-vtk-image-viewer](https://github.com/kitware/itk-vtk-image-viewer)

2. [Fork VTK] into your user's namespace on Github.

3. Create a local clone of the main VTK repository:

    ```sh
    $ git clone https://github.com/kitware/itk-vtk-image-viewer.git
    $ cd vtk-js
    ```

    The main repository will be configured as your `origin` remote.

4. Run the setup script to prepare itk-vtk-image-viewer:
    ```sh
    $ npm install
    ```

5. Edit files and create commits (repeat as needed):
    ```sh
    $ edit file1 file2 file3
    $ git add file1 file2 file3
    $ npm run commit
    ```

6. Push commits in your topic branch to your fork in Github:
    ```sh
    $ git push
    ```

7. Visit your fork in Github, browse to the "**Pull Requests**" link on the
    left, and use the "**New Pull Request**" button in the upper right to
    create a Pull Request.

    For more information see: [Create a Pull Request]

8. Additional informations on how to create classe/test/example can be found [here](https://kitware.github.io/itk-vtk-image-viewer/docs/) in the __Development__ section.


vtk.js uses Github for code review and Travis-CI to test proposed
patches before they are merged.

Our [DevSite] is used to document features, flesh out designs and host other
documentation as well as the API.


[Fork VTK]: https://help.github.com/articles/fork-a-repo/
[Create a Pull Request]: https://help.github.com/articles/creating-a-pull-request/
[DevSite]: http://kitware.github.io/itk-vtk-image-viewer
