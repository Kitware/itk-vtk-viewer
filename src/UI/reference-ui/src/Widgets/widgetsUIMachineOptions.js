import createWidgetsInterface from './createWidgetsInterface'
import viewModeXPlane from './viewModeXPlane'
import viewModeYPlane from './viewModeYPlane'
import viewModeZPlane from './viewModeZPlane'
import viewModeVolume from './viewModeVolume'
import toggleDistanceWidget from './toggleDistanceWidget'
import applyDistanceWidgetValue from './applyDistanceWidgetValue'

const widgetsUIMachineOptions = {
  actions: {
    createWidgetsInterface,

    viewModeXPlane,
    viewModeYPlane,
    viewModeZPlane,
    viewModeVolume,

    toggleDistanceWidget,
    applyDistanceWidgetValue,
  },
}

export default widgetsUIMachineOptions
