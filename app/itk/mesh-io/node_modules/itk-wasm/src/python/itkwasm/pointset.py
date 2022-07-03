from dataclasses import dataclass

from typing import Optional

try:
    from numpy.typing import ArrayLike
except ImportError:
    from numpy import ndarray as ArrayLike

@dataclass
class PointSetType:
    dimension: int

    pointComponentType: str
    pointPixelComponentType: str
    pointPixelType: str
    pointPixelComponents: int


@dataclass
class PointSet:
    pointSetType: PointSetType

    name: str

    numberOfPoints: int
    points: Optional[ArrayLike]

    numberOfPointPixels: int
    pointData: Optional[ArrayLike]