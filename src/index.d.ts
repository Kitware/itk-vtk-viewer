declare interface ItkImage {
  imageType: any
}
declare interface ZarrStore {
  getItem(): any
}
declare interface ndarray {
  _rtype: any
}

declare type LoadableImage = URL | ItkImage | ZarrStore | ndarray

declare type ViewerOptions = {
  image?: LoadableImage
  labelImage?: LoadableImage
  geometries?: [any]
  use2D?: boolean
  rotate?: boolean
  config?: any
}

type Viewer = {
  setBackgroundColor(color: [number, number, number]): void
  setImageColorMap(mapName: string, actor: number): void
}

declare namespace itkVtkViewer {
  function createViewer(
    rootContainer: HTMLElement,
    options?: ViewerOptions
  ): Promise<Viewer>

  function createViewerFromLocalFiles(container: HTMLElement): Promise<Viewer>

  function createViewerFromFiles(
    el: HTMLElement,
    files: [any],
    use2D?: boolean
  ): Promise<Viewer>

  function createViewerFromUrl(
    el: HTMLElement,
    options?: { files?: [string] } & ViewerOptions
  ): Promise<Viewer>

  function processURLParameters(
    container: HTMLElement,
    addOnParameters?: any
  ): Promise<Viewer | null>

  function initializeEmbeddedViewers(): void

  type version = string
}
