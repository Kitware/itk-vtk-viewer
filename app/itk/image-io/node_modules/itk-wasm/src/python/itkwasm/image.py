from dataclasses import dataclass

from typing import Sequence

try:
    from numpy.typing import ArrayLike
except ImportError:
    from numpy import ndarray as ArrayLike

@dataclass
class ImageType:
    dimension: int
    componentType: str
    pixelType: str
    components: int

@dataclass
class Image:
    imageType: ImageType
    data: ArrayLike
    size: Sequence[int]
    origin: Sequence[float]
    spacing: Sequence[float]
    direction: ArrayLike