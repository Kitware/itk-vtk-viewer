from dataclasses import dataclass

from typing import Optional

try:
    from numpy.typing import ArrayLike
except ImportError:
    from numpy import ndarray as ArrayLike

@dataclass
class MeshType:
    dimension: int

    pointComponentType: str
    pointPixelComponentType: str
    pointPixelType: str
    pointPixelComponents: int

    cellComponentType: str
    cellPixelComponentType: str
    cellPixelType: str
    cellPixelComponents: int


@dataclass
class Mesh:
    meshType: MeshType

    name: str

    numberOfPoints: int
    points: Optional[ArrayLike]

    numberOfPointPixels: int
    pointData: Optional[ArrayLike]

    numberOfCells: int
    cells: Optional[ArrayLike]
    cellBufferSize: int

    numberOfCellPixels: int
    cellData: Optional[ArrayLike]
