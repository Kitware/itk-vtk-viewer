Contributing to ITK/VTK ImageViewer
====================================

This page documents at a very high level how to contribute to itk-vtk-viewer.

1. The itk-vtk-viewer source is maintained on Github at [github.com/kitware/itk-vtk-viewer](https://github.com/kitware/itk-vtk-viewer)

2. [Fork the repository] into your user's namespace on Github.

3. Create a local clone of the main repository:

    ```sh
    $ git clone https://github.com/kitware/itk-vtk-viewer.git
    $ cd itk-vtk-viewer
    ```

    The main repository will be configured as your `origin` remote.

4. Run the setup script to prepare itk-vtk-viewer:
    ```sh
    $ npm install
    $ npm install -g commitizen
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

This project uses GitHub for code review and Travis-CI to test proposed
patches before they are merged.

Our [DevSite] is used to document features, flesh out designs and host other
documentation as well as the API.


[Fork the repository]: https://help.github.com/articles/fork-a-repo/
[Create a Pull Request]: https://help.github.com/articles/creating-a-pull-request/
[DevSite]: http://kitware.github.io/itk-vtk-viewer
